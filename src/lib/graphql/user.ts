export type UserProfile = {
  id: string;
  display_name: string;
  short_bio: string;
  thumbnail: string;
  about: string;
  profile_links: string;
};
export type User = {
  id: string;
  username: string;
  email: string | null;
  is_certified: boolean;
  profile: UserProfile;
};
