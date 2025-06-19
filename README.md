# symmetric-key-tool

English | [中文](https://github.com/zggmd/symmetric-key-tool/blob/main/README-ZH.md)

Symmetric Encryption Online Tool

Pure frontend page, no backend required.

Live Demo: [Symmetric Encryption Tool](https://encode.zggmd.com/)

The webpage supports PWA and can be added as a shortcut to your desktop for offline use.

You can use the demo directly, but it's recommended to build and deploy the service yourself for greater peace of mind.

The project is built with [create-react-app](https://create-react-app.dev/) using the [cra-template-pwa-typescript](https://www.npmjs.com/package/cra-template-pwa-typescript) template. The webpage theme color mimics the GitHub Dark Dimmed theme.

---

# Local Development
1. Clone this project.
2. `npm i` or `yarn`
3. `npm run start` or `yarn start`
4. Open http://localhost:3000/

---

# Build
1. `npm run build` or `yarn build`
2. The output will be in the `/build` directory at the root.

---

# Usage
1. Provide **plaintext** and a **key**, then click the **Encrypt button** to get the encrypted ciphertext. It will be automatically copied to your clipboard.
2. Provide **ciphertext** and a **key**, then click the **Decrypt button** to get the original plaintext. For security reasons, it **will not** be automatically copied to the clipboard to prevent other software from reading sensitive plaintext from your clipboard.
3. If you need to copy the original plaintext to your clipboard after decryption, please click the **Copy button** below.

---

# Project Philosophy
1. You should save the encrypted ciphertext and key yourself. This project does not (and should not) provide any storage functions.
2. Because the algorithms used are public (principles explained below), encrypted ciphertext may still be vulnerable to brute-force attacks. Therefore, it's best not to store ciphertext in public places.
3. Keys should be memorized, not written down somewhere.
4. If possible, please be sure to deploy and use **your own service**. For tools involving sensitive information like encryption and decryption, trust yourself, not tools provided by strangers.

---

# How It Works
Based on [crypto-js](https://github.com/brix/crypto-js), specifically using its AES encryption algorithm.

The [main code](https://github.com/zggmd/symmetric-key-tool/blob/main/src/utils/helper.ts#L4) is as follows:
```typescript
import AES from 'crypto-js/aes';
import encUtf8 from 'crypto-js/enc-utf8';
// Encrypt
export const encode = (msg: string, key: string): string => AES.encrypt(msg, key).toString();
// Decrypt
export const decode = (ciphertext: string, key: string): string => AES.decrypt(ciphertext, key).toString(encUtf8)
