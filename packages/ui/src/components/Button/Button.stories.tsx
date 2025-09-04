import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from './index';

/**
 * Button 컴포넌트의 Storybook 스토리
 * 다양한 variant와 size 옵션을 보여줍니다.
 */
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: '버튼의 스타일 변형',
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'icon'],
      description: '버튼의 크기',
    },
    asChild: {
      control: { type: 'boolean' },
      description: 'Slot 컴포넌트로 렌더링할지 여부',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '버튼 비활성화 여부',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 버튼 스토리
 */
export const Default: Story = {
  args: {
    children: 'Button',
  },
};

/**
 * 다양한 variant를 보여주는 스토리
 */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

/**
 * 다양한 size를 보여주는 스토리
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">🚀</Button>
    </div>
  ),
};

/**
 * 비활성화된 버튼 스토리
 */
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button disabled>Disabled Default</Button>
      <Button variant="destructive" disabled>
        Disabled Destructive
      </Button>
      <Button variant="outline" disabled>
        Disabled Outline
      </Button>
      <Button variant="secondary" disabled>
        Disabled Secondary
      </Button>
      <Button variant="ghost" disabled>
        Disabled Ghost
      </Button>
      <Button variant="link" disabled>
        Disabled Link
      </Button>
    </div>
  ),
};

/**
 * 아이콘이 포함된 버튼 스토리
 */
export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add Item
      </Button>
      <Button variant="outline">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
          />
        </svg>
        Upload
      </Button>
      <Button variant="ghost" size="icon">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </Button>
    </div>
  ),
};

/**
 * asChild prop을 사용한 스토리
 */
export const AsChild: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button asChild>
        <a href="#" onClick={(e) => e.preventDefault()}>
          Link Button
        </a>
      </Button>
      <Button variant="outline" asChild>
        <a href="#" onClick={(e) => e.preventDefault()}>
          Outline Link
        </a>
      </Button>
    </div>
  ),
};

/**
 * 모든 조합을 보여주는 스토리
 */
export const AllCombinations: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="default">Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Sizes</h3>
        <div className="flex items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">🚀</Button>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Disabled States</h3>
        <div className="flex flex-wrap gap-4">
          <Button disabled>Disabled</Button>
          <Button variant="destructive" disabled>
            Disabled
          </Button>
          <Button variant="outline" disabled>
            Disabled
          </Button>
        </div>
      </div>
    </div>
  ),
};
