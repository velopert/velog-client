import apiClient from './apiClient';

export interface PreuploadInfo {
  image_path: string;
  signed_url: string;
}

/**
 * Create S3 Upload Signed URL
 * docs: https://documenter.getpostman.com/view/723994/S11RJuhq?version=latest#0deb64cc-6964-4ae0-a9a7-d8e1f3f50072
 */
export const createSignedUrl = (info: {
  type: string;
  filename: string;
  refId?: string;
}) => {
  return apiClient.post<PreuploadInfo>('/api/v2/files/create-url', info);
};

export async function uploadImage(
  file: File,
  info: { type: 'post' | 'profile'; refId?: string },
  onUploadProgress?: (value: number) => void,
) {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('type', info.type);
  if (info.refId) {
    formData.append('ref_id', info.refId);
  }
  const response = await apiClient.post<{ path: string }>(
    '/api/v2/files/upload',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress(e) {
        console.log(e);
      },
    },
  );

  return response.data;
}
