const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export const uploadImage = async (file: File): Promise<string | undefined> => {
  if (!file) {
    return undefined;
  }

  if (!UPLOAD_PRESET || !CLOUD_NAME) {
    console.error("Cloudinary configuration is missing");
    return undefined;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      console.error("Image upload failed:", response.statusText);
      return undefined;
    }

    const data = (await response.json()) as { secure_url?: string };
    return data.secure_url;
  } catch (error) {
    console.error("Image upload error:", error);
    return undefined;
  }
};
