import axios from "axios";

async function imageUpload(imageObject: FileList) {
  const file = imageObject[0];
  const formData = new FormData();
  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET!;
  const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME!;
  formData.append("file", file);
  formData.append("upload_preset", preset);
  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData,
    );
    const axiosData = await response.data;
    return axiosData.secure_url;
  } catch (error) {
    console.log(error);
  }
}

export default imageUpload;
