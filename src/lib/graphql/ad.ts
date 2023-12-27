import { gql } from 'apollo-boost';

export type Ad = {
  id: string;
  title: string;
  body: string;
  image: string;
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
