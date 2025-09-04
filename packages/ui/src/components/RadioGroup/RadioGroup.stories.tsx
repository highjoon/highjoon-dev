import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Label } from '@/components/Label';

import { RadioGroup, RadioGroupItem } from './index';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
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
    <RadioGroup defaultValue="option-one">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-three" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  ),
};

export const WithLabels: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="option-one">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="r2" disabled />
        <Label htmlFor="r2" className="text-muted-foreground">
          Disabled
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-three" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  ),
};

export const Vertical: Story = {
  render: () => (
    <RadioGroup defaultValue="option-one" className="grid grid-cols-1 gap-4">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="r1" />
        <Label htmlFor="r1">Option One</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="r2" />
        <Label htmlFor="r2">Option Two</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-three" id="r3" />
        <Label htmlFor="r3">Option Three</Label>
      </div>
    </RadioGroup>
  ),
};

export const WithDescriptions: Story = {
  render: () => (
    <RadioGroup defaultValue="option-one" className="grid grid-cols-1 gap-4">
      <div className="flex items-start space-x-2">
        <RadioGroupItem value="option-one" id="r1" className="mt-1" />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor="r1">Option One</Label>
          <p className="text-sm text-muted-foreground">This is the first option with a description.</p>
        </div>
      </div>
      <div className="flex items-start space-x-2">
        <RadioGroupItem value="option-two" id="r2" className="mt-1" />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor="r2">Option Two</Label>
          <p className="text-sm text-muted-foreground">This is the second option with a description.</p>
        </div>
      </div>
      <div className="flex items-start space-x-2">
        <RadioGroupItem value="option-three" id="r3" className="mt-1" />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor="r3">Option Three</Label>
          <p className="text-sm text-muted-foreground">This is the third option with a description.</p>
        </div>
      </div>
    </RadioGroup>
  ),
};
