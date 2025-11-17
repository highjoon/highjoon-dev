'use client';

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@highjoon-dev/ui/components/Dialog';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
}

export default function BaseModal({
  open,
  onOpenChange,
  title,
  children,
  closeOnClickOutside = true,
  closeOnEscape = true,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={closeOnClickOutside}>
      <DialogContent
        onPointerDownOutside={(e) => {
          if (!closeOnClickOutside) {
            e.preventDefault();
          }
        }}
        onEscapeKeyDown={(e) => {
          if (!closeOnEscape) {
            e.preventDefault();
          }
        }}
        className="sm:max-w-md">
        {title && <DialogHeader>{typeof title === 'string' ? <DialogTitle>{title}</DialogTitle> : title}</DialogHeader>}
        <div className="py-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
