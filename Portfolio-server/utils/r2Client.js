const { S3Client, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const crypto = require("crypto");
const path = require("path");

// Create the S3 client configured for R2
const r2 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const BUCKET = process.env.R2_BUCKET_NAME;
const PUBLIC_URL = process.env.R2_PUBLIC_URL;

/**
 * Upload a file buffer to R2
 * @param {Buffer} buffer - file contents
 * @param {string} originalName - original filename (for extension)
 * @param {string} mimetype - file MIME type
 * @param {string} folder - optional folder prefix e.g. "projects"
 * @returns {Promise<string>} public URL of uploaded file
 */
async function uploadToR2(buffer, originalName, mimetype, folder = "uploads") {
  // Generate unique filename
  const ext = path.extname(originalName).toLowerCase();
  const uniqueName = `${Date.now()}-${crypto.randomBytes(8).toString("hex")}${ext}`;
  const key = `${folder}/${uniqueName}`;

  await r2.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: buffer,
      ContentType: mimetype,
    })
  );

  return `${PUBLIC_URL}/${key}`;
}

/**
 * Delete a file from R2 by its public URL
 */
async function deleteFromR2(publicUrl) {
  if (!publicUrl || !publicUrl.startsWith(PUBLIC_URL)) return;

  const key = publicUrl.replace(`${PUBLIC_URL}/`, "");

  try {
    await r2.send(
      new DeleteObjectCommand({
        Bucket: BUCKET,
        Key: key,
      })
    );
  } catch (err) {
    console.error("R2 delete failed:", err.message);
  }
}

module.exports = { uploadToR2, deleteFromR2, r2 };