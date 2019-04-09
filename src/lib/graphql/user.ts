import gql from 'graphql-tag';

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

export type CurrentUser = {
  id: string;
  username: string;
  profile: {
    thumbnail: string;
    display_name: string;
  };
};
