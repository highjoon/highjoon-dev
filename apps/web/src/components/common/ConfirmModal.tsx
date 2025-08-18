'use client';

import React from 'react';
import { Button, Group, Stack, Text, Title } from '@mantine/core';
import { CiWarning } from 'react-icons/ci';

import BaseModal from './BaseModal';

type Props = {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: string;
  isLoading?: boolean;
};

export default function ConfirmModal({
  opened,
  onClose,
  onConfirm,
  title = '확인',
  message,
  confirmText = '확인',
  cancelText = '취소',
  confirmColor,
  isLoading = false,
}: Props) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <BaseModal
      opened={opened}
      onClose={onClose}
      title={
        <Group gap="xs">
          <CiWarning size={20} color="var(--mantine-color-orange-6)" />
          <Title order={4}>{title}</Title>
        </Group>
      }
      closeOnClickOutside={!isLoading}
      closeOnEscape={!isLoading}>
      <Stack gap="lg">
        <Text size="sm" c="dimmed">
          {message}
        </Text>

        <Group justify="flex-end" gap="sm">
          <Button variant="default" onClick={onClose} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button color={confirmColor} onClick={handleConfirm} loading={isLoading}>
            {confirmText}
          </Button>
        </Group>
      </Stack>
    </BaseModal>
  );
}
