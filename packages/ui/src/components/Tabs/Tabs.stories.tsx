import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Tabs, TabsContent, TabsList, TabsTrigger } from './index';

/**
 * Tabs 컴포넌트의 Storybook 스토리
 * 탭의 다양한 사용 사례를 보여줍니다.
 */
const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: { type: 'text' },
      description: '기본 선택된 탭의 값',
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: '탭의 방향',
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
 * 기본 탭 스토리
 */
export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-96">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Account</h3>
          <p className="text-sm text-muted-foreground">
            Make changes to your account here. Click save when you&apos;re done.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Password</h3>
          <p className="text-sm text-muted-foreground">
            Change your password here. After saving, you&apos;ll be logged out.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

/**
 * 여러 탭이 있는 예시
 */
export const MultipleTabs: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-96">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Overview</h3>
          <p className="text-sm text-muted-foreground">Get a high-level view of your dashboard and key metrics.</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Total Users</h4>
              <p className="text-2xl font-bold">1,234</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Revenue</h4>
              <p className="text-2xl font-bold">$12,345</p>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="analytics">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Analytics</h3>
          <p className="text-sm text-muted-foreground">Detailed analytics and insights about your data.</p>
          <div className="flex items-center justify-center h-32 rounded-lg bg-muted">
            <p className="text-muted-foreground">Analytics Chart</p>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="reports">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Reports</h3>
          <p className="text-sm text-muted-foreground">Generate and view detailed reports.</p>
          <div className="space-y-2">
            <div className="p-3 border rounded-lg">
              <h4 className="font-medium">Monthly Report</h4>
              <p className="text-sm text-muted-foreground">Generated on Dec 1, 2023</p>
            </div>
            <div className="p-3 border rounded-lg">
              <h4 className="font-medium">Quarterly Report</h4>
              <p className="text-sm text-muted-foreground">Generated on Nov 1, 2023</p>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="notifications">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Notifications</h3>
          <p className="text-sm text-muted-foreground">Manage your notification preferences.</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Email notifications</span>
              <input type="checkbox" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Push notifications</span>
              <input type="checkbox" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">SMS notifications</span>
              <input type="checkbox" />
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

/**
 * 아이콘이 있는 탭
 */
export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="home" className="w-96">
      <TabsList>
        <TabsTrigger value="home">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Home
        </TabsTrigger>
        <TabsTrigger value="search">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          Search
        </TabsTrigger>
        <TabsTrigger value="settings">
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
        </TabsTrigger>
      </TabsList>
      <TabsContent value="home">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Home</h3>
          <p className="text-sm text-muted-foreground">Welcome to your dashboard home page.</p>
        </div>
      </TabsContent>
      <TabsContent value="search">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Search</h3>
          <p className="text-sm text-muted-foreground">Search through your data and files.</p>
        </div>
      </TabsContent>
      <TabsContent value="settings">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Settings</h3>
          <p className="text-sm text-muted-foreground">Configure your application settings.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

/**
 * 프로필 설정 탭
 */
export const ProfileSettings: Story = {
  render: () => (
    <Tabs defaultValue="profile" className="w-96">
      <TabsList>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="appearance">Appearance</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Profile</h3>
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium">Name</label>
              <input className="w-full p-2 border rounded-md" placeholder="Enter your name" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Bio</label>
              <textarea className="w-full p-2 border rounded-md" rows={3} placeholder="Tell us about yourself" />
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="account">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Account</h3>
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium">Email</label>
              <input className="w-full p-2 border rounded-md" type="email" placeholder="Enter your email" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Password</label>
              <input className="w-full p-2 border rounded-md" type="password" placeholder="Enter your password" />
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="appearance">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Appearance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Dark mode</span>
              <input type="checkbox" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Compact mode</span>
              <input type="checkbox" />
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="notifications">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Email notifications</span>
              <input type="checkbox" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Push notifications</span>
              <input type="checkbox" />
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

/**
 * 코드 예시 탭
 */
export const CodeExample: Story = {
  render: () => (
    <Tabs defaultValue="html" className="w-96">
      <TabsList>
        <TabsTrigger value="html">HTML</TabsTrigger>
        <TabsTrigger value="css">CSS</TabsTrigger>
        <TabsTrigger value="js">JavaScript</TabsTrigger>
      </TabsList>
      <TabsContent value="html">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">HTML</h3>
          <pre className="p-4 overflow-x-auto text-sm rounded-md bg-muted">
            <code>{`<div class="container">
  <h1>Hello World</h1>
  <p>This is a simple HTML example.</p>
</div>`}</code>
          </pre>
        </div>
      </TabsContent>
      <TabsContent value="css">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">CSS</h3>
          <pre className="p-4 overflow-x-auto text-sm rounded-md bg-muted">
            <code>{`.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #333;
  font-size: 2rem;
}`}</code>
          </pre>
        </div>
      </TabsContent>
      <TabsContent value="js">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">JavaScript</h3>
          <pre className="p-4 overflow-x-auto text-sm rounded-md bg-muted">
            <code>{`document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('.container');
  container.style.opacity = '1';
});`}</code>
          </pre>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

/**
 * 모든 변형을 보여주는 종합 스토리
 */
export const AllVariations: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Basic Tabs</h3>
        <Tabs defaultValue="tab1" className="w-96">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <div className="p-4">
              <h4 className="font-medium">Content for Tab 1</h4>
              <p className="text-sm text-muted-foreground">This is the content for the first tab.</p>
            </div>
          </TabsContent>
          <TabsContent value="tab2">
            <div className="p-4">
              <h4 className="font-medium">Content for Tab 2</h4>
              <p className="text-sm text-muted-foreground">This is the content for the second tab.</p>
            </div>
          </TabsContent>
          <TabsContent value="tab3">
            <div className="p-4">
              <h4 className="font-medium">Content for Tab 3</h4>
              <p className="text-sm text-muted-foreground">This is the content for the third tab.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">With Icons</h3>
        <Tabs defaultValue="home" className="w-96">
          <TabsList>
            <TabsTrigger value="home">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Home
            </TabsTrigger>
            <TabsTrigger value="search">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Search
            </TabsTrigger>
            <TabsTrigger value="settings">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Settings
            </TabsTrigger>
          </TabsList>
          <TabsContent value="home">
            <div className="p-4">
              <h4 className="font-medium">Home Content</h4>
              <p className="text-sm text-muted-foreground">Welcome to the home page.</p>
            </div>
          </TabsContent>
          <TabsContent value="search">
            <div className="p-4">
              <h4 className="font-medium">Search Content</h4>
              <p className="text-sm text-muted-foreground">Search through your data.</p>
            </div>
          </TabsContent>
          <TabsContent value="settings">
            <div className="p-4">
              <h4 className="font-medium">Settings Content</h4>
              <p className="text-sm text-muted-foreground">Configure your settings.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  ),
};
