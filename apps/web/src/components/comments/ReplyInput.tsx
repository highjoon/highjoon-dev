import { useState } from 'react';
import { Button, Flex, Group, Textarea } from '@mantine/core';

type Props = {
  onSubmit: (content: string) => Promise<void>;
  onCancel: () => void;
};

const ReplyInput = ({ onSubmit, onCancel }: Props) => {
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    if (!content.trim()) {
      return;
    }

    setContent('');

    await onSubmit(content);
  };

  return (
    <Flex w="100%" mt="xs" direction="column" gap="xs">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="답글을 입력하세요"
        rows={3}
        style={{ width: '100%', resize: 'vertical' }}
      />
      <Group gap="xs" justify="flex-end">
        <Button size="xs" variant="light" onClick={onCancel}>
          취소
        </Button>
        <Button size="xs" variant="filled" onClick={handleSubmit} disabled={!content.trim()}>
          답글 등록
        </Button>
      </Group>
    </Flex>
  );
};

export default ReplyInput;
