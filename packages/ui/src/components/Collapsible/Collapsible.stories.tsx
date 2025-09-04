import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChevronDown, ChevronRight } from 'lucide-react';

import { Button } from '@/components/Button';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './index';

const meta: Meta<typeof Collapsible> = {
  title: 'Components/Collapsible',
  component: Collapsible,
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
    <Collapsible className="w-[350px] space-y-2">
      <div className="flex items-center justify-between px-4 space-x-4">
        <h4 className="text-sm font-semibold">@peduarte starred 3 repositories</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="p-0 w-9">
            <ChevronDown className="w-4 h-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="px-4 py-3 font-mono text-sm border rounded-md">@radix-ui/primitives</div>
      <CollapsibleContent className="space-y-2">
        <div className="px-4 py-3 font-mono text-sm border rounded-md">@radix-ui/colors</div>
        <div className="px-4 py-3 font-mono text-sm border rounded-md">@stitches/react</div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const WithCustomTrigger: Story = {
  render: () => (
    <Collapsible className="w-[350px] space-y-2">
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="justify-between w-full">
          <span>Show more details</span>
          <ChevronRight className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-90" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2">
        <div className="px-4 py-3 text-sm border rounded-md">
          <p className="font-medium">Repository Details</p>
          <p className="mt-1 text-muted-foreground">
            This is a detailed description of the repository. It contains important information about the project.
          </p>
        </div>
        <div className="px-4 py-3 text-sm border rounded-md">
          <p className="font-medium">Contributors</p>
          <p className="mt-1 text-muted-foreground">
            • John Doe
            <br />
            • Jane Smith
            <br />• Bob Johnson
          </p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const Nested: Story = {
  render: () => (
    <Collapsible className="w-[350px] space-y-2">
      <div className="flex items-center justify-between px-4 space-x-4">
        <h4 className="text-sm font-semibold">Project Structure</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="p-0 w-9">
            <ChevronDown className="w-4 h-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="px-4 py-3 font-mono text-sm border rounded-md">src/</div>
      <CollapsibleContent className="space-y-2">
        <div className="px-4 py-3 font-mono text-sm border rounded-md">components/</div>
        <Collapsible className="ml-4 space-y-2">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="p-0 w-9">
              <ChevronDown className="w-4 h-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
          <div className="px-4 py-3 font-mono text-sm border rounded-md">ui/</div>
          <CollapsibleContent className="space-y-2">
            <div className="px-4 py-3 font-mono text-sm border rounded-md">button.tsx</div>
            <div className="px-4 py-3 font-mono text-sm border rounded-md">input.tsx</div>
          </CollapsibleContent>
        </Collapsible>
        <div className="px-4 py-3 font-mono text-sm border rounded-md">pages/</div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const FAQ: Story = {
  render: () => (
    <div className="w-[350px] space-y-2">
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="justify-between w-full">
            <span>What is this project about?</span>
            <ChevronDown className="w-4 h-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="px-4 py-2 text-sm text-muted-foreground">
          This project is a modern web application built with React and TypeScript. It provides a comprehensive set of
          UI components and utilities for building beautiful user interfaces.
        </CollapsibleContent>
      </Collapsible>

      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="justify-between w-full">
            <span>How do I get started?</span>
            <ChevronDown className="w-4 h-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="px-4 py-2 text-sm text-muted-foreground">
          To get started, first install the dependencies using npm or yarn. Then, you can begin using the components in
          your application by importing them from the package.
        </CollapsibleContent>
      </Collapsible>

      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="justify-between w-full">
            <span>Is it free to use?</span>
            <ChevronDown className="w-4 h-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="px-4 py-2 text-sm text-muted-foreground">
          Yes, this project is completely free and open source. You can use it in both personal and commercial projects
          without any restrictions.
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),
};
