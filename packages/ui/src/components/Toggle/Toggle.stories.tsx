import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bold, Italic, Underline } from 'lucide-react';

import { Toggle } from './index';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
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
    <Toggle aria-label="Toggle italic">
      <Italic className="w-4 h-4" />
    </Toggle>
  ),
};

export const WithText: Story = {
  render: () => (
    <Toggle aria-label="Toggle bold">
      <Bold className="w-4 h-4" />
      Bold
    </Toggle>
  ),
};

export const Outline: Story = {
  render: () => (
    <Toggle variant="outline" aria-label="Toggle italic">
      <Italic className="w-4 h-4" />
    </Toggle>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Toggle size="sm" aria-label="Toggle italic">
        <Italic className="w-4 h-4" />
      </Toggle>
      <Toggle size="default" aria-label="Toggle italic">
        <Italic className="w-4 h-4" />
      </Toggle>
      <Toggle size="lg" aria-label="Toggle italic">
        <Italic className="w-4 h-4" />
      </Toggle>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Toggle disabled aria-label="Toggle italic">
      <Italic className="w-4 h-4" />
    </Toggle>
  ),
};

export const Multiple: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Toggle aria-label="Toggle bold">
        <Bold className="w-4 h-4" />
      </Toggle>
      <Toggle aria-label="Toggle italic">
        <Italic className="w-4 h-4" />
      </Toggle>
      <Toggle aria-label="Toggle underline">
        <Underline className="w-4 h-4" />
      </Toggle>
    </div>
  ),
};

export const WithTextAndIcon: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Toggle aria-label="Toggle bold">
        <Bold className="w-4 h-4" />
        Bold
      </Toggle>
      <Toggle aria-label="Toggle italic">
        <Italic className="w-4 h-4" />
        Italic
      </Toggle>
      <Toggle aria-label="Toggle underline">
        <Underline className="w-4 h-4" />
        Underline
      </Toggle>
    </div>
  ),
};
