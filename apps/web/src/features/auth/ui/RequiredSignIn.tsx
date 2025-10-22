import React from 'react';
import { ActionIcon, Flex, Text } from '@mantine/core';
import { BsGithub } from 'react-icons/bs';

import { useSignIn } from '@/features/auth/model/useSignIn';

const RequiredSignIn = () => {
  const { signIn } = useSignIn();

  return (
    <Flex
      w="100%"
      direction="column"
      p="xs"
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: '4px',
      }}>
      <Flex h={100} direction="column" gap="sm" justify="center" align="center">
        <Text>로그인 후 댓글을 작성해주세요.</Text>
        <ActionIcon size="xl" variant="default" onClick={signIn}>
          <BsGithub size={30} />
        </ActionIcon>
      </Flex>
    </Flex>
  );
};

export default RequiredSignIn;
