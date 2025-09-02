"use client"

import Link from "next/link"
import { motion, MotionConfig, useScroll, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Shield, Lock, EyeOff, Share2, KeyRound, Link2 } from "lucide-react"
import DonateCoffee from "@/components/donate-coffee-modal"

// Polished animation variants for consistent, professional motion
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
}

const REPO_URL = "https://github.com/ABI2006S/Darkcrypt_"

export default function LandingPage() {
  const { scrollYProgress } = useScroll()
  const progressX = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.2 })

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className="fixed left-0 top-0 z-50 h-0.5 w-full bg-primary"
        style={{ scaleX: progressX, transformOrigin: "0% 0%" }}
        aria-hidden
      />
      <main className="min-h-dvh bg-background text-foreground">
        <header className="w-full">
          <div className="mx-auto max-w-6xl px-6 py-10 md:py-14">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="size-6 text-cyan-200" aria-hidden />
                <span className="sr-only">DarkCrypt</span>
                <h1 className="glitch-title text-2xl md:text-3xl font-bold">DarkCrypt</h1>
              </div>
              <div className="hidden sm:flex items-center gap-3" role="navigation" aria-label="Primary">
                <motion.div
                  className="hidden sm:flex items-center gap-3"
                  role="navigation"
                  aria-label="Primary"
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: { opacity: 0, y: -6 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut", staggerChildren: 0.06 } },
                  }}
                >
                  <motion.div
                    variants={{ hidden: { opacity: 0, y: -6 }, show: { opacity: 1, y: 0 } }}
                    whileHover={{ y: -1 }}
                  >
                    <Link
                      href="#features"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Features
                    </Link>
                  </motion.div>
                  <motion.div
                    variants={{ hidden: { opacity: 0, y: -6 }, show: { opacity: 1, y: 0 } }}
                    whileHover={{ y: -1 }}
                  >
                    <Link
                      href="#how-it-works"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      How it works
                    </Link>
                  </motion.div>
                  <motion.div
                    variants={{ hidden: { opacity: 0, y: -6 }, show: { opacity: 1, y: 0 } }}
                    whileHover={{ y: -1 }}
                  >
                    <Link href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      FAQ
                    </Link>
                  </motion.div>
                  <motion.div
                    variants={{ hidden: { opacity: 0, y: -6 }, show: { opacity: 1, y: 0 } }}
                    whileHover={{ y: -1 }}
                  >
                    <Link href="/console">
                      <Button className="ml-2 relative bg-primary text-primary-foreground hover:opacity-90 btn-pulse">
                        Open Console
                      </Button>
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
              {/* Removed non-functional ThemeToggle on mobile */}
            </div>

            <section className="mt-10 md:mt-16">
              <div className="max-w-2xl">
                <motion.h2
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  className="text-pretty text-3xl md:text-5xl font-semibold leading-tight"
                >
                  End‑to‑end encrypted messenger and secure text sharing
                </motion.h2>

                <motion.p
                  variants={fadeIn}
                  initial="hidden"
                  animate="show"
                  className="mt-4 text-muted-foreground leading-relaxed"
                >
                  Encrypt. Share. Vanish. All cryptography runs in your browser with modern Web Crypto. No accounts. No
                  servers for your secrets. Just zero‑knowledge sharing you control.
                </motion.p>

                <motion.div variants={fadeIn} initial="hidden" animate="show" className="mt-6 flex items-center gap-3">
                  <Link href="/console">
                    <Button className="relative bg-primary text-primary-foreground hover:opacity-90 btn-pulse">
                      Open Console
                    </Button>
                  </Link>
                  <a
                    href={REPO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-foreground"
                    aria-label="Learn more on GitHub"
                  >
                    <span>Learn more</span>
                    <Link2 className="size-4" aria-hidden />
                  </a>
                </motion.div>

                <motion.div variants={fadeIn} initial="hidden" animate="show" className="mt-6 flex items-center gap-4">
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="inline-flex items-center gap-2 rounded-md bg-card px-3 py-2 ring-1 ring-border"
                  >
                    <Lock className="size-4 text-primary" aria-hidden />
                    <span className="text-sm">AES‑GCM • PBKDF2</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="inline-flex items-center gap-2 rounded-md bg-card px-3 py-2 ring-1 ring-border"
                  >
                    <EyeOff className="size-4 text-accent" aria-hidden />
                    <span className="text-sm">Zero‑knowledge</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="inline-flex items-center gap-2 rounded-md bg-card px-3 py-2 ring-1 ring-border"
                  >
                    <Share2 className="size-4 text-primary" aria-hidden />
                    <span className="text-sm">Hash‑only share links</span>
                  </motion.div>
                </motion.div>
              </div>
            </section>
          </div>
        </header>

        <section id="trust" className="bg-popover text-popover-foreground">
          <div className="mx-auto max-w-6xl px-6 py-10 md:py-14">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 gap-4 sm:grid-cols-3"
            >
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 rounded-md px-3 py-2 ring-1 ring-border"
              >
                <Card className="bg-card text-card-foreground">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="size-5 text-accent" aria-hidden />
                      No server storage
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm leading-relaxed">
                    Secrets never leave your browser unencrypted. We can’t read what you send.
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 rounded-md bg-card px-3 py-2 ring-1 ring-border"
              >
                <Card className="bg-card text-card-foreground">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <KeyRound className="size-5 text-primary" aria-hidden />
                      Passphrase‑locked
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm leading-relaxed">
                    AES‑GCM with keys derived via PBKDF2. Share passphrases out‑of‑band for maximum safety.
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 rounded-md bg-card px-3 py-2 ring-1 ring-border"
              >
                <Card className="bg-card text-card-foreground">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Share2 className="size-5 text-primary" aria-hidden />
                      Shareable links
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm leading-relaxed">
                    Links only contain ciphertext in the URL hash. We never see the passphrase.
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="features" className="bg-background">
          <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
            <motion.h3 variants={fadeUp} initial="hidden" animate="show" className="text-2xl md:text-3xl font-semibold">
              Features
            </motion.h3>
            <motion.p
              variants={fadeIn}
              initial="hidden"
              animate="show"
              className="mt-2 text-muted-foreground max-w-2xl"
            >
              Practical tools for private sharing in a minimal, dark interface with strong defaults.
            </motion.p>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              <motion.div variants={fadeUp}>
                <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 250, damping: 18 }}>
                  <Card className="bg-card">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2">
                        <Lock className="size-5 text-primary" aria-hidden />
                        End‑to‑end by default
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-card-foreground/90">
                      Encryption and decryption happen client‑side using the Web Crypto API.
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>

              <motion.div variants={fadeUp}>
                <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 250, damping: 18 }}>
                  <Card className="bg-card">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2">
                        <Share2 className="size-5 text-primary" aria-hidden />
                        One‑click share links
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-card-foreground/90">
                      Copy a link with ciphertext in the hash. Share passphrases separately for safety.
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>

              <motion.div variants={fadeUp}>
                <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 250, damping: 18 }}>
                  <Card className="bg-card">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2">
                        <EyeOff className="size-5 text-accent" aria-hidden />
                        No tracking or accounts
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-card-foreground/90">
                      No analytics on your secrets. No accounts required to use the console.
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="how-it-works" className="bg-popover text-popover-foreground">
          <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
            <motion.h3 variants={fadeUp} initial="hidden" animate="show" className="text-2xl md:text-3xl font-semibold">
              How it works
            </motion.h3>
            <motion.p variants={fadeIn} initial="hidden" animate="show" className="mt-2">
              A simple flow that keeps your secrets safe and shareable.
            </motion.p>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3"
            >
              <motion.div variants={fadeUp}>
                <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 250, damping: 18 }}>
                  <Card className="bg-card">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-card-foreground">
                        <span className="inline-flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
                          1
                        </span>
                        Write your secret
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-card-foreground">
                      Open the Console and paste your message. Choose a strong passphrase.
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
              <motion.div variants={fadeUp}>
                <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 250, damping: 18 }}>
                  <Card className="bg-card">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-card-foreground">
                        <span className="inline-flex size-7 items-center justify-center rounded-full bg-accent text-accent-foreground text-sm">
                          2
                        </span>
                        Encrypt locally
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-card-foreground">
                      We derive a key with PBKDF2 and encrypt with AES‑GCM in your browser.
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
              <motion.div variants={fadeUp}>
                <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 250, damping: 18 }}>
                  <Card className="bg-card">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-card-foreground">
                        <span className="inline-flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
                          3
                        </span>
                        Share the link
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-card-foreground">
                      Send the link (ciphertext in hash). Share the passphrase out‑of‑band.
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-8"
            >
              <Link href="/console">
                <Button className="bg-primary text-primary-foreground hover:opacity-90 btn-pulse">Open Console</Button>
              </Link>
            </motion.div>
          </div>
        </section>

        <section id="faq" className="bg-background">
          <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
            <motion.h3 variants={fadeUp} initial="hidden" animate="show" className="text-2xl md:text-3xl font-semibold">
              FAQ
            </motion.h3>
            <Accordion type="single" collapsible className="mt-4">
              <AccordionItem value="q1">
                <AccordionTrigger>Do you store my messages?</AccordionTrigger>
                <AccordionContent>
                  No. Messages are encrypted and decrypted in your browser. We never receive plaintext.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q2">
                <AccordionTrigger>What algorithms do you use?</AccordionTrigger>
                <AccordionContent>
                  AES‑GCM for encryption with keys derived via PBKDF2. All using the Web Crypto API.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q3">
                <AccordionTrigger>What’s in the share link?</AccordionTrigger>
                <AccordionContent>
                  Only the ciphertext in the URL hash. The passphrase is never included; share it separately.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        <footer className="bg-primary text-primary-foreground">
          <div className="mx-auto max-w-6xl px-6 py-10 md:py-12">
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h4 className="text-lg font-semibold">Ready to encrypt?</h4>
                <p className="text-sm opacity-90">Open the Console and start sharing securely.</p>
              </div>
              <Link href="/console">
                <Button variant="secondary" className="bg-foreground text-background hover:opacity-90 btn-pulse">
                  Open Console
                </Button>
              </Link>
            </div>
          </div>
        </footer>
        <DonateCoffee />
      </main>
    </MotionConfig>
  )
}
