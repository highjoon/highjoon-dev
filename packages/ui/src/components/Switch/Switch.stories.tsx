import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Switch } from './index';

/**
 * Switch 컴포넌트의 Storybook 스토리
 * 스위치의 다양한 상태와 사용 사례를 보여줍니다.
 */
const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: { type: 'boolean' },
      description: '스위치의 체크 상태',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '스위치 비활성화 여부',
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
 * 기본 스위치 스토리
 */
export const Default: Story = {
  args: {},
};

/**
 * 다양한 상태의 스위치
 */
export const States: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <Switch id="unchecked" />
        <label htmlFor="unchecked" className="text-sm font-medium">
          Unchecked
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="checked" checked />
        <label htmlFor="checked" className="text-sm font-medium">
          Checked
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="disabled" disabled />
        <label htmlFor="disabled" className="text-sm font-medium text-muted-foreground">
          Disabled
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="disabled-checked" checked disabled />
        <label htmlFor="disabled-checked" className="text-sm font-medium text-muted-foreground">
          Disabled Checked
        </label>
      </div>
    </div>
  ),
};

/**
 * 설정 패널에서 사용되는 스위치
 */
export const Settings: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <label className="text-sm font-medium">Email notifications</label>
          <p className="text-sm text-muted-foreground">Receive emails about your account activity</p>
        </div>
        <Switch />
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <label className="text-sm font-medium">Push notifications</label>
          <p className="text-sm text-muted-foreground">Receive push notifications on your device</p>
        </div>
        <Switch checked />
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <label className="text-sm font-medium">SMS notifications</label>
          <p className="text-sm text-muted-foreground">Receive SMS messages for important updates</p>
        </div>
        <Switch />
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <label className="text-sm font-medium">Marketing emails</label>
          <p className="text-sm text-muted-foreground">Receive promotional content and offers</p>
        </div>
        <Switch />
      </div>
    </div>
  ),
};

/**
 * 프라이버시 설정 스위치
 */
export const PrivacySettings: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <label className="text-sm font-medium">Public profile</label>
          <p className="text-sm text-muted-foreground">Make your profile visible to everyone</p>
        </div>
        <Switch />
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <label className="text-sm font-medium">Show email</label>
          <p className="text-sm text-muted-foreground">Display your email address on your profile</p>
        </div>
        <Switch />
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <label className="text-sm font-medium">Allow search engines</label>
          <p className="text-sm text-muted-foreground">Let search engines index your profile</p>
        </div>
        <Switch checked />
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <label className="text-sm font-medium">Two-factor authentication</label>
          <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
        </div>
        <Switch checked />
      </div>
    </div>
  ),
};

/**
 * 테마 설정 스위치
 */
export const ThemeSettings: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <label className="text-sm font-medium">Dark mode</label>
          <p className="text-sm text-muted-foreground">Switch to dark theme</p>
        </div>
        <Switch />
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <label className="text-sm font-medium">Auto theme</label>
          <p className="text-sm text-muted-foreground">Automatically switch based on system preference</p>
        </div>
        <Switch checked />
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <label className="text-sm font-medium">High contrast</label>
          <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
        </div>
        <Switch />
      </div>
    </div>
  ),
};

/**
 * 기능 토글 스위치
 */
export const FeatureToggles: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <label className="text-sm font-medium">Beta features</label>
          <p className="text-sm text-muted-foreground">Enable experimental features</p>
        </div>
        <Switch />
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <label className="text-sm font-medium">Analytics</label>
          <p className="text-sm text-muted-foreground">Help us improve by sharing usage data</p>
        </div>
        <Switch checked />
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <label className="text-sm font-medium">Auto-save</label>
          <p className="text-sm text-muted-foreground">Automatically save your work</p>
        </div>
        <Switch checked />
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <label className="text-sm font-medium">Offline mode</label>
          <p className="text-sm text-muted-foreground">Work without an internet connection</p>
        </div>
        <Switch />
      </div>
    </div>
  ),
};

/**
 * 비활성화된 설정
 */
export const DisabledSettings: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <label className="text-sm font-medium text-muted-foreground">Premium feature</label>
          <p className="text-sm text-muted-foreground">This feature requires a premium subscription</p>
        </div>
        <Switch disabled />
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <label className="text-sm font-medium text-muted-foreground">Coming soon</label>
          <p className="text-sm text-muted-foreground">This feature is not yet available</p>
        </div>
        <Switch disabled />
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <label className="text-sm font-medium text-muted-foreground">Maintenance mode</label>
          <p className="text-sm text-muted-foreground">This feature is temporarily disabled</p>
        </div>
        <Switch checked disabled />
      </div>
    </div>
  ),
};

/**
 * 폼에서 사용되는 스위치
 */
export const InForm: Story = {
  render: () => (
    <form className="space-y-6 w-80">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Account Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Email notifications</label>
              <p className="text-sm text-muted-foreground">Receive important updates via email</p>
            </div>
            <Switch name="email-notifications" />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Push notifications</label>
              <p className="text-sm text-muted-foreground">Get notified about new messages</p>
            </div>
            <Switch name="push-notifications" checked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Public profile</label>
              <p className="text-sm text-muted-foreground">Make your profile visible to others</p>
            </div>
            <Switch name="public-profile" />
          </div>
        </div>
      </div>
    </form>
  ),
};

/**
 * 모든 상태를 보여주는 종합 스토리
 */
export const AllStates: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-medium">Basic States</h3>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Switch id="basic-unchecked" />
            <label htmlFor="basic-unchecked" className="text-sm">
              Unchecked
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="basic-checked" checked />
            <label htmlFor="basic-checked" className="text-sm">
              Checked
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="basic-disabled" disabled />
            <label htmlFor="basic-disabled" className="text-sm text-muted-foreground">
              Disabled
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="basic-disabled-checked" checked disabled />
            <label htmlFor="basic-disabled-checked" className="text-sm text-muted-foreground">
              Disabled Checked
            </label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">With Descriptions</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Feature 1</label>
              <p className="text-sm text-muted-foreground">Description for feature 1</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Feature 2</label>
              <p className="text-sm text-muted-foreground">Description for feature 2</p>
            </div>
            <Switch checked />
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">Disabled States</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium text-muted-foreground">Disabled Feature</label>
              <p className="text-sm text-muted-foreground">This feature is not available</p>
            </div>
            <Switch disabled />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium text-muted-foreground">Disabled Checked</label>
              <p className="text-sm text-muted-foreground">This feature is locked</p>
            </div>
            <Switch checked disabled />
          </div>
        </div>
      </div>
    </div>
  ),
};
