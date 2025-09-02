DarkCrypt – Privacy-first Message Encryptor 
....
Encrypt and decrypt messages securely without ever sending your data to a server.
....
>>Overview:
DarkCrypt is a privacy-first, client-side message encryption and decryption web app. All encryption occurs in-browser using AES-256 with user-defined passphrases. The app is designed with a dark hacker/decryption aesthetic, glitchy animations, and mysterious vibes.
No plaintext or passphrase leaves your device.
Shareable ciphertext allows safe communication between users.
Built as a React + Tailwind web app, deployable on Vercel.
....
>>Features:
Encrypt and decrypt messages entirely client-side.
User-defined passphrase for each message.
Copy/share ciphertext safely.
Stylish dark hacker-themed UI with glitch effects and animations.
Floating “Buy Me a Coffee / UPI QR” button for donations.
Responsive design (mobile & desktop).
Error handling with subtle glitch animation if passphrase is incorrect.
....
>>Encryption Logic:
....
Key Derivation: Passphrase → PBKDF2 (HMAC-SHA256, salt, 150,000 iterations → 256-bit key).
Cipher: AES-GCM (AES-256) for encryption/decryption.
IV: 12-byte random value per message.
Ciphertext Format (JSON):

    {
    "v": 1,
    "alg": "AES-GCM-PBKDF2",
    "salt": "<base64>",
    "iv": "<base64>",
    "ct": "<base64 ciphertext + tag>"
    }

Wrong passphrase → gibberish output (no hints).
All cryptography happens in-browser using Web Crypto API, optionally optimized via Web Worker for KDF operations.
....
>>UI / UX:
Landing Page: Animated, mysterious hacker vibes, scrambled title effect.
Encrypt Page: Monospace input, passphrase field, encrypt button, read-only ciphertext output.
Decrypt Page: Paste ciphertext, passphrase input, decrypt button, animated plaintext reveal.
Typography: JetBrains Mono / Source Code Pro.
....
>>Installation & Deployment:

1.Clone the repository:

     git clone https://github.com/<ABI2006S>/Darkcrypt_.git
     cd Darkcrypt_

2.Install dependencies:

    npm ci

3.Run locally:

    npm run dev

4.Build for production:
   
    npm run build
    npm start

5.Deploy on Vercel:
Connect your repo to Vercel.
Default Next.js build commands (npm run build).
No environment variables required for client-side encryption.
....
>>Usage:
Navigate to /encrypt or /decrypt.
Encrypt: Type your secret message + passphrase → click Encrypt → copy/share ciphertext.
Decrypt: Paste ciphertext + enter passphrase → click Decrypt → view original message.
Support: Click floating coffee button → modal opens → scan UPI/GPay QR or copy UPI ID.
....
>>Security & Privacy:
All encryption/decryption occurs client-side.
No plaintext or passphrase is transmitted or stored on any server.
Clipboard copy: configurable auto-clear after X seconds.
Strong passphrase recommended; weak passphrases will trigger warnings.
Optionally, one-time-view mode can clear decrypted text after viewing.
....
>>Donate / Support:
Support the project: ☕ Buy Me a Coffee / UPI QR.
Floating button at bottom-right opens donation modal.
Minimum suggested donation: ₹10.
QR code clickable / copyable for easy UPI payment.
....
>>Future Enhancements:
Argon2 (WASM) for KDF optimization.
One-time ephemeral link sharing.
Encrypted file/message support.
IndexedDB-based encrypted message history.
Additional glitchy animations & hacker easter eggs.
....
Developed by Abin Varughese John(ABI2006S) 💻
