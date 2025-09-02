"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Shield, Copy, Link2, CheckCircle2, TriangleAlert } from "lucide-react"
import { encryptMessage, decryptMessage, toHashPayload, fromHashPayload } from "@/lib/crypto"
import { GlitchBackground } from "@/components/glitch-background"

// Color palette (5 colors total):
// - Primary: purple-600 (#7c3aed)
// - Neutrals: black (#000), slate-900, zinc-100
// - Accent: red-500
// Note: Purple is explicitly allowed per brief; avoid neon green/cyan.

export default function Page() {
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt")

  // Encrypt state
  const [plain, setPlain] = useState("")
  const [passEnc, setPassEnc] = useState("")
  const [cipher, setCipher] = useState("")
  const [copied, setCopied] = useState<"cipher" | "link" | null>(null)
  const [copyTimerId, setCopyTimerId] = useState<number | null>(null)

  // Decrypt state
  const [cipherIn, setCipherIn] = useState("")
  const [passDec, setPassDec] = useState("")
  const [decrypted, setDecrypted] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)

  // Prefill from URL hash for decryption
  useEffect(() => {
    if (typeof window === "undefined") return
    const hash = window.location.hash
    if (hash?.startsWith("#") && hash.length > 1) {
      const payload = hash.slice(1)
      try {
        const parsed = fromHashPayload(payload)
        if (parsed) {
          setCipherIn(parsed)
          setMode("decrypt")
        }
      } catch {
        // ignore invalid hash
      }
    }
  }, [])

  // Clipboard auto-clear after 20s
  const scheduleClipboardClear = () => {
    if (copyTimerId) {
      window.clearTimeout(copyTimerId)
    }
    const id = window.setTimeout(async () => {
      try {
        // Attempt to clear clipboard; may require permissions
        await navigator.clipboard.writeText("")
      } catch {
        // best-effort
      }
      setCopied(null)
    }, 20000)
    setCopyTimerId(id)
  }

  const onEncrypt = async () => {
    setProcessing(true)
    setError(null)
    try {
      const { ciphertext } = await encryptMessage(plain, passEnc)
      setCipher(ciphertext)
      backgroundSweep()
    } catch (e: any) {
      setError("Encryption failed. Try again.")
      glitchError()
    } finally {
      setProcessing(false)
    }
  }

  const onDecrypt = async () => {
    setProcessing(true)
    setError(null)
    setDecrypted("")
    try {
      const msg = await decryptMessage(cipherIn, passDec)
      setDecrypted(msg)
      backgroundSweep()
    } catch (e: any) {
      setError("Decryption failed. Passphrase may be wrong.")
      glitchError()
    } finally {
      setProcessing(false)
    }
  }

  const copyCipher = async () => {
    if (!cipher) return
    try {
      await navigator.clipboard.writeText(cipher)
      setCopied("cipher")
      scheduleClipboardClear()
    } catch {
      setError("Clipboard copy failed.")
      glitchError()
    }
  }

  const shareLink = async () => {
    if (!cipher) return
    try {
      const link = `${window.location.origin}/#${toHashPayload(cipher)}`
      await navigator.clipboard.writeText(link)
      setCopied("link")
      scheduleClipboardClear()
    } catch {
      setError("Clipboard copy failed.")
      glitchError()
    }
  }

  // Simple background sweep trigger via a custom event
  const backgroundSweep = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("darkcrypt-sweep"))
    }
  }

  // Trigger a glitch pulse on error via CSS class toggling
  const glitchError = () => {
    if (typeof document === "undefined") return
    const root = document.getElementById("darkcrypt-root")
    if (!root) return
    root.classList.remove("glitch-error")
    // Force reflow
    void root.offsetWidth
    root.classList.add("glitch-error")
    setTimeout(() => root.classList.remove("glitch-error"), 600)
  }

  const tabButton = (tab: "encrypt" | "decrypt", label: string) => (
    <button
      onClick={() => setMode(tab)}
      className={cn(
        "relative px-4 py-2 rounded-md transition-colors",
        "text-zinc-200 hover:text-white",
        tab === mode ? "bg-purple-600/20 ring-1 ring-purple-600/40" : "bg-slate-900/40 ring-1 ring-slate-800",
      )}
    >
      {label}
    </button>
  )

  return (
    <main id="darkcrypt-root" className="relative min-h-dvh bg-black text-zinc-100 overflow-hidden">
      <GlitchBackground />
      <div className="relative z-10">
        <header className="w-full max-w-4xl mx-auto px-4 pt-10 pb-6">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center gap-3"
          >
            <Shield className="size-6 text-purple-500" aria-hidden />
            <h1 className="font-mono text-2xl md:text-3xl text-balance">
              <span className="glitch-title">DarkCrypt</span>
              <span className="text-zinc-400"> // Decrypt the Silence</span>
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mt-2 text-zinc-400 text-pretty"
          >
            Encrypt. Share. Vanish. End-to-end secrets, generated entirely in your browser.
          </motion.p>
        </header>

        <section className="w-full max-w-4xl mx-auto px-4">
          <Card className="bg-slate-950/60 border-slate-800">
            <CardHeader className="border-b border-slate-800">
              <div className="flex items-center justify-between">
                <CardTitle className="font-mono text-purple-400">Console</CardTitle>
                <div className="flex items-center gap-2">
                  {tabButton("encrypt", "Encrypt")}
                  {tabButton("decrypt", "Decrypt")}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <AnimatePresence mode="wait">
                {mode === "encrypt" ? (
                  <motion.div
                    key="enc"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.25 }}
                    className="grid gap-4"
                  >
                    <label className="text-sm text-zinc-300 font-mono" htmlFor="plain">
                      Secret
                    </label>
                    <Textarea
                      id="plain"
                      value={plain}
                      onChange={(e) => setPlain(e.target.value)}
                      placeholder="Type your secret..."
                      className="min-h-32 bg-black/60 border-slate-800 focus-visible:ring-purple-600 placeholder:text-zinc-500"
                    />
                    <div className="grid gap-2">
                      <label className="text-sm text-zinc-300 font-mono" htmlFor="passEnc">
                        Passphrase
                      </label>
                      <Input
                        id="passEnc"
                        type="password"
                        value={passEnc}
                        onChange={(e) => setPassEnc(e.target.value)}
                        placeholder="Enter passphrase"
                        className="bg-black/60 border-slate-800 focus-visible:ring-purple-600 placeholder:text-zinc-500 pass-flicker"
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={onEncrypt}
                        disabled={!plain || !passEnc || processing}
                        className={cn(
                          "relative inline-flex h-10 items-center justify-center rounded-md px-4 font-medium",
                          "bg-purple-600 text-white hover:bg-purple-500 transition-colors",
                          "ring-1 ring-purple-500/40 disabled:opacity-50 disabled:cursor-not-allowed",
                          "btn-pulse",
                        )}
                      >
                        {processing ? "Encrypting..." : "Encrypt"}
                      </motion.button>

                      <div className="relative h-10 flex-1">
                        <Textarea
                          value={cipher}
                          readOnly
                          placeholder="Ciphertext appears here..."
                          className="h-10 min-h-10 max-h-28 bg-black/60 border-slate-800 focus-visible:ring-purple-600 placeholder:text-zinc-600 font-mono text-xs"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        className="bg-slate-950 border-slate-800 hover:bg-slate-900"
                        onClick={copyCipher}
                        disabled={!cipher}
                      >
                        <Copy className="mr-2 size-4" />
                        Copy Encrypted
                      </Button>
                      <Button
                        variant="outline"
                        className="bg-slate-950 border-slate-800 hover:bg-slate-900"
                        onClick={shareLink}
                        disabled={!cipher}
                      >
                        <Link2 className="mr-2 size-4" />
                        Copy Share Link
                      </Button>

                      <AnimatePresence>
                        {copied && (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            className={cn(
                              "ml-2 inline-flex items-center gap-2 rounded px-2 py-1",
                              "bg-red-500/10 text-red-400 ring-1 ring-red-500/30 glitch-pop",
                            )}
                          >
                            <CheckCircle2 className="size-4" />
                            {copied === "cipher" ? "Copied ciphertext!" : "Copied share link!"}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <p className="text-xs text-zinc-500">
                      Tip: The share link only contains the ciphertext (in the hash). Share the passphrase separately.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="dec"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.25 }}
                    className="grid gap-4"
                  >
                    <label className="text-sm text-zinc-300 font-mono" htmlFor="cipherIn">
                      Encrypted Text
                    </label>
                    <Textarea
                      id="cipherIn"
                      value={cipherIn}
                      onChange={(e) => setCipherIn(e.target.value)}
                      placeholder="Paste ciphertext (or it auto-filled from the link)..."
                      className="min-h-32 bg-black/60 border-slate-800 focus-visible:ring-purple-600 placeholder:text-zinc-500"
                    />
                    <div className="grid gap-2">
                      <label className="text-sm text-zinc-300 font-mono" htmlFor="passDec">
                        Passphrase
                      </label>
                      <Input
                        id="passDec"
                        type="password"
                        value={passDec}
                        onChange={(e) => setPassDec(e.target.value)}
                        placeholder="Enter passphrase"
                        className="bg-black/60 border-slate-800 focus-visible:ring-purple-600 placeholder:text-zinc-500 pass-flicker"
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={onDecrypt}
                        disabled={!cipherIn || !passDec || processing}
                        className={cn(
                          "relative inline-flex h-10 items-center justify-center rounded-md px-4 font-medium",
                          "bg-purple-600 text-white hover:bg-purple-500 transition-colors",
                          "ring-1 ring-purple-500/40 disabled:opacity-50 disabled:cursor-not-allowed",
                          "btn-pulse",
                        )}
                      >
                        {processing ? "Decrypting..." : "Decrypt"}
                      </motion.button>

                      <div className="relative h-10 flex-1">
                        <Textarea
                          value={decrypted}
                          readOnly
                          placeholder="Decrypted message appears here..."
                          className="h-10 min-h-10 max-h-28 bg-black/60 border-slate-800 focus-visible:ring-purple-600 placeholder:text-zinc-600 font-mono text-xs"
                        />
                      </div>
                    </div>

                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          className="inline-flex items-center gap-2 text-red-400"
                        >
                          <TriangleAlert className="size-4" />
                          <span className="font-mono">{error}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </section>

        <footer className="w-full max-w-4xl mx-auto px-4 py-8 text-xs text-zinc-500">
          No data is sent to a server. Encryption and decryption occur entirely in your browser via Web Crypto.
        </footer>
      </div>
    </main>
  )
}
