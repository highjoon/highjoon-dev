import React from 'react';
import { Button } from '@highjoon-dev/ui/components/Button';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './index';

/**
 * Card 컴포넌트의 Storybook 스토리
 * 카드의 다양한 레이아웃과 사용 사례를 보여줍니다.
 */
const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
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
 * 기본 카드 스토리
 */
export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the card content area where you can put any content.</p>
      </CardContent>
    </Card>
  ),
};

/**
 * 액션이 포함된 카드
 */
export const WithAction: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Card with Action</CardTitle>
        <CardDescription>This card has an action button</CardDescription>
        <CardAction>
          <Button size="sm">Action</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>This card includes an action button in the header.</p>
      </CardContent>
    </Card>
  ),
};

/**
 * 푸터가 있는 카드
 */
export const WithFooter: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Card with Footer</CardTitle>
        <CardDescription>This card has a footer section</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the main content of the card.</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">
          Cancel
        </Button>
        <Button size="sm">Save</Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * 완전한 카드 (헤더, 콘텐츠, 푸터, 액션)
 */
export const Complete: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Complete Card</CardTitle>
        <CardDescription>This card has all components</CardDescription>
        <CardAction>
          <Button variant="ghost" size="sm">
            ⋯
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>This is a complete card example with header, content, footer, and action button.</p>
        <p className="mt-2 text-sm text-muted-foreground">You can add multiple paragraphs or any other content here.</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">
          Cancel
        </Button>
        <Button size="sm">Confirm</Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * 제품 카드 예시
 */
export const ProductCard: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>MacBook Pro</CardTitle>
        <CardDescription>Apple M2 Pro chip</CardDescription>
        <CardAction>
          <Button variant="ghost" size="sm">
            ♥
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-2xl font-bold">$1,999</p>
          <p className="text-sm text-muted-foreground">14-inch Liquid Retina XDR display with ProMotion</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="flex-1">
          Add to Cart
        </Button>
        <Button size="sm" className="flex-1">
          Buy Now
        </Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * 사용자 프로필 카드
 */
export const UserProfile: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>John Doe</CardTitle>
        <CardDescription>Software Engineer</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">
            Follow
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm">📍 San Francisco, CA</p>
          <p className="text-sm">🏢 Tech Company</p>
          <p className="text-sm text-muted-foreground">
            Passionate about building great user experiences with React and TypeScript.
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex gap-2 text-sm text-muted-foreground">
          <span>1.2k followers</span>
          <span>•</span>
          <span>342 following</span>
        </div>
      </CardFooter>
    </Card>
  ),
};

/**
 * 통계 카드
 */
export const StatsCard: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Monthly Revenue</CardTitle>
        <CardDescription>Last 30 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-3xl font-bold">$45,231</p>
          <p className="text-sm text-green-600">+20.1% from last month</p>
        </div>
      </CardContent>
    </Card>
  ),
};

/**
 * 알림 카드
 */
export const NotificationCard: Story = {
  render: () => (
    <Card className="border-l-4 w-80 border-l-blue-500">
      <CardHeader>
        <CardTitle>New Message</CardTitle>
        <CardDescription>2 minutes ago</CardDescription>
        <CardAction>
          <Button variant="ghost" size="sm">
            ✕
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>You have received a new message from Sarah Johnson.</p>
      </CardContent>
    </Card>
  ),
};

/**
 * 모든 카드 변형을 보여주는 종합 스토리
 */
export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Basic Card</CardTitle>
          <CardDescription>A simple card with title and description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is a basic card example.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Card with Action</CardTitle>
          <CardDescription>Includes an action button</CardDescription>
          <CardAction>
            <Button size="sm">Action</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p>This card has an action button in the header.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Card with Footer</CardTitle>
          <CardDescription>Includes footer section</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card has a footer with buttons.</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm">
            Cancel
          </Button>
          <Button size="sm">Save</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Complete Card</CardTitle>
          <CardDescription>All components included</CardDescription>
          <CardAction>
            <Button variant="ghost" size="sm">
              ⋯
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p>This is a complete card with all components.</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm">
            Cancel
          </Button>
          <Button size="sm">Confirm</Button>
        </CardFooter>
      </Card>

      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle>Success Card</CardTitle>
          <CardDescription>With colored border</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card has a green left border to indicate success.</p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-red-500">
        <CardHeader>
          <CardTitle>Error Card</CardTitle>
          <CardDescription>With colored border</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card has a red left border to indicate an error.</p>
        </CardContent>
      </Card>
    </div>
  ),
};
