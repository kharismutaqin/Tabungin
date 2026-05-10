import CryptoJS from 'crypto-js'

export function encrypt(data: object, key: string): string {
  return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString()
}

export function decrypt<T>(ciphertext: string, key: string): T | null {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key)
    const decrypted = bytes.toString(CryptoJS.enc.Utf8)
    if (!decrypted) return null
    return JSON.parse(decrypted) as T
  } catch {
    return null
  }
}

export function hashKey(key: string): string {
  return CryptoJS.SHA256(key).toString(CryptoJS.enc.Hex)
}
