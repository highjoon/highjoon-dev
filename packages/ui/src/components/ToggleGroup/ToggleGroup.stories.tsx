import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { AlignCenter, AlignLeft, AlignRight, Bold, Italic, Underline } from 'lucide-react';

import { ToggleGroup, ToggleGroupItem } from './index';

const meta: Meta<typeof ToggleGroup> = {
  title: 'Components/ToggleGroup',
  component: ToggleGroup,
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
type Story = StoryObj<typeof ToggleGroup>;

export const Default: Story = {
  args: {},
  render: () => (
    <ToggleGroup type="multiple">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Bold className="w-4 h-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Italic className="w-4 h-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <Underline className="w-4 h-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Single: Story = {
  args: {},
  render: () => (
    <ToggleGroup type="single">
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeft className="w-4 h-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenter className="w-4 h-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRight className="w-4 h-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Outline: Story = {
  args: {},
  render: () => (
    <ToggleGroup type="multiple" variant="outline">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Bold className="w-4 h-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Italic className="w-4 h-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <Underline className="w-4 h-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Sizes: Story = {
  args: {},
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">Small:</span>
        <ToggleGroup type="multiple" size="sm">
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <Bold className="w-4 h-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            <Italic className="w-4 h-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Toggle underline">
            <Underline className="w-4 h-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">Default:</span>
        <ToggleGroup type="multiple" size="default">
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <Bold className="w-4 h-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            <Italic className="w-4 h-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Toggle underline">
            <Underline className="w-4 h-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">Large:</span>
        <ToggleGroup type="multiple" size="lg">
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <Bold className="w-4 h-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            <Italic className="w-4 h-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Toggle underline">
            <Underline className="w-4 h-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
};

export const WithText: Story = {
  args: {},
  render: () => (
    <ToggleGroup type="multiple">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Bold className="w-4 h-4" />
        Bold
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Italic className="w-4 h-4" />
        Italic
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <Underline className="w-4 h-4" />
        Underline
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Disabled: Story = {
  args: {},
  render: () => (
    <ToggleGroup type="multiple">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Bold className="w-4 h-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic" disabled>
        <Italic className="w-4 h-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <Underline className="w-4 h-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};
