import { useState } from 'react';
import { Button } from '@highjoon-dev/ui/components/Button';
import { Textarea } from '@highjoon-dev/ui/components/Textarea';

interface Props {
  onSubmit: (content: string) => Promise<void>;
  onCancel: () => void;
}

export default function ReplyInput({ onSubmit, onCancel }: Props) {
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    if (!content.trim()) {
      return;
    }

    setContent('');

    await onSubmit(content);
  };

  return (
    <div className="flex flex-col w-full gap-2 mt-2">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.currentTarget.value)}
        placeholder="답글을 입력하세요"
        rows={3}
        className="resize-y"
      />
      <div className="flex items-center justify-end gap-2">
        <Button size="sm" variant="ghost" onClick={onCancel}>
          취소
        </Button>
        <Button size="sm" onClick={handleSubmit} disabled={!content.trim()}>
          답글 등록
        </Button>
      </div>
    </div>
  );
}
