import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useCallback } from 'react';

const CHANGE_EMAIL = gql`
  mutation ChangeEmail($email: String!) {
    changeEmail(email: $email)
  }
`;

export default function useChangeEmail() {
  const [changeEmail, { called }] = useMutation(CHANGE_EMAIL);
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
