import { useDispatch } from 'react-redux';
import { GET_VELOG_CONFIG, VelogConfig } from '../../../lib/graphql/user';
import { useQuery } from '@apollo/react-hooks';
import { useEffect } from 'react';
import header from '../../../modules/header';
import { ssrEnabled } from '../../../lib/utils';
import useNotFound from '../../../lib/hooks/useNotFound';

export default function useApplyVelogConfig(username: string) {
  const { showNotFound } = useNotFound();
  const dispatch = useDispatch();
  const { data, error } = useQuery<{ velog_config: VelogConfig }>(
    GET_VELOG_CONFIG,
    {
      variables: {
        username,
      },
    },
  );

  if (error) {
    console.log(error);
  }

  // enter user velog
  useEffect(() => {
    dispatch(header.actions.enterUserVelog({ username }));
  }, [dispatch, username]);

  // leaving user velog
  useEffect(() => {
    return () => {
      dispatch(header.actions.leaveUserVelog());
    };
  }, [dispatch]);

  useEffect(() => {
    if (data && data.velog_config === null) {
      showNotFound();
      return;
    }
    if (!data || !data.velog_config) return;
    const { title, logo_image } = data.velog_config;

    dispatch(
      header.actions.enterUserVelog({
        username,
        userLogo: {
          title,
          logo_image,
        },
      }),
    );
  }, [data, dispatch, showNotFound, username]);

  if (data && ssrEnabled) {
    dispatch(
      header.actions.enterUserVelog({
        username,
        userLogo: {
          title: data.velog_config.title,
          logo_image: data.velog_config.logo_image,
        },
      }),
    );
  }

  if (ssrEnabled && data && data.velog_config === null) {
    showNotFound();
  }
}
