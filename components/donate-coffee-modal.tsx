"use client"

import { useEffect, useId, useRef, useState } from "react"
import { AnimatePresence, MotionConfig, motion } from "framer-motion"

const UPI_ID = "aleyammachennattu@oksbi"
const UPI_NAME = "Abin%20Varughese" // url-encoded
const MIN_AMOUNT = 10
const AMOUNTS = [10, 25, 50, 100] as const
const buildUpiLink = (amount: number) => `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${UPI_NAME}&am=${amount}&cu=INR`

export default function DonateCoffee() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [amount, setAmount] = useState<number>(MIN_AMOUNT)
  const [qrLoaded, setQrLoaded] = useState(false)
  const dialogId = useId()
  const initialFocusRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (open) initialFocusRef.current?.focus()
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  const copyUpi = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {}
  }

  return (
    <MotionConfig reducedMotion="user">
      {/* Floating Button */}
      <motion.button
        type="button"
        aria-label="Support this project"
        aria-expanded={open}
        aria-controls={dialogId}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg ring-1 ring-primary/40 hover:ring-primary/60 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary/70 focus-visible:ring-offset-background"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="sr-only">Buy me a coffee</span>
        <span className="text-xl">{"☕"}</span>
        <span className="pointer-events-none absolute inset-0 rounded-full blur-md opacity-50 bg-primary/30" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.button
              type="button"
              aria-hidden="true"
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px]"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            {/* Dialog */}
            <motion.div
              role="dialog"
              id={dialogId}
              aria-modal="true"
              aria-label="Support this project"
              className="fixed inset-0 z-50 grid place-items-center px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative w-full max-w-sm rounded-xl border border-border bg-card text-card-foreground shadow-2xl"
                initial={{ y: 16, scale: 0.98, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1, transition: { type: "spring", stiffness: 240, damping: 22 } }}
                exit={{ y: 16, scale: 0.98, opacity: 0 }}
              >
                <div className="pointer-events-none absolute -inset-px rounded-xl ring-1 ring-primary/10" />
                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0" />
                <button
                  onClick={() => setOpen(false)}
                  className="absolute right-3 top-3 rounded-md p-2 text-muted-foreground hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                  aria-label="Close"
                  ref={initialFocusRef}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>

                <div className="p-5 sm:p-6">
                  <h3 className="text-lg font-semibold tracking-tight text-balance">
                    Support this project! Minimum ₹{MIN_AMOUNT} via GPay/UPI
                  </h3>

                  <div className="mt-4 relative overflow-hidden rounded-lg border border-border bg-background p-3">
                    <img
                      src="/donate-qr.png"
                      alt="UPI QR to donate via GPay"
                      className="mx-auto h-auto w-full max-w-[260px] rounded-md"
                      loading="lazy"
                      onLoad={() => setQrLoaded(true)}
                    />
                    {!qrLoaded && (
                      <div aria-hidden="true" className="absolute inset-3 rounded-md bg-muted/40 animate-pulse" />
                    )}
                  </div>

                  

                  <div className="mt-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-3 rounded-md border border-border bg-muted/40 px-3 py-2">
                      <div className="text-sm">
                        <div className="text-muted-foreground">UPI ID</div>
                        <div className="font-medium">{UPI_ID}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <motion.button
                          onClick={copyUpi}
                          className={`rounded-md px-3 py-2 text-xs font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
                            copied
                              ? "bg-emerald-600 text-white"
                              : "bg-primary text-primary-foreground hover:bg-primary/90"
                          }`}
                          whileTap={{ scale: 0.98 }}
                        >
                          {copied ? "Copied!" : "Copy UPI ID"}
                        </motion.button>
                      </div>
                    </div>

                    

                    <p className="text-xs text-muted-foreground">
                      Tip: On desktop, scan the QR with your phone. On mobile, tap “Open UPI” to launch your payments
                      app.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </MotionConfig>
  )
}
