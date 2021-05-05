import AES from 'crypto-js/aes';
import encUtf8 from 'crypto-js/enc-utf8';

export const encode = (msg: string, key: string): string => AES.encrypt(msg, key).toString();
// Decrypt
export const decode = (ciphertext: string, key: string): string => {
    const  bytes  = AES.decrypt(ciphertext, key);
    return bytes.toString(encUtf8);
}

// Copies a string to the clipboard. Must be called from within an
// event handler such as click. May return false if it failed, but
// this is not always possible. Browser support for Chrome 43+,
// Firefox 42+, Safari 10+, Edge and Internet Explorer 10+.
// Internet Explorer: The clipboard feature may be disabled by
// an administrator. By default a prompt is shown the first
// time the clipboard is used (per session).
export const copyToClipboard = (text: string) => {
    if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        const textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in Microsoft Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        }
        catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        }
        finally {
            document.body.removeChild(textarea);
        }
    }
}