import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useCallback } from 'react';

const UPDATE_USER_EMAIL = gql`
  mutation UpdateUserEmail($email: String!) {
    update_user_email(email: $email) {
      email
    }
  }
`;

export default function useUpdateEmail() {
  const [updateUserEmail] = useMutation(UPDATE_USER_EMAIL);

  const update = useCallback(
    (email: string) => {
      return updateUserEmail({
        variables: {
          email,
        },
      });
    },
    [updateUserEmail],
  );

  return {
    update,
  };
}
