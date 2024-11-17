import { gql } from 'apollo-boost';

export type Ad = {
  id: string;
  title: string;
  body: string;
  image: string;
  url: string;
};

export type JobPosition = {
  id: string;
  name: string;
  companyName: string;
  companyLogo: string;
  thumbnail: string;
  url: string;
};

export const BANNER_ADS = gql`
  query BannerAds($writerUsername: String!) {
    bannerAds(writer_username: $writerUsername) {
      id
      title
      body
      url
      image
    }
  }
`;

export const JOB_POSITIONS = gql`
  query JobPositions($category: String) {
    jobPositions(category: $category) {
      id
      name
      companyName
      companyLogo
      thumbnail
      url
    }
  }
`;
