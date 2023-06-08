import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useCallback } from 'react';

const TRY_CHANGE_EMAIL = gql`
  mutation TRY_CHANGE_EMAIL($email: String!) {
    tryChangeEmail(email: $email)
  }
`;

export default function useChangeEmail() {
  const [changeEmail, { called }] = useMutation(TRY_CHANGE_EMAIL);
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
