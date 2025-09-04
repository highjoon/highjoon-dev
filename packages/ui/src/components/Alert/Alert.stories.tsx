import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Alert, AlertDescription, AlertTitle } from './index';

/**
 * Alert 컴포넌트의 Storybook 스토리
 * 알림의 다양한 variant와 사용 사례를 보여줍니다.
 */
const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive'],
      description: '알림의 스타일 변형',
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
 * 기본 알림 스토리
 */
export const Default: Story = {
  render: () => (
    <Alert className="w-96">
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>You can add components to your app using the cli.</AlertDescription>
    </Alert>
  ),
};

/**
 * 파괴적 알림 (에러/경고)
 */
export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive" className="w-96">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
    </Alert>
  ),
};

/**
 * 아이콘이 있는 알림
 */
export const WithIcon: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <Alert>
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
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>This is an informational alert with an icon.</AlertDescription>
      </Alert>

      <Alert variant="destructive">
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
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>This is a warning alert with an icon.</AlertDescription>
      </Alert>
    </div>
  ),
};

/**
 * 성공 알림
 */
export const Success: Story = {
  render: () => (
    <Alert className="text-green-800 border-green-200 w-96 bg-green-50">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>Your changes have been saved successfully.</AlertDescription>
    </Alert>
  ),
};

/**
 * 긴 콘텐츠가 있는 알림
 */
export const LongContent: Story = {
  render: () => (
    <Alert className="w-96">
      <AlertTitle>Important Update</AlertTitle>
      <AlertDescription>
        <div className="space-y-2">
          <p>We&apos;ve released a new version of our application with several important updates and improvements.</p>
          <ul className="space-y-1 text-sm list-disc list-inside">
            <li>Enhanced security features</li>
            <li>Improved performance</li>
            <li>New user interface elements</li>
            <li>Bug fixes and stability improvements</li>
          </ul>
          <p className="text-sm">
            Please update your application to the latest version to take advantage of these improvements.
          </p>
        </div>
      </AlertDescription>
    </Alert>
  ),
};

/**
 * 액션이 있는 알림
 */
export const WithAction: Story = {
  render: () => (
    <Alert className="w-96">
      <AlertTitle>New Feature Available</AlertTitle>
      <AlertDescription>We&apos;ve added a new feature that you might find useful. Check it out!</AlertDescription>
      <div className="flex gap-2 mt-3">
        <button className="text-sm font-medium underline hover:no-underline">Learn More</button>
        <button className="text-sm font-medium underline hover:no-underline">Dismiss</button>
      </div>
    </Alert>
  ),
};

/**
 * 모든 variant를 보여주는 종합 스토리
 */
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <Alert>
        <AlertTitle>Default Alert</AlertTitle>
        <AlertDescription>This is a default alert with standard styling.</AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <AlertTitle>Destructive Alert</AlertTitle>
        <AlertDescription>This is a destructive alert for errors and warnings.</AlertDescription>
      </Alert>

      <Alert className="text-blue-800 border-blue-200 bg-blue-50">
        <AlertTitle>Info Alert</AlertTitle>
        <AlertDescription>This is a custom info alert with blue styling.</AlertDescription>
      </Alert>

      <Alert className="text-green-800 border-green-200 bg-green-50">
        <AlertTitle>Success Alert</AlertTitle>
        <AlertDescription>This is a custom success alert with green styling.</AlertDescription>
      </Alert>

      <Alert className="text-yellow-800 border-yellow-200 bg-yellow-50">
        <AlertTitle>Warning Alert</AlertTitle>
        <AlertDescription>This is a custom warning alert with yellow styling.</AlertDescription>
      </Alert>
    </div>
  ),
};
