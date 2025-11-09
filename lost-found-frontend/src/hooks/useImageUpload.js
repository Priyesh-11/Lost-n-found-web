import { useState } from 'react';
import toast from 'react-hot-toast';

export const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);

  const uploadImage = async (file) => {
    if (!file) return null;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a valid image (JPEG, PNG, WebP)');
      return null;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return null;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      
      if (data.secure_url) {
        toast.success('Image uploaded successfully!');
        return data.secure_url;
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Image upload error:', error);
      toast.error('Image upload failed. Please try again.');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearPreview = () => {
    setPreview(null);
  };

  return {
    uploadImage,
    uploading,
    preview,
    handleFileSelect,
    clearPreview,
    setPreview,
  };
};
