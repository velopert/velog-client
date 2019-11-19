import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useCallback } from 'react';

const UPDATE_EMAIL_RULES = gql`
  mutation UpdateEmailRules($notification: Boolean!, $promotion: Boolean!) {
    update_email_rules(notification: $notification, promotion: $promotion) {
      email_notification
      email_promotion
    }
  }
`;

type UpdateEmailRulesParams = {
  notification: boolean;
  promotion: boolean;
};

export default function useUpdateEmailRules() {
  const [updateEmailRules, { loading }] = useMutation(UPDATE_EMAIL_RULES);
  const update = useCallback(
    (params: UpdateEmailRulesParams) => {
      return updateEmailRules({
        variables: params,
      });
    },
    [updateEmailRules],
  );

  return {
    update,
    loading,
  };
}
