import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Avatar, AvatarFallback, AvatarImage } from './index';

/**
 * Avatar 컴포넌트의 Storybook 스토리
 * 아바타의 다양한 크기와 사용 사례를 보여줍니다.
 */
const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
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
 * 기본 아바타 스토리
 */
export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

/**
 * Fallback만 있는 아바타
 */
export const Fallback: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};

/**
 * 다양한 크기의 아바타
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar className="w-6 h-6">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback className="text-xs">XS</AvatarFallback>
      </Avatar>
      <Avatar className="w-8 h-8">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback className="text-sm">SM</AvatarFallback>
      </Avatar>
      <Avatar className="w-10 h-10">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar className="w-12 h-12">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback className="text-lg">LG</AvatarFallback>
      </Avatar>
      <Avatar className="w-16 h-16">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback className="text-xl">XL</AvatarFallback>
      </Avatar>
    </div>
  ),
};

/**
 * 그룹 아바타
 */
export const Group: Story = {
  render: () => (
    <div className="flex -space-x-2">
      <Avatar className="w-10 h-10 border-2 border-background">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar className="w-10 h-10 border-2 border-background">
        <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
        <AvatarFallback>VC</AvatarFallback>
      </Avatar>
      <Avatar className="w-10 h-10 border-2 border-background">
        <AvatarImage src="https://github.com/nextjs.png" alt="@nextjs" />
        <AvatarFallback>NJ</AvatarFallback>
      </Avatar>
      <Avatar className="w-10 h-10 border-2 border-background">
        <AvatarFallback>+5</AvatarFallback>
      </Avatar>
    </div>
  ),
};

/**
 * 상태 표시가 있는 아바타
 */
export const WithStatus: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="relative">
        <Avatar className="w-10 h-10">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 rounded-full border-background"></div>
      </div>
      <div className="relative">
        <Avatar className="w-10 h-10">
          <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
          <AvatarFallback>VC</AvatarFallback>
        </Avatar>
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-yellow-500 border-2 rounded-full border-background"></div>
      </div>
      <div className="relative">
        <Avatar className="w-10 h-10">
          <AvatarImage src="https://github.com/nextjs.png" alt="@nextjs" />
          <AvatarFallback>NJ</AvatarFallback>
        </Avatar>
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-gray-400 border-2 rounded-full border-background"></div>
      </div>
    </div>
  ),
};

/**
 * 사용자 프로필 카드
 */
export const UserProfile: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-4 border rounded-lg w-80">
      <Avatar className="w-12 h-12">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <h3 className="font-semibold">John Doe</h3>
        <p className="text-sm text-muted-foreground">Software Engineer</p>
        <p className="text-xs text-muted-foreground">Online</p>
      </div>
    </div>
  ),
};

/**
 * 다양한 Fallback 텍스트
 */
export const FallbackVariations: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>XY</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>?</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>👤</AvatarFallback>
      </Avatar>
    </div>
  ),
};

/**
 * 실패한 이미지 로딩
 */
export const FailedImage: Story = {
  render: () => (
    <div className="space-y-4">
      <Avatar>
        <AvatarImage src="https://invalid-url.com/image.png" alt="Failed to load" />
        <AvatarFallback>FL</AvatarFallback>
      </Avatar>
      <p className="text-sm text-muted-foreground">When image fails to load, fallback is shown</p>
    </div>
  ),
};

/**
 * 모든 변형을 보여주는 종합 스토리
 */
export const AllVariations: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Sizes</h3>
        <div className="flex items-center gap-4">
          <Avatar className="w-6 h-6">
            <AvatarFallback className="text-xs">XS</AvatarFallback>
          </Avatar>
          <Avatar className="w-8 h-8">
            <AvatarFallback className="text-sm">SM</AvatarFallback>
          </Avatar>
          <Avatar className="w-10 h-10">
            <AvatarFallback>MD</AvatarFallback>
          </Avatar>
          <Avatar className="w-12 h-12">
            <AvatarFallback className="text-lg">LG</AvatarFallback>
          </Avatar>
          <Avatar className="w-16 h-16">
            <AvatarFallback className="text-xl">XL</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">With Status</h3>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar>
              <AvatarFallback>ON</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 rounded-full border-background"></div>
          </div>
          <div className="relative">
            <Avatar>
              <AvatarFallback>AW</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-yellow-500 border-2 rounded-full border-background"></div>
          </div>
          <div className="relative">
            <Avatar>
              <AvatarFallback>OF</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-gray-400 border-2 rounded-full border-background"></div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Group</h3>
        <div className="flex -space-x-2">
          <Avatar className="w-10 h-10 border-2 border-background">
            <AvatarFallback>1</AvatarFallback>
          </Avatar>
          <Avatar className="w-10 h-10 border-2 border-background">
            <AvatarFallback>2</AvatarFallback>
          </Avatar>
          <Avatar className="w-10 h-10 border-2 border-background">
            <AvatarFallback>3</AvatarFallback>
          </Avatar>
          <Avatar className="w-10 h-10 border-2 border-background">
            <AvatarFallback>+5</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  ),
};
