import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Textarea } from './index';

/**
 * Textarea 컴포넌트의 Storybook 스토리
 * 텍스트 영역의 다양한 상태와 사용 사례를 보여줍니다.
 */
const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: { type: 'text' },
      description: '플레이스홀더 텍스트',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '텍스트 영역 비활성화 여부',
    },
    rows: {
      control: { type: 'number', min: 1, max: 20 },
      description: '텍스트 영역의 행 수',
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
 * 기본 텍스트 영역 스토리
 */
export const Default: Story = {
  args: {
    placeholder: 'Type your message here...',
  },
};

/**
 * 다양한 크기의 텍스트 영역
 */
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <label className="block mb-2 text-sm font-medium">Small (3 rows)</label>
        <Textarea rows={3} placeholder="Small textarea..." />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium">Default (4 rows)</label>
        <Textarea placeholder="Default textarea..." />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium">Large (6 rows)</label>
        <Textarea rows={6} placeholder="Large textarea..." />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium">Extra Large (10 rows)</label>
        <Textarea rows={10} placeholder="Extra large textarea..." />
      </div>
    </div>
  ),
};

/**
 * 다양한 상태의 텍스트 영역
 */
export const States: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <label className="block mb-2 text-sm font-medium">Default</label>
        <Textarea placeholder="Default state" />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium">With Value</label>
        <Textarea defaultValue="This is a pre-filled textarea with some content." />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium">Disabled</label>
        <Textarea disabled placeholder="Disabled textarea" />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium">Read Only</label>
        <Textarea readOnly defaultValue="This is a read-only textarea." />
      </div>
    </div>
  ),
};

/**
 * 에러 상태의 텍스트 영역
 */
export const Error: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <label className="block mb-2 text-sm font-medium text-red-600">Message (Required)</label>
        <Textarea
          placeholder="Enter your message..."
          aria-invalid="true"
          className="border-red-500 focus-visible:ring-red-500"
        />
        <p className="mt-1 text-sm text-red-600">Please enter a message</p>
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-red-600">Description (Max 500 characters)</label>
        <Textarea
          placeholder="Enter description..."
          aria-invalid="true"
          className="border-red-500 focus-visible:ring-red-500"
        />
        <p className="mt-1 text-sm text-red-600">Description must be less than 500 characters</p>
      </div>
    </div>
  ),
};

/**
 * 폼에서 사용되는 텍스트 영역
 */
export const InForm: Story = {
  render: () => (
    <form className="space-y-4 w-80">
      <div>
        <label htmlFor="name" className="block mb-2 text-sm font-medium">
          Name
        </label>
        <input id="name" type="text" className="w-full p-2 border rounded-md" placeholder="Enter your name" />
      </div>
      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium">
          Email
        </label>
        <input id="email" type="email" className="w-full p-2 border rounded-md" placeholder="Enter your email" />
      </div>
      <div>
        <label htmlFor="message" className="block mb-2 text-sm font-medium">
          Message
        </label>
        <Textarea id="message" placeholder="Enter your message..." rows={4} />
      </div>
      <div>
        <label htmlFor="bio" className="block mb-2 text-sm font-medium">
          Bio
        </label>
        <Textarea id="bio" placeholder="Tell us about yourself..." rows={3} />
      </div>
    </form>
  ),
};

/**
 * 댓글 시스템에서 사용되는 텍스트 영역
 */
export const CommentSystem: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Comments</h3>
        <div className="space-y-3">
          <div className="p-3 border rounded-lg">
            <div className="flex items-center mb-2 space-x-2">
              <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium">John Doe</span>
              <span className="text-xs text-muted-foreground">2 hours ago</span>
            </div>
            <p className="text-sm">This is a great article! Thanks for sharing.</p>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="flex items-center mb-2 space-x-2">
              <div className="w-6 h-6 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium">Jane Smith</span>
              <span className="text-xs text-muted-foreground">1 hour ago</span>
            </div>
            <p className="text-sm">I learned a lot from this. Looking forward to more content!</p>
          </div>
        </div>
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium">Add a comment</label>
        <Textarea placeholder="Write your comment..." rows={3} />
        <div className="flex justify-end mt-2">
          <button className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md">Post Comment</button>
        </div>
      </div>
    </div>
  ),
};

/**
 * 코드 에디터로 사용되는 텍스트 영역
 */
export const CodeEditor: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <label className="block mb-2 text-sm font-medium">JavaScript Code</label>
        <Textarea
          placeholder="// Enter your JavaScript code here..."
          rows={8}
          className="font-mono text-sm"
          defaultValue={`function greet(name) {
  return \`Hello, \${name}!\`;
}

const message = greet('World');
console.log(message);`}
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium">CSS Code</label>
        <Textarea
          placeholder="/* Enter your CSS code here */"
          rows={6}
          className="font-mono text-sm"
          defaultValue={`.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
}`}
        />
      </div>
    </div>
  ),
};

/**
 * 피드백 폼에서 사용되는 텍스트 영역
 */
export const FeedbackForm: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Send Feedback</h3>
        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium">What type of feedback is this?</label>
            <select className="w-full p-2 border rounded-md">
              <option>Bug Report</option>
              <option>Feature Request</option>
              <option>General Feedback</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Describe your feedback</label>
            <Textarea placeholder="Please provide detailed information about your feedback..." rows={5} />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Additional context (optional)</label>
            <Textarea placeholder="Any additional information that might be helpful..." rows={3} />
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * 모든 변형을 보여주는 종합 스토리
 */
export const AllVariations: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-medium">Different Sizes</h3>
        <div className="space-y-3 w-80">
          <div>
            <p className="mb-1 text-sm">Small (3 rows)</p>
            <Textarea rows={3} placeholder="Small textarea..." />
          </div>
          <div>
            <p className="mb-1 text-sm">Default (4 rows)</p>
            <Textarea placeholder="Default textarea..." />
          </div>
          <div>
            <p className="mb-1 text-sm">Large (6 rows)</p>
            <Textarea rows={6} placeholder="Large textarea..." />
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">Different States</h3>
        <div className="space-y-3 w-80">
          <div>
            <p className="mb-1 text-sm">Default</p>
            <Textarea placeholder="Default state" />
          </div>
          <div>
            <p className="mb-1 text-sm">With Value</p>
            <Textarea defaultValue="This is a pre-filled textarea." />
          </div>
          <div>
            <p className="mb-1 text-sm">Disabled</p>
            <Textarea disabled placeholder="Disabled textarea" />
          </div>
          <div>
            <p className="mb-1 text-sm">Read Only</p>
            <Textarea readOnly defaultValue="This is a read-only textarea." />
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">With Labels and Help Text</h3>
        <div className="space-y-3 w-80">
          <div>
            <label className="block mb-1 text-sm font-medium">Message</label>
            <Textarea placeholder="Enter your message..." />
            <p className="mt-1 text-xs text-muted-foreground">This field is required</p>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Description</label>
            <Textarea placeholder="Enter description..." rows={3} />
            <p className="mt-1 text-xs text-muted-foreground">Maximum 500 characters</p>
          </div>
        </div>
      </div>
    </div>
  ),
};
