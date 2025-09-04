import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Skeleton } from './index';

/**
 * Skeleton 컴포넌트의 Storybook 스토리
 * 스켈레톤 로딩의 다양한 크기와 사용 사례를 보여줍니다.
 */
const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
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
 * 기본 스켈레톤 스토리
 */
export const Default: Story = {
  render: () => <Skeleton className="h-4 w-[250px]" />,
};

/**
 * 다양한 크기의 스켈레톤
 */
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Skeleton className="h-4 w-[100px]" />
      <Skeleton className="h-4 w-[200px]" />
      <Skeleton className="h-4 w-[300px]" />
      <Skeleton className="h-8 w-[150px]" />
      <Skeleton className="h-12 w-[250px]" />
    </div>
  ),
};

/**
 * 카드 스켈레톤
 */
export const Card: Story = {
  render: () => (
    <div className="p-6 space-y-4 border rounded-lg w-80">
      <div className="flex items-center space-x-4">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[150px]" />
        </div>
      </div>
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-3/4 h-4" />
    </div>
  ),
};

/**
 * 아바타 스켈레톤
 */
export const Avatar: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Skeleton className="w-12 h-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
    </div>
  ),
};

/**
 * 텍스트 스켈레톤
 */
export const Text: Story = {
  render: () => (
    <div className="space-y-2 w-80">
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-3/4 h-4" />
      <Skeleton className="w-1/2 h-4" />
    </div>
  ),
};

/**
 * 버튼 스켈레톤
 */
export const Button: Story = {
  render: () => (
    <div className="flex space-x-2">
      <Skeleton className="w-20 h-10" />
      <Skeleton className="w-24 h-10" />
      <Skeleton className="w-16 h-10" />
    </div>
  ),
};

/**
 * 테이블 스켈레톤
 */
export const Table: Story = {
  render: () => (
    <div className="w-full space-y-3">
      <div className="flex space-x-4">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[120px]" />
        <Skeleton className="h-4 w-[80px]" />
      </div>
      <div className="flex space-x-4">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[120px]" />
        <Skeleton className="h-4 w-[80px]" />
      </div>
      <div className="flex space-x-4">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[120px]" />
        <Skeleton className="h-4 w-[80px]" />
      </div>
    </div>
  ),
};

/**
 * 프로필 카드 스켈레톤
 */
export const ProfileCard: Story = {
  render: () => (
    <div className="p-6 space-y-4 border rounded-lg w-80">
      <div className="flex items-center space-x-4">
        <Skeleton className="w-16 h-16 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[180px]" />
          <Skeleton className="h-3 w-[120px]" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-2/3 h-4" />
      </div>
      <div className="flex space-x-2">
        <Skeleton className="w-20 h-8" />
        <Skeleton className="w-24 h-8" />
      </div>
    </div>
  ),
};

/**
 * 이미지 스켈레톤
 */
export const Image: Story = {
  render: () => (
    <div className="space-y-4">
      <Skeleton className="w-full h-48 rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="w-3/4 h-4" />
        <Skeleton className="w-1/2 h-4" />
      </div>
    </div>
  ),
};

/**
 * 리스트 아이템 스켈레톤
 */
export const ListItem: Story = {
  render: () => (
    <div className="space-y-3 w-80">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center p-4 space-x-4 border rounded-lg">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="w-3/4 h-4" />
            <Skeleton className="w-1/2 h-3" />
          </div>
          <Skeleton className="w-16 h-6" />
        </div>
      ))}
    </div>
  ),
};

/**
 * 폼 스켈레톤
 */
export const Form: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="space-y-2">
        <Skeleton className="w-20 h-4" />
        <Skeleton className="w-full h-10" />
      </div>
      <div className="space-y-2">
        <Skeleton className="w-24 h-4" />
        <Skeleton className="w-full h-10" />
      </div>
      <div className="space-y-2">
        <Skeleton className="w-16 h-4" />
        <Skeleton className="w-full h-20" />
      </div>
      <div className="flex space-x-2">
        <Skeleton className="w-20 h-10" />
        <Skeleton className="w-24 h-10" />
      </div>
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
        <h3 className="mb-4 text-lg font-semibold">Basic Sizes</h3>
        <div className="space-y-2">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[300px]" />
          <Skeleton className="h-8 w-[150px]" />
          <Skeleton className="h-12 w-[250px]" />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Card Layout</h3>
        <div className="p-6 space-y-4 border rounded-lg w-80">
          <div className="flex items-center space-x-4">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-3/4 h-4" />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Form Elements</h3>
        <div className="space-y-4 w-80">
          <div className="space-y-2">
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-full h-10" />
          </div>
          <div className="space-y-2">
            <Skeleton className="w-24 h-4" />
            <Skeleton className="w-full h-10" />
          </div>
          <div className="flex space-x-2">
            <Skeleton className="w-20 h-10" />
            <Skeleton className="w-24 h-10" />
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">List Items</h3>
        <div className="space-y-3 w-80">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center p-4 space-x-4 border rounded-lg">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="w-3/4 h-4" />
                <Skeleton className="w-1/2 h-3" />
              </div>
              <Skeleton className="w-16 h-6" />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};
