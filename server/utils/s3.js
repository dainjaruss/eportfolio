const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

/**
 * Uploads a file buffer to Cloudflare R2
 * @param {Buffer} fileBuffer - The file data
 * @param {string} fileName - The desired file name
 * @param {string} contentType - The MIME type of the file
 * @returns {Promise<string>} - The public URL of the uploaded file
 */
const uploadToR2 = async (fileBuffer, fileName, contentType) => {
  const bucketName = process.env.R2_BUCKET_NAME;
  const publicUrl = process.env.R2_PUBLIC_URL;

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileName,
    Body: fileBuffer,
    ContentType: contentType,
  });

  try {
    await s3Client.send(command);
    return `${publicUrl}/${fileName}`;
  } catch (error) {
    console.error('Error uploading to R2:', error);
    throw error;
  }
};

module.exports = {
  uploadToR2,
};
