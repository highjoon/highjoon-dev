import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Slider } from './index';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
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
    <div className="w-full max-w-sm">
      <Slider defaultValue={[50]} max={100} step={1} />
    </div>
  ),
};

export const Range: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <Slider defaultValue={[20, 80]} max={100} step={1} />
    </div>
  ),
};

export const WithSteps: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <Slider defaultValue={[50]} max={100} step={10} />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <Slider defaultValue={[50]} max={100} step={1} disabled />
    </div>
  ),
};

export const CustomRange: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <Slider defaultValue={[25]} max={50} step={1} />
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="h-48">
      <Slider defaultValue={[50]} max={100} step={1} orientation="vertical" />
    </div>
  ),
};

export const WithLabels: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Volume</label>
        <Slider defaultValue={[50]} max={100} step={1} />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0</span>
          <span>100</span>
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Brightness</label>
        <Slider defaultValue={[75]} max={100} step={1} />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0</span>
          <span>100</span>
        </div>
      </div>
    </div>
  ),
};
