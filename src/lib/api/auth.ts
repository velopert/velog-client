import apiClient from './apiClient';
import snakeCaseKeys from 'snakecase-keys';

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

/**
 * Get Register Token using code
 * docs: https://documenter.getpostman.com/view/723994/S11RJuhq#ceb55dc0-68f7-4b74-9d30-4e8ce86da988
 * @param code
 */
export const getRegisterToken = (code: string) =>
  apiClient.get<GetRegisterTokenResponse>(`/api/v2/auth/code/${code}`);

export type GetRegisterTokenResponse = {
  email: string;
  register_token: string;
};

export const localEmailRegister = ({
  registerToken,
  form,
}: {
  registerToken: string;
  form: LocalEmailRegisterForm;
}) =>
  apiClient.post<AuthResponse>(
    '/api/v2/auth/register/local',
    snakeCaseKeys({ registerToken, form }),
  );
type LocalEmailRegisterForm = {
  displayName: string;
  username: string;
  shortBio: string;
};
export type AuthResponse = {
  email: string;
  is_certified: boolean;
  username: string;
  id: string;
  created_at: string;
  updated_at: string;
  profile: {
    fk_user_id: string;
    display_name: string;
    short_bio: string;
    thumbnail: null;
    id: string;
    created_at: string;
    updated_at: string;
    profile_links: any;
  };
  tokens: {
    access_token: string;
    refresh_token: string;
  };
};

/**
 * Login using email code
 * docs: https://documenter.getpostman.com/view/723994/S11RJuhq#ceb55dc0-68f7-4b74-9d30-4e8ce86da988
 * @param code
 */
export const emailCodeLogin = (code: string) =>
  apiClient.get<AuthResponse>(`/api/v2/auth/code/${code}`);

export const logout = () => apiClient.post<void>('/api/v2/auth/logout');
