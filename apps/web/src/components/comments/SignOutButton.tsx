import React from 'react';
import { Button } from '@mantine/core';

import { useSignIn } from '@/hooks/useSignIn';

const SignOutButton = () => {
  const { signOut } = useSignIn();

  return (
    <Button variant="default" onClick={signOut}>
      로그아웃
    </Button>
  );
};

export default SignOutButton;
