import crypto from "crypto";
const algorithm = "aes-256-cbc";
// generate 16 bytes of random data
const initVector = crypto.randomBytes(16);
// secret key generate 32 bytes of random data
const Securitykey = crypto.randomBytes(32);

// Encrypting text
// the cipher function
export const encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
  // encrypt the message
  // input encoding
  // output encoding
  let encryptedData = cipher.update(text, "utf-8", "hex");
  encryptedData += cipher.final("hex");
  console.log("Encrypted message: " + encryptedData);
  return encryptedData;
};

// Decrypting text
// the decipher function
export const decrypt = (text) => {
  const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);
  let decryptedData = decipher.update(encrypt(text), "hex", "utf-8");
  decryptedData += decipher.final("utf8");
  console.log("Decrypted message: " + decryptedData);
  return decryptedData;
};
