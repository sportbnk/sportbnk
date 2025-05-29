import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { compressImage } from '@/utils/imageCompression';

export const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (file: File, userId: string): Promise<string | null> => {
    try {
      setUploading(true);

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return null;
      }

      // Validate file size (max 10MB before compression)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Image size must be less than 10MB');
        return null;
      }

      // Compress the image to keep it under 100KB
      console.log('Original file size:', (file.size / 1024).toFixed(2), 'KB');
      
      const compressedFile = await compressImage(file, 100, 0.8);
      
      console.log('Compressed file size:', (compressedFile.size / 1024).toFixed(2), 'KB');
      
      toast.success(`Image compressed from ${(file.size / 1024).toFixed(0)}KB to ${(compressedFile.size / 1024).toFixed(0)}KB`);

      const fileExt = 'jpg'; // Always use jpg after compression
      const fileName = `${userId}/avatar.${fileExt}`;

      // Upload the compressed file
      const { data, error } = await supabase.storage
        .from('profile-pictures')
        .upload(fileName, compressedFile, {
          upsert: true,
        });

      if (error) {
        console.error('Upload error:', error);
        toast.error('Failed to upload image');
        return null;
      }

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('profile-pictures')
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
      return null;
    } finally {
      setUploading(false);
    }
  };

  return { uploadImage, uploading };
};
