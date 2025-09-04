import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Checkbox } from '../Checkbox';
import { Input } from '../Input';
import { Label } from './index';

/**
 * Label 컴포넌트의 Storybook 스토리
 * 라벨의 다양한 사용 사례를 보여줍니다.
 */
const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: { type: 'text' },
      description: '추가 CSS 클래스',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 라벨 스토리
 */
export const Default: Story = {
  args: {
    children: 'Label',
  },
};

/**
 * 입력 필드와 함께 사용되는 라벨
 */
export const WithInput: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="Enter your email" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="Enter your password" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" type="text" placeholder="Enter your full name" />
      </div>
    </div>
  ),
};

/**
 * 체크박스와 함께 사용되는 라벨
 */
export const WithCheckbox: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">I agree to the terms and conditions</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="newsletter" />
        <Label htmlFor="newsletter">Subscribe to newsletter</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="notifications" />
        <Label htmlFor="notifications">Enable push notifications</Label>
      </div>
    </div>
  ),
};

/**
 * 필수 필드 표시가 있는 라벨
 */
export const Required: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="space-y-2">
        <Label htmlFor="required-email">
          Email <span className="text-red-500">*</span>
        </Label>
        <Input id="required-email" type="email" placeholder="Enter your email" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="required-password">
          Password <span className="text-red-500">*</span>
        </Label>
        <Input id="required-password" type="password" placeholder="Enter your password" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="optional-name">Full Name (Optional)</Label>
        <Input id="optional-name" type="text" placeholder="Enter your full name" />
      </div>
    </div>
  ),
};

/**
 * 도움말 텍스트가 있는 라벨
 */
export const WithHelpText: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" type="text" placeholder="Enter your username" />
        <p className="text-sm text-muted-foreground">Choose a unique username that others can use to find you.</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Input id="bio" type="text" placeholder="Tell us about yourself" />
        <p className="text-sm text-muted-foreground">A brief description of yourself (max 160 characters).</p>
      </div>
    </div>
  ),
};

/**
 * 에러 상태의 라벨
 */
export const WithError: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="space-y-2">
        <Label htmlFor="error-email" className="text-red-600">
          Email <span className="text-red-500">*</span>
        </Label>
        <Input
          id="error-email"
          type="email"
          placeholder="Enter your email"
          aria-invalid="true"
          className="border-red-500 focus-visible:ring-red-500"
        />
        <p className="text-sm text-red-600">Please enter a valid email address.</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="error-password" className="text-red-600">
          Password <span className="text-red-500">*</span>
        </Label>
        <Input
          id="error-password"
          type="password"
          placeholder="Enter your password"
          aria-invalid="true"
          className="border-red-500 focus-visible:ring-red-500"
        />
        <p className="text-sm text-red-600">Password must be at least 8 characters long.</p>
      </div>
    </div>
  ),
};

/**
 * 비활성화된 필드의 라벨
 */
export const Disabled: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="space-y-2">
        <Label htmlFor="disabled-email" className="text-muted-foreground">
          Email
        </Label>
        <Input id="disabled-email" type="email" placeholder="Enter your email" disabled />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled-checkbox" disabled />
        <Label htmlFor="disabled-checkbox" className="text-muted-foreground">
          This option is disabled
        </Label>
      </div>
    </div>
  ),
};

/**
 * 폼 그룹의 라벨
 */
export const FormGroup: Story = {
  render: () => (
    <form className="space-y-6 w-80">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Personal Information</h3>
        <div className="space-y-2">
          <Label htmlFor="first-name">First Name</Label>
          <Input id="first-name" type="text" placeholder="Enter your first name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last-name">Last Name</Label>
          <Input id="last-name" type="text" placeholder="Enter your last name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email-address">
            Email Address <span className="text-red-500">*</span>
          </Label>
          <Input id="email-address" type="email" placeholder="Enter your email" />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Preferences</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="marketing" />
            <Label htmlFor="marketing">Receive marketing emails</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="updates" />
            <Label htmlFor="updates">Receive product updates</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="newsletter" />
            <Label htmlFor="newsletter">Subscribe to newsletter</Label>
          </div>
        </div>
      </div>
    </form>
  ),
};

/**
 * 모든 변형을 보여주는 종합 스토리
 */
export const AllVariations: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-medium">Basic Labels</h3>
        <div className="space-y-2">
          <Label>Simple Label</Label>
          <Label className="text-muted-foreground">Muted Label</Label>
          <Label className="text-red-600">Error Label</Label>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">With Form Controls</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="demo-input">Input Label</Label>
            <Input id="demo-input" placeholder="Type something..." />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="demo-checkbox" />
            <Label htmlFor="demo-checkbox">Checkbox Label</Label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">Required Fields</h3>
        <div className="space-y-2">
          <Label htmlFor="required-demo">
            Required Field <span className="text-red-500">*</span>
          </Label>
          <Input id="required-demo" placeholder="This field is required" />
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">With Help Text</h3>
        <div className="space-y-2">
          <Label htmlFor="help-demo">Field with Help</Label>
          <Input id="help-demo" placeholder="Enter value" />
          <p className="text-sm text-muted-foreground">This is help text that explains what to enter.</p>
        </div>
      </div>
    </div>
  ),
};
