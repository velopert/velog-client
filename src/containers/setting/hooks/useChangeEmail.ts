import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useCallback } from 'react';

const INITIATE_CHANGE_EMAIL = gql`
  mutation InitiateChangeEmail($email: String!) {
    initiateChangeEmail(email: $email)
  }
`;

export default function useChangeEmail() {
  const [changeEmail, { called }] = useMutation(INITIATE_CHANGE_EMAIL);
  const change = useCallback(
    (email: string) => {
      return changeEmail({
        variables: {
          email,
        },
      });
    },
    [changeEmail],
  );

  return {
    change,
    called,
  };
}
