import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Badge } from './index';

/**
 * Badge 컴포넌트의 Storybook 스토리
 * 배지의 다양한 variant와 사용 사례를 보여줍니다.
 */
const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'secondary', 'destructive', 'outline'],
      description: '배지의 스타일 변형',
    },
    asChild: {
      control: { type: 'boolean' },
      description: 'Slot 컴포넌트로 렌더링할지 여부',
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
 * 기본 배지 스토리
 */
export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

/**
 * 다양한 variant를 보여주는 스토리
 */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

/**
 * 아이콘이 있는 배지
 */
export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        Success
      </Badge>
      <Badge variant="destructive">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
        Error
      </Badge>
      <Badge variant="secondary">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
        Info
      </Badge>
    </div>
  ),
};

/**
 * 상태 표시 배지
 */
export const Status: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Active</Badge>
      <Badge variant="secondary">Pending</Badge>
      <Badge variant="destructive">Inactive</Badge>
      <Badge variant="outline">Draft</Badge>
    </div>
  ),
};

/**
 * 카운트 배지
 */
export const Count: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">1</Badge>
      <Badge variant="secondary">5</Badge>
      <Badge variant="destructive">99+</Badge>
      <Badge variant="outline">1,234</Badge>
    </div>
  ),
};

/**
 * 링크로 사용되는 배지
 */
export const AsLink: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge asChild>
        <a href="#" onClick={(e) => e.preventDefault()}>
          Link Badge
        </a>
      </Badge>
      <Badge variant="outline" asChild>
        <a href="#" onClick={(e) => e.preventDefault()}>
          Outline Link
        </a>
      </Badge>
    </div>
  ),
};

/**
 * 사용자 태그
 */
export const Tags: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="secondary">React</Badge>
      <Badge variant="secondary">TypeScript</Badge>
      <Badge variant="secondary">Next.js</Badge>
      <Badge variant="secondary">Tailwind CSS</Badge>
      <Badge variant="outline">JavaScript</Badge>
      <Badge variant="outline">Node.js</Badge>
    </div>
  ),
};

/**
 * 알림 배지
 */
export const Notifications: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="relative">
        <button className="p-2 border rounded-md">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h6v-6H4v6z" />
          </svg>
        </button>
        <Badge className="absolute flex items-center justify-center w-5 h-5 p-0 text-xs -top-1 -right-1">3</Badge>
      </div>
      <div className="relative">
        <button className="p-2 border rounded-md">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <Badge
          variant="destructive"
          className="absolute flex items-center justify-center w-5 h-5 p-0 text-xs -top-1 -right-1">
          !
        </Badge>
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
        <h3 className="mb-3 text-sm font-medium">Variants</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">With Icons</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Success
          </Badge>
          <Badge variant="destructive">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            Error
          </Badge>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">Status Badges</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">Active</Badge>
          <Badge variant="secondary">Pending</Badge>
          <Badge variant="destructive">Inactive</Badge>
          <Badge variant="outline">Draft</Badge>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">Count Badges</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">1</Badge>
          <Badge variant="secondary">5</Badge>
          <Badge variant="destructive">99+</Badge>
          <Badge variant="outline">1,234</Badge>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">Tags</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">React</Badge>
          <Badge variant="secondary">TypeScript</Badge>
          <Badge variant="secondary">Next.js</Badge>
          <Badge variant="outline">JavaScript</Badge>
          <Badge variant="outline">Node.js</Badge>
        </div>
      </div>
    </div>
  ),
};
