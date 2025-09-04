import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input } from './index';

/**
 * Input 컴포넌트의 Storybook 스토리
 * 입력 필드의 다양한 타입과 상태를 보여줍니다.
 */
const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: '입력 필드의 타입',
    },
    placeholder: {
      control: { type: 'text' },
      description: '플레이스홀더 텍스트',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '입력 필드 비활성화 여부',
    },
    className: {
      control: { type: 'text' },
      description: '추가 CSS 클래스',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 입력 필드 스토리
 */
export const Default: Story = {
  args: {
    placeholder: 'Type something...',
  },
};

/**
 * 다양한 타입의 입력 필드
 */
export const Types: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <label className="block mb-2 text-sm font-medium">Text</label>
        <Input type="text" placeholder="Enter text..." />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium">Email</label>
        <Input type="email" placeholder="Enter email..." />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium">Password</label>
        <Input type="password" placeholder="Enter password..." />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium">Number</label>
        <Input type="number" placeholder="Enter number..." />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium">Search</label>
        <Input type="search" placeholder="Search..." />
      </div>
    </div>
  ),
};

/**
 * 다양한 상태의 입력 필드
 */
export const States: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <label className="block mb-2 text-sm font-medium">Default</label>
        <Input placeholder="Default state" />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium">With Value</label>
        <Input defaultValue="Hello World" />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium">Disabled</label>
        <Input disabled placeholder="Disabled input" />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium">Read Only</label>
        <Input readOnly defaultValue="Read only value" />
      </div>
    </div>
  ),
};

/**
 * 에러 상태의 입력 필드
 */
export const Error: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <label className="block mb-2 text-sm font-medium text-red-600">Email (Required)</label>
        <Input
          type="email"
          placeholder="Enter email..."
          aria-invalid="true"
          className="border-red-500 focus-visible:ring-red-500"
        />
        <p className="mt-1 text-sm text-red-600">Please enter a valid email address</p>
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-red-600">Password (Required)</label>
        <Input
          type="password"
          placeholder="Enter password..."
          aria-invalid="true"
          className="border-red-500 focus-visible:ring-red-500"
        />
        <p className="mt-1 text-sm text-red-600">Password must be at least 8 characters</p>
      </div>
    </div>
  ),
};

/**
 * 아이콘이 있는 입력 필드
 */
export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="relative">
        <svg
          className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <Input className="pl-10" placeholder="Search..." />
      </div>
      <div className="relative">
        <svg
          className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
          />
        </svg>
        <Input className="pl-10" type="email" placeholder="Email address" />
      </div>
      <div className="relative">
        <svg
          className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        <Input className="pl-10" type="password" placeholder="Password" />
      </div>
    </div>
  ),
};

/**
 * 파일 입력 필드
 */
export const FileInput: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <label className="block mb-2 text-sm font-medium">Upload File</label>
        <Input type="file" />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium">Upload Multiple Files</label>
        <Input type="file" multiple />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium">Upload Images Only</label>
        <Input type="file" accept="image/*" />
      </div>
    </div>
  ),
};

/**
 * 폼과 함께 사용되는 입력 필드
 */
export const InForm: Story = {
  render: () => (
    <form className="space-y-4 w-80">
      <div>
        <label htmlFor="name" className="block mb-2 text-sm font-medium">
          Name
        </label>
        <Input id="name" type="text" placeholder="Enter your name" />
      </div>
      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium">
          Email
        </label>
        <Input id="email" type="email" placeholder="Enter your email" />
      </div>
      <div>
        <label htmlFor="phone" className="block mb-2 text-sm font-medium">
          Phone
        </label>
        <Input id="phone" type="tel" placeholder="Enter your phone number" />
      </div>
      <div>
        <label htmlFor="website" className="block mb-2 text-sm font-medium">
          Website
        </label>
        <Input id="website" type="url" placeholder="https://example.com" />
      </div>
      <div>
        <label htmlFor="age" className="block mb-2 text-sm font-medium">
          Age
        </label>
        <Input id="age" type="number" placeholder="Enter your age" min="0" max="120" />
      </div>
    </form>
  ),
};

/**
 * 다양한 크기의 입력 필드
 */
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <label className="block mb-2 text-sm font-medium">Small</label>
        <Input className="h-8 text-sm" placeholder="Small input" />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium">Default</label>
        <Input placeholder="Default input" />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium">Large</label>
        <Input className="h-12 text-lg" placeholder="Large input" />
      </div>
    </div>
  ),
};

/**
 * 모든 변형을 보여주는 종합 스토리
 */
export const AllVariations: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-medium">Input Types</h3>
        <div className="grid grid-cols-2 gap-4">
          <Input type="text" placeholder="Text input" />
          <Input type="email" placeholder="Email input" />
          <Input type="password" placeholder="Password input" />
          <Input type="number" placeholder="Number input" />
          <Input type="search" placeholder="Search input" />
          <Input type="url" placeholder="URL input" />
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">States</h3>
        <div className="grid grid-cols-2 gap-4">
          <Input placeholder="Default" />
          <Input defaultValue="With value" />
          <Input disabled placeholder="Disabled" />
          <Input readOnly defaultValue="Read only" />
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">With Icons</h3>
        <div className="space-y-2">
          <div className="relative">
            <svg
              className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <Input className="pl-10" placeholder="Search with icon" />
          </div>
          <div className="relative">
            <svg
              className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
            <Input className="pl-10" type="email" placeholder="Email with icon" />
          </div>
        </div>
      </div>
    </div>
  ),
};
