/* eslint-disable @next/next/no-img-element */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { AspectRatio } from './index';

const meta: Meta<typeof AspectRatio> = {
  title: 'Components/AspectRatio',
  component: AspectRatio,
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
    <div className="w-[450px]">
      <AspectRatio ratio={16 / 9}>
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Photo by Drew Beamer"
          className="object-cover w-full h-full rounded-md"
        />
      </AspectRatio>
    </div>
  ),
};

export const Square: Story = {
  render: () => (
    <div className="w-[300px]">
      <AspectRatio ratio={1}>
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Photo by Drew Beamer"
          className="object-cover w-full h-full rounded-md"
        />
      </AspectRatio>
    </div>
  ),
};

export const Portrait: Story = {
  render: () => (
    <div className="w-[200px]">
      <AspectRatio ratio={3 / 4}>
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Photo by Drew Beamer"
          className="object-cover w-full h-full rounded-md"
        />
      </AspectRatio>
    </div>
  ),
};

export const WithContent: Story = {
  render: () => (
    <div className="w-[450px]">
      <AspectRatio ratio={16 / 9}>
        <div className="flex items-center justify-center w-full h-full rounded-md bg-muted">
          <div className="text-center">
            <h3 className="text-lg font-semibold">16:9 Aspect Ratio</h3>
            <p className="text-sm text-muted-foreground">This content maintains the aspect ratio</p>
          </div>
        </div>
      </AspectRatio>
    </div>
  ),
};

export const Video: Story = {
  render: () => (
    <div className="w-[450px]">
      <AspectRatio ratio={16 / 9}>
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-md"
        />
      </AspectRatio>
    </div>
  ),
};

export const DifferentRatios: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <div className="w-[200px]">
        <AspectRatio ratio={1}>
          <div className="flex items-center justify-center w-full h-full rounded-md bg-muted">
            <span className="text-sm">1:1</span>
          </div>
        </AspectRatio>
      </div>
      <div className="w-[200px]">
        <AspectRatio ratio={16 / 9}>
          <div className="flex items-center justify-center w-full h-full rounded-md bg-muted">
            <span className="text-sm">16:9</span>
          </div>
        </AspectRatio>
      </div>
      <div className="w-[200px]">
        <AspectRatio ratio={4 / 3}>
          <div className="flex items-center justify-center w-full h-full rounded-md bg-muted">
            <span className="text-sm">4:3</span>
          </div>
        </AspectRatio>
      </div>
      <div className="w-[200px]">
        <AspectRatio ratio={3 / 2}>
          <div className="flex items-center justify-center w-full h-full rounded-md bg-muted">
            <span className="text-sm">3:2</span>
          </div>
        </AspectRatio>
      </div>
    </div>
  ),
};
