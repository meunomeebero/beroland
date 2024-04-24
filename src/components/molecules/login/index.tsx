import { Box } from '@chakra-ui/react';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { useCallback, useEffect } from 'react';
import { useAuth } from '../../../states/hooks/use-auth';
import useSessionStorage from '../../../states/hooks/use-session-storage';
import { debounce } from '../../../utils/debounce';

export function Login() {
  const { validateToken, data, logout } = useAuth();
  const token = useSessionStorage('token', data);

  useEffect(() => {
    debounce(1000, () => {
      if (!token) logout();
    })
  }, [token, logout]);

  const login = useCallback(async (event: CredentialResponse) => {
    await validateToken(event.credential);
  }, [validateToken]);

  return (
    <Box
      position="absolute"
      top="6"
      right="6"
    >
      {!data && (
        <GoogleLogin
          onSuccess={login}
          shape="circle"
          width='10px'
          size='medium'
          theme='filled_black'
          text='signin'
        />
      )}
    </Box>
  );
}
