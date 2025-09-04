import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { ScrollArea, ScrollBar } from './index';

const meta: Meta<typeof ScrollArea> = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ScrollArea className="w-48 border rounded-md h-72">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="text-sm">
            v1.2.0-beta.{i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="border rounded-md w-96 whitespace-nowrap">
      <div className="flex p-4 space-x-4 w-max">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="shrink-0">
            <div className="w-24 h-24 rounded-md bg-muted" />
            <p className="mt-2 text-sm">Item {i + 1}</p>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
};

export const Both: Story = {
  render: () => (
    <ScrollArea className="border rounded-md h-72 w-96">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Scrollable Content</h4>
        <div className="space-y-2">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-md bg-muted" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Item {i + 1}</p>
                <p className="text-xs text-muted-foreground">
                  This is a description for item {i + 1}. It contains some additional information.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ScrollBar />
    </ScrollArea>
  ),
};

export const LongContent: Story = {
  render: () => (
    <ScrollArea className="border rounded-md h-72 w-96">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Long Content</h4>
        <div className="space-y-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <h5 className="text-sm font-medium">Section {i + 1}</h5>
              <p className="text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
              </p>
            </div>
          ))}
        </div>
      </div>
      <ScrollBar />
    </ScrollArea>
  ),
};

export const Simple: Story = {
  render: () => (
    <ScrollArea className="w-48 h-32 border rounded-md">
      <div className="p-4">
        <div className="space-y-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="text-sm">
              Item {i + 1}
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  ),
};
