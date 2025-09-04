import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/Avatar';
import { Button } from '@/components/Button';

import { HoverCard, HoverCardContent, HoverCardTrigger } from './index';

const meta: Meta<typeof HoverCard> = {
  title: 'Components/HoverCard',
  component: HoverCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@nextjs</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@nextjs</h4>
            <p className="text-sm">The React Framework – created and maintained by @vercel.</p>
            <div className="flex items-center pt-2">
              <span className="text-xs text-muted-foreground">Joined December 2021</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const WithImage: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="outline">Hover for details</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">shadcn/ui</h4>
            <p className="text-sm">Beautifully designed components built with Radix UI and Tailwind CSS.</p>
            <div className="flex items-center pt-2">
              <span className="text-xs text-muted-foreground">Followed by you and 1,234 others</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const Simple: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">Hover me</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">Simple Hover Card</h4>
          <p className="text-sm text-muted-foreground">This is a simple hover card with minimal content.</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const WithLongContent: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">Long Content</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">Long Content Example</h4>
          <p className="text-sm text-muted-foreground">
            This hover card contains longer content to demonstrate how it handles text overflow and wrapping. The
            content should be properly contained within the card boundaries.
          </p>
          <div className="flex items-center pt-2">
            <span className="text-xs text-muted-foreground">Last updated 2 hours ago</span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const MultipleCards: Story = {
  render: () => (
    <div className="flex space-x-4">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link">React</Button>
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">React</h4>
            <p className="text-sm text-muted-foreground">A JavaScript library for building user interfaces.</p>
          </div>
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link">Vue</Button>
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Vue.js</h4>
            <p className="text-sm text-muted-foreground">The Progressive JavaScript Framework.</p>
          </div>
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link">Angular</Button>
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Angular</h4>
            <p className="text-sm text-muted-foreground">
              A platform for building mobile and desktop web applications.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
};
