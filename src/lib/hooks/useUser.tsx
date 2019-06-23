import { useSelector } from 'react-redux';
import { RootState } from '../../modules';

const useUser = () => {
  const user = useSelector((state: RootState) => state.core.user);
  return user;
};

export const useUserId = () => {
  const user = useUser();
  return user && user.id;
};

export default useUser;
