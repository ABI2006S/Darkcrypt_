const encoder = new TextEncoder()
const decoder = new TextDecoder()

function getCrypto(): Crypto {
  if (typeof window === "undefined" || !window.crypto || !window.crypto.subtle) {
    throw new Error("Web Crypto not available")
  }
  return window.crypto
}

function toBase64Url(bytes: Uint8Array): string {
  const b64 = btoa(String.fromCharCode(...bytes))
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "")
}

function fromBase64Url(s: string): Uint8Array {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4))
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/") + pad
  const bin = atob(b64)
  const out = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i)
  return out
}

async function deriveKey(pass: string, salt: Uint8Array) {
  const crypto = getCrypto()
  const keyMaterial = await crypto.subtle.importKey("raw", encoder.encode(pass), { name: "PBKDF2" }, false, [
    "deriveKey",
  ])
  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 150_000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  )
}

export async function encryptMessage(plain: string, passphrase: string) {
  const crypto = getCrypto()
  if (!plain) throw new Error("Empty message")
  if (!passphrase) throw new Error("Missing passphrase")

  const iv = crypto.getRandomValues(new Uint8Array(12))
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const key = await deriveKey(passphrase, salt)

  const ciphertextBuf = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encoder.encode(plain))

  const ct = new Uint8Array(ciphertextBuf)
  // payload structure: v1.salt.iv.ciphertext (base64url)
  const payload = ["v1", toBase64Url(salt), toBase64Url(iv), toBase64Url(ct)].join(".")

  return { ciphertext: payload }
}

export async function decryptMessage(payload: string, passphrase: string): Promise<string> {
  const crypto = getCrypto()
  if (!payload) throw new Error("Empty ciphertext")
  if (!passphrase) throw new Error("Missing passphrase")

  const parts = payload.split(".")
  if (parts.length !== 4 || parts[0] !== "v1") throw new Error("Invalid format")

  const salt = fromBase64Url(parts[1])
  const iv = fromBase64Url(parts[2])
  const ct = fromBase64Url(parts[3])

  const key = await deriveKey(passphrase, salt)
  try {
    const plainBuf = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ct)
    return decoder.decode(plainBuf)
  } catch (e) {
    throw new Error("Decryption failed")
  }
}

// Helpers for hash link payloads
export function toHashPayload(ciphertext: string) {
  // Keep identical; validate briefly
  if (!ciphertext.startsWith("v1.")) return ciphertext
  return ciphertext
}

export function fromHashPayload(hash: string) {
  return hash
}
