import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../Button';
import { Popover, PopoverContent, PopoverTrigger } from './index';

/**
 * Popover 컴포넌트의 Storybook 스토리
 * 팝오버의 다양한 위치와 사용 사례를 보여줍니다.
 */
const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: { type: 'boolean' },
      description: '팝오버 열림 상태',
    },
    onOpenChange: {
      action: 'onOpenChange',
      description: '팝오버 상태 변경 핸들러',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 팝오버 스토리
 */
export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Dimensions</h4>
          <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

/**
 * 다양한 위치의 팝오버
 */
export const Positions: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-8">
      <div className="flex justify-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Top</Button>
          </PopoverTrigger>
          <PopoverContent side="top">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Top Popover</h4>
              <p className="text-sm text-muted-foreground">This popover appears on top.</p>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex justify-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Bottom</Button>
          </PopoverTrigger>
          <PopoverContent side="bottom">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Bottom Popover</h4>
              <p className="text-sm text-muted-foreground">This popover appears on bottom.</p>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex justify-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Left</Button>
          </PopoverTrigger>
          <PopoverContent side="left">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Left Popover</h4>
              <p className="text-sm text-muted-foreground">This popover appears on left.</p>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex justify-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Right</Button>
          </PopoverTrigger>
          <PopoverContent side="right">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Right Popover</h4>
              <p className="text-sm text-muted-foreground">This popover appears on right.</p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  ),
};

/**
 * 설정 팝오버
 */
export const Settings: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Settings
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium leading-none">Settings</h4>
            <p className="text-sm text-muted-foreground">Manage your preferences</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Dark mode</span>
              <input type="checkbox" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Notifications</span>
              <input type="checkbox" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Auto-save</span>
              <input type="checkbox" defaultChecked />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

/**
 * 사용자 메뉴 팝오버
 */
export const UserMenu: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
          <span>John Doe</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56">
        <div className="space-y-2">
          <div className="px-2 py-1.5 text-sm font-medium">Account</div>
          <div className="px-2 py-1.5 text-sm hover:bg-accent rounded-sm cursor-pointer">Profile</div>
          <div className="px-2 py-1.5 text-sm hover:bg-accent rounded-sm cursor-pointer">Settings</div>
          <div className="px-2 py-1.5 text-sm hover:bg-accent rounded-sm cursor-pointer">Billing</div>
          <div className="my-2 border-t"></div>
          <div className="px-2 py-1.5 text-sm hover:bg-accent rounded-sm cursor-pointer">Sign out</div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

/**
 * 도움말 팝오버
 */
export const Help: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Help & Support</h4>
          <p className="text-sm text-muted-foreground">Need help? Here are some quick links to get you started.</p>
          <div className="mt-4 space-y-2">
            <div className="p-2 text-sm rounded-sm cursor-pointer hover:bg-accent">📚 Documentation</div>
            <div className="p-2 text-sm rounded-sm cursor-pointer hover:bg-accent">🎥 Video Tutorials</div>
            <div className="p-2 text-sm rounded-sm cursor-pointer hover:bg-accent">💬 Contact Support</div>
            <div className="p-2 text-sm rounded-sm cursor-pointer hover:bg-accent">❓ FAQ</div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

/**
 * 필터 팝오버
 */
export const Filter: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium leading-none">Filter Options</h4>
            <p className="text-sm text-muted-foreground">Choose your filter criteria</p>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">Status</label>
              <select className="w-full p-2 mt-1 text-sm border rounded-md">
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Date Range</label>
              <select className="w-full p-2 mt-1 text-sm border rounded-md">
                <option value="">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Category</label>
              <select className="w-full p-2 mt-1 text-sm border rounded-md">
                <option value="">All Categories</option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="shopping">Shopping</option>
                <option value="travel">Travel</option>
              </select>
            </div>
          </div>
          <div className="flex pt-2 space-x-2">
            <Button size="sm" className="flex-1">
              Apply
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              Clear
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

/**
 * 알림 팝오버
 */
export const Notifications: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h6v-6H4v6z" />
          </svg>
          <span className="absolute flex items-center justify-center w-3 h-3 text-xs text-white bg-red-500 rounded-full -top-1 -right-1">
            3
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Notifications</h4>
          <p className="text-sm text-muted-foreground">You have 3 new notifications</p>
        </div>
        <div className="mt-4 space-y-2">
          <div className="p-3 border rounded-md">
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 mt-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">New message</p>
                <p className="text-xs text-muted-foreground">You received a new message from John</p>
                <p className="mt-1 text-xs text-muted-foreground">2 minutes ago</p>
              </div>
            </div>
          </div>
          <div className="p-3 border rounded-md">
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 mt-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Task completed</p>
                <p className="text-xs text-muted-foreground">Your task has been completed</p>
                <p className="mt-1 text-xs text-muted-foreground">1 hour ago</p>
              </div>
            </div>
          </div>
          <div className="p-3 border rounded-md">
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 mt-2 bg-yellow-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Reminder</p>
                <p className="text-xs text-muted-foreground">Don&apos;t forget your meeting at 3 PM</p>
                <p className="mt-1 text-xs text-muted-foreground">3 hours ago</p>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-2">
          <Button size="sm" variant="outline" className="w-full">
            View All Notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

/**
 * 모든 변형을 보여주는 종합 스토리
 */
export const AllVariations: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Different Positions</h3>
        <div className="grid grid-cols-2 gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Top</Button>
            </PopoverTrigger>
            <PopoverContent side="top">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Top Popover</h4>
                <p className="text-sm text-muted-foreground">This popover appears on top.</p>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Bottom</Button>
            </PopoverTrigger>
            <PopoverContent side="bottom">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Bottom Popover</h4>
                <p className="text-sm text-muted-foreground">This popover appears on bottom.</p>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Left</Button>
            </PopoverTrigger>
            <PopoverContent side="left">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Left Popover</h4>
                <p className="text-sm text-muted-foreground">This popover appears on left.</p>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Right</Button>
            </PopoverTrigger>
            <PopoverContent side="right">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Right Popover</h4>
                <p className="text-sm text-muted-foreground">This popover appears on right.</p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Different Use Cases</h3>
        <div className="flex space-x-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Settings</Button>
            </PopoverTrigger>
            <PopoverContent className="w-60">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Settings</h4>
                <p className="text-sm text-muted-foreground">Manage your preferences</p>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Help</Button>
            </PopoverTrigger>
            <PopoverContent className="w-60">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Help</h4>
                <p className="text-sm text-muted-foreground">Get help and support</p>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Filter</Button>
            </PopoverTrigger>
            <PopoverContent className="w-60">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Filter</h4>
                <p className="text-sm text-muted-foreground">Filter your content</p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  ),
};
