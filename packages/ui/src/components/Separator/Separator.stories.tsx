import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Separator } from './index';

/**
 * Separator 컴포넌트의 Storybook 스토리
 * 구분선의 다양한 방향과 사용 사례를 보여줍니다.
 */
const meta: Meta<typeof Separator> = {
  title: 'Components/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: '구분선의 방향',
    },
    decorative: {
      control: { type: 'boolean' },
      description: '장식용 구분선인지 여부',
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
 * 기본 구분선 스토리
 */
export const Default: Story = {
  render: () => (
    <div className="w-80">
      <div className="p-4">Content above</div>
      <Separator />
      <div className="p-4">Content below</div>
    </div>
  ),
};

/**
 * 수직 구분선
 */
export const Vertical: Story = {
  render: () => (
    <div className="flex items-center h-20">
      <div className="p-4">Left</div>
      <Separator orientation="vertical" />
      <div className="p-4">Right</div>
    </div>
  ),
};

/**
 * 텍스트와 함께 사용되는 구분선
 */
export const WithText: Story = {
  render: () => (
    <div className="w-80">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="px-2 bg-background text-muted-foreground">Or continue with</span>
        </div>
      </div>
    </div>
  ),
};

/**
 * 섹션 구분에 사용되는 구분선
 */
export const SectionDivider: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <h3 className="text-lg font-semibold">Profile Settings</h3>
        <p className="text-sm text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold">Privacy Settings</h3>
        <p className="text-sm text-muted-foreground">Control your privacy and data sharing preferences.</p>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold">Notification Settings</h3>
        <p className="text-sm text-muted-foreground">Choose how you want to be notified.</p>
      </div>
    </div>
  ),
};

/**
 * 네비게이션 메뉴에서 사용되는 구분선
 */
export const NavigationMenu: Story = {
  render: () => (
    <div className="p-4 border rounded-lg w-80">
      <nav className="space-y-2">
        <a href="#" className="block px-3 py-2 text-sm rounded-md hover:bg-accent">
          Dashboard
        </a>
        <a href="#" className="block px-3 py-2 text-sm rounded-md hover:bg-accent">
          Projects
        </a>
        <a href="#" className="block px-3 py-2 text-sm rounded-md hover:bg-accent">
          Tasks
        </a>

        <Separator className="my-2" />

        <a href="#" className="block px-3 py-2 text-sm rounded-md hover:bg-accent">
          Settings
        </a>
        <a href="#" className="block px-3 py-2 text-sm rounded-md hover:bg-accent">
          Help
        </a>

        <Separator className="my-2" />

        <a href="#" className="block px-3 py-2 text-sm text-red-600 rounded-md hover:bg-accent">
          Sign Out
        </a>
      </nav>
    </div>
  ),
};

/**
 * 카드 내부에서 사용되는 구분선
 */
export const InCard: Story = {
  render: () => (
    <div className="p-6 border rounded-lg w-80">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Order Summary</h3>
          <p className="text-sm text-muted-foreground">Order #12345</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>$99.00</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>$9.99</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>$8.91</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>$117.90</span>
        </div>
      </div>
    </div>
  ),
};

/**
 * 리스트 아이템 구분에 사용되는 구분선
 */
export const ListItems: Story = {
  render: () => (
    <div className="border rounded-lg w-80">
      <div className="p-4">
        <h3 className="font-semibold">Recent Activity</h3>
      </div>

      <div className="px-4 py-3 border-b">
        <div className="flex items-center justify-between">
          <span className="text-sm">Project created</span>
          <span className="text-xs text-muted-foreground">2 hours ago</span>
        </div>
      </div>

      <div className="px-4 py-3 border-b">
        <div className="flex items-center justify-between">
          <span className="text-sm">Task completed</span>
          <span className="text-xs text-muted-foreground">4 hours ago</span>
        </div>
      </div>

      <div className="px-4 py-3 border-b">
        <div className="flex items-center justify-between">
          <span className="text-sm">Comment added</span>
          <span className="text-xs text-muted-foreground">1 day ago</span>
        </div>
      </div>

      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="text-sm">File uploaded</span>
          <span className="text-xs text-muted-foreground">2 days ago</span>
        </div>
      </div>
    </div>
  ),
};

/**
 * 다양한 스타일의 구분선
 */
export const Styled: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div>
        <h3 className="mb-2 text-sm font-medium">Default</h3>
        <Separator />
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium">Thick</h3>
        <Separator className="h-1" />
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium">Dashed</h3>
        <Separator className="border-dashed" />
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium">Dotted</h3>
        <Separator className="border-dotted" />
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium">Colored</h3>
        <Separator className="border-blue-500" />
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
        <h3 className="mb-4 text-lg font-semibold">Horizontal Separators</h3>
        <div className="space-y-4 w-80">
          <div className="p-4 rounded bg-muted">Content 1</div>
          <Separator />
          <div className="p-4 rounded bg-muted">Content 2</div>
          <Separator />
          <div className="p-4 rounded bg-muted">Content 3</div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Vertical Separators</h3>
        <div className="flex items-center h-20">
          <div className="p-4 rounded bg-muted">Left</div>
          <Separator orientation="vertical" />
          <div className="p-4 rounded bg-muted">Center</div>
          <Separator orientation="vertical" />
          <div className="p-4 rounded bg-muted">Right</div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">With Text</h3>
        <div className="w-80">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 bg-background text-muted-foreground">Or continue with</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Different Styles</h3>
        <div className="space-y-4 w-80">
          <div>
            <p className="mb-2 text-sm">Default</p>
            <Separator />
          </div>
          <div>
            <p className="mb-2 text-sm">Thick</p>
            <Separator className="h-1" />
          </div>
          <div>
            <p className="mb-2 text-sm">Dashed</p>
            <Separator className="border-dashed" />
          </div>
        </div>
      </div>
    </div>
  ),
};
