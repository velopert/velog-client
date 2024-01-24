import { gql } from 'apollo-boost';

export const NOTIFICATION_COUNT = gql`
  query NotificationCount {
    notificationCount
  }
`;
