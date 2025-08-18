'use client';

import React from 'react';
import { Modal, ModalProps } from '@mantine/core';

type Props = Omit<ModalProps, 'children'> & {
  children: React.ReactNode;
};

/**
 * 재사용 가능한 기본 모달 컴포넌트
 * Mantine Modal을 래핑하여 일관된 스타일과 동작을 제공합니다.
 */
export default function BaseModal({ children, ...props }: Props) {
  return (
    <Modal
      centered
      size="sm"
      styles={{
        header: {
          borderBottom: '1px solid var(--mantine-color-gray-3)',
        },
        body: {
          padding: 'var(--mantine-spacing-lg)',
        },
      }}
      {...props}>
      {children}
    </Modal>
  );
}
