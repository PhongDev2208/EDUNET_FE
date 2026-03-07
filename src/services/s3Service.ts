import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Configuration interface
interface S3Config {
  region: string;
  credentials: {
    accessKeyId: string;
    secretAccessKey: string;
  };
  bucketName: string;
}

class S3Service {
  private client: S3Client;
  private bucketName: string;

  constructor(config: S3Config) {
    this.client = new S3Client({
      region: config.region,
      credentials: config.credentials,
    });
    this.bucketName = config.bucketName;
  }

  async uploadFile(file: File, key: string): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: file,
      ContentType: file.type,
    });

    try {
      await this.client.send(command);
      return `https://${this.bucketName}.s3.amazonaws.com/${key}`;
    } catch (error) {
      console.error("Error uploading file to S3:", error);
      throw error;
    }
  }

  async getFileUrl(key: string, expiresIn = 3600): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    try {
      const url = await getSignedUrl(this.client, command, { expiresIn });
      return url;
    } catch (error) {
      console.error("Error getting signed URL:", error);
      throw error;
    }
  }
}

// Export a singleton instance or the class itself depending on usage
// For now, exporting the class so it can be instantiated with config
export default S3Service;
