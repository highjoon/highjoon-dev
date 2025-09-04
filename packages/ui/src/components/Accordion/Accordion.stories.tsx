import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './index';

/**
 * Accordion 컴포넌트의 Storybook 스토리
 * 아코디언의 다양한 사용 사례를 보여줍니다.
 */
const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['single', 'multiple'],
      description: '아코디언 타입 (단일 또는 다중 선택)',
    },
    collapsible: {
      control: { type: 'boolean' },
      description: '모든 항목을 닫을 수 있는지 여부 (single 타입에서만)',
    },
    className: {
      control: { type: 'text' },
      description: '추가 CSS 클래스',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

/**
 * 기본 아코디언 스토리
 */
export const Default: Story = {
  args: {},
  render: () => (
    <Accordion type="single" collapsible className="w-96">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>Yes. It&apos;s animated by default, but you can disable it if you prefer.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

/**
 * 다중 선택 아코디언
 */
export const Multiple: Story = {
  args: {},
  render: () => (
    <Accordion type="multiple" className="w-96">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is React?</AccordionTrigger>
        <AccordionContent>
          React is a JavaScript library for building user interfaces, especially for web applications.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>What is TypeScript?</AccordionTrigger>
        <AccordionContent>
          TypeScript is a programming language developed by Microsoft. It is a strict syntactical superset of
          JavaScript.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>What is Storybook?</AccordionTrigger>
        <AccordionContent>
          Storybook is a tool for building UI components and pages in isolation. It makes development faster and easier.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

/**
 * FAQ 스타일 아코디언
 */
export const FAQ: Story = {
  args: {},
  render: () => (
    <Accordion type="single" collapsible className="w-96">
      <AccordionItem value="item-1">
        <AccordionTrigger>How do I get started?</AccordionTrigger>
        <AccordionContent>
          To get started, you can follow our getting started guide which includes installation instructions and basic
          usage examples.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>What are the system requirements?</AccordionTrigger>
        <AccordionContent>
          Our system requires Node.js 18 or higher, and supports all modern browsers including Chrome, Firefox, Safari,
          and Edge.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>How can I get support?</AccordionTrigger>
        <AccordionContent>
          You can get support through our community Discord, GitHub issues, or by contacting our support team directly.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>Is there a free trial?</AccordionTrigger>
        <AccordionContent>
          Yes, we offer a 14-day free trial with full access to all features. No credit card required.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

/**
 * 긴 콘텐츠가 있는 아코디언
 */
export const LongContent: Story = {
  args: {},
  render: () => (
    <Accordion type="single" collapsible className="w-96">
      <AccordionItem value="item-1">
        <AccordionTrigger>Detailed Documentation</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <p>
              This is a detailed explanation of how our system works. It includes comprehensive information about all
              the features and capabilities.
            </p>
            <p>
              Our platform is designed to be scalable, reliable, and easy to use. We&apos;ve spent years refining the
              user experience to make it as intuitive as possible.
            </p>
            <ul className="space-y-2 list-disc list-inside">
              <li>Feature 1: Advanced analytics and reporting</li>
              <li>Feature 2: Real-time collaboration tools</li>
              <li>Feature 3: Custom integrations and APIs</li>
              <li>Feature 4: Enterprise-grade security</li>
            </ul>
            <p>For more information, please refer to our complete documentation or contact our support team.</p>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Code Examples</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <p>Here are some code examples to help you get started:</p>
            <pre className="p-4 overflow-x-auto text-sm rounded-md bg-muted">
              <code>{`// Basic usage
import { Accordion } from '@/components/Accordion';

function MyComponent() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Title</AccordionTrigger>
        <AccordionContent>Content</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`}</code>
            </pre>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

/**
 * 모든 타입을 보여주는 종합 스토리
 */
export const AllTypes: Story = {
  args: {},
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Single (Collapsible)</h3>
        <Accordion type="single" collapsible className="w-96">
          <AccordionItem value="item-1">
            <AccordionTrigger>Single Item 1</AccordionTrigger>
            <AccordionContent>Content for single item 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Single Item 2</AccordionTrigger>
            <AccordionContent>Content for single item 2</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Multiple</h3>
        <Accordion type="multiple" className="w-96">
          <AccordionItem value="item-1">
            <AccordionTrigger>Multiple Item 1</AccordionTrigger>
            <AccordionContent>Content for multiple item 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Multiple Item 2</AccordionTrigger>
            <AccordionContent>Content for multiple item 2</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Multiple Item 3</AccordionTrigger>
            <AccordionContent>Content for multiple item 3</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  ),
};
