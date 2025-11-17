import React from 'react';
import { Button } from '@highjoon-dev/ui/components/Button';

import { useSignIn } from '@/features/auth/model/useSignIn';

const SignOutButton = () => {
  const { signOut } = useSignIn();

  return (
    <Button variant="outline" onClick={signOut}>
      로그아웃
    </Button>
  );
};

export default SignOutButton;
