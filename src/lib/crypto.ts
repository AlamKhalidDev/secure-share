import crypto from "crypto";

const MASTER_KEY = process.env.SECRETS_MASTER_KEY;
if (!MASTER_KEY || MASTER_KEY.length !== 32) {
  throw new Error(
    "Invalid SECRETS_MASTER_KEY. Must be a 32-character string. Check environment variables."
  );
}

export const encryptContent = (content: string) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", MASTER_KEY, iv);
  let encrypted = cipher.update(content, "utf8", "hex");
  encrypted += cipher.final("hex");
  return {
    encryptedContent: encrypted,
    iv: iv.toString("hex"),
  };
};

export const decryptContent = (encryptedContent: string, ivHex: string) => {
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv("aes-256-cbc", MASTER_KEY, iv);
  let decrypted = decipher.update(encryptedContent, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};
