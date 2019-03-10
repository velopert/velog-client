import apiClient from './apiClient';

/**
 * Send Auth Email
 * docs: https://documenter.getpostman.com/view/723994/S11RJuhq#7933badc-b964-4b84-88ff-4119134925a8
 * @param email
 */
export const sendAuthEmail = (email: string) =>
  apiClient.post<SendAuthEmailResponse>('/api/v2/auth/sendmail', {
    email,
  });
export type SendAuthEmailResponse = { registered: boolean };
