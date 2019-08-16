import gql from 'graphql-tag';

export type ProfileLinks = {
  url?: string;
  email?: string;
  github?: string;
  twitter?: string;
  facebook?: string;
};

export type UserProfile = {
  id: string;
  display_name: string;
  short_bio: string;
  thumbnail: string | null;
  about: string;
  profile_links: ProfileLinks;
};
export type VelogConfig = {
  id: string;
  title: string | null;
  logo_image: string | null;
};
export type User = {
  id: string;
  username: string;
  email: string | null;
  is_certified: boolean;
  profile: UserProfile;
  velogConfig: VelogConfig | null;
};

export const GET_CURRENT_USER = gql`
  query CurrentUser {
    auth {
      id
      username
      profile {
        thumbnail
        display_name
      }
    }
  }
`;

export const GET_VELOG_CONFIG = gql`
  query VelogConfig($username: String) {
    velog_config(username: $username) {
      title
      logo_image
    }
  }
`;

export type CurrentUser = {
  id: string;
  username: string;
  profile: {
    thumbnail: string | null;
    display_name: string;
  };
};

export const GET_USER_PROFILE = gql`
  query UserProfile($username: String!) {
    user(username: $username) {
      id
      username
      profile {
        id
        display_name
        short_bio
        thumbnail
        profile_links
      }
    }
  }
`;

export type GetUserProfileResponse = {
  user: {
    id: string;
    username: string;
    profile: Omit<UserProfile, 'about'>;
  };
};
