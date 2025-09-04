import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { toast } from 'sonner';

import { Button } from '@/components/Button';

import { Toaster } from './index';

const meta: Meta<typeof Toaster> = {
  title: 'Components/Sonner',
  component: Toaster,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <>
      <div className="space-y-4">
        <Button
          onClick={() => {
            toast('Event has been created');
          }}>
          Show Toast
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            toast.success('Event has been created');
          }}>
          Success Toast
        </Button>
        <Button
          variant="destructive"
          onClick={() => {
            toast.error('Event has been created');
          }}>
          Error Toast
        </Button>
      </div>
      <Toaster />
    </>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <>
      <div className="space-y-4">
        <Button
          onClick={() => {
            toast('Event has been created', {
              description: 'Monday, January 3rd at 6:00pm',
            });
          }}>
          Show Toast with Description
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            toast.success('Event has been created', {
              description: 'Monday, January 3rd at 6:00pm',
            });
          }}>
          Success Toast with Description
        </Button>
        <Button
          variant="destructive"
          onClick={() => {
            toast.error('Event has been created', {
              description: 'Monday, January 3rd at 6:00pm',
            });
          }}>
          Error Toast with Description
        </Button>
      </div>
      <Toaster />
    </>
  ),
};

export const WithAction: Story = {
  render: () => (
    <>
      <div className="space-y-4">
        <Button
          onClick={() => {
            toast('Event has been created', {
              description: 'Monday, January 3rd at 6:00pm',
              action: {
                label: 'Undo',
                onClick: () => console.log('Undo'),
              },
            });
          }}>
          Show Toast with Action
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            toast.success('Event has been created', {
              description: 'Monday, January 3rd at 6:00pm',
              action: {
                label: 'Undo',
                onClick: () => console.log('Undo'),
              },
            });
          }}>
          Success Toast with Action
        </Button>
        <Button
          variant="destructive"
          onClick={() => {
            toast.error('Event has been created', {
              description: 'Monday, January 3rd at 6:00pm',
              action: {
                label: 'Undo',
                onClick: () => console.log('Undo'),
              },
            });
          }}>
          Error Toast with Action
        </Button>
      </div>
      <Toaster />
    </>
  ),
};

export const WithPromise: Story = {
  render: () => (
    <>
      <div className="space-y-4">
        <Button
          onClick={() => {
            const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));

            toast.promise(promise, {
              loading: 'Loading...',
              success: 'Data has been loaded',
              error: 'Error loading data',
            });
          }}>
          Show Promise Toast
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            const promise = () => new Promise((resolve, reject) => setTimeout(reject, 2000));

            toast.promise(promise, {
              loading: 'Loading...',
              success: 'Data has been loaded',
              error: 'Error loading data',
            });
          }}>
          Show Promise Toast (Error)
        </Button>
      </div>
      <Toaster />
    </>
  ),
};
