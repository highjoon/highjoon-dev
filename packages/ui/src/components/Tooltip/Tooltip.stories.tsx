import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Tooltip, TooltipContent, TooltipTrigger } from './index';

/**
 * Tooltip 컴포넌트의 Storybook 스토리
 * 툴팁의 다양한 위치와 사용 사례를 보여줍니다.
 */
const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    delayDuration: {
      control: { type: 'number', min: 0, max: 1000, step: 100 },
      description: '툴팁 표시 지연 시간 (ms)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 툴팁 스토리
 */
export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <button className="px-4 py-2 text-white bg-blue-500 rounded-md">Hover me</button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This is a tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
};

/**
 * 다양한 위치의 툴팁
 */
export const Positions: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-8 p-8">
      <div className="flex justify-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="px-4 py-2 text-white bg-blue-500 rounded-md">Top</button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>Tooltip on top</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="flex justify-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="px-4 py-2 text-white bg-blue-500 rounded-md">Bottom</button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Tooltip on bottom</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="flex justify-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="px-4 py-2 text-white bg-blue-500 rounded-md">Left</button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Tooltip on left</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="flex justify-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="px-4 py-2 text-white bg-blue-500 rounded-md">Right</button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Tooltip on right</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  ),
};

/**
 * 아이콘 버튼에 사용되는 툴팁
 */
export const IconButtons: Story = {
  render: () => (
    <div className="flex space-x-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="p-2 border rounded-md hover:bg-gray-100">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add new item</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <button className="p-2 border rounded-md hover:bg-gray-100">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Edit item</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <button className="p-2 border rounded-md hover:bg-gray-100">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete item</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <button className="p-2 border rounded-md hover:bg-gray-100">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Show information</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};

/**
 * 긴 텍스트가 있는 툴팁
 */
export const LongText: Story = {
  render: () => (
    <div className="flex space-x-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="px-4 py-2 text-white bg-blue-500 rounded-md">Short tooltip</button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Short tooltip text</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <button className="px-4 py-2 text-white bg-blue-500 rounded-md">Long tooltip</button>
        </TooltipTrigger>
        <TooltipContent>
          <p>This is a much longer tooltip that contains more detailed information about the action or element.</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};

/**
 * 다양한 색상의 툴팁
 */
export const Colors: Story = {
  render: () => (
    <div className="flex space-x-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="px-4 py-2 text-white bg-blue-500 rounded-md">Default</button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Default tooltip</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <button className="px-4 py-2 text-white bg-green-500 rounded-md">Success</button>
        </TooltipTrigger>
        <TooltipContent className="bg-green-600">
          <p>Success tooltip</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <button className="px-4 py-2 text-white bg-yellow-500 rounded-md">Warning</button>
        </TooltipTrigger>
        <TooltipContent className="bg-yellow-600">
          <p>Warning tooltip</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <button className="px-4 py-2 text-white bg-red-500 rounded-md">Error</button>
        </TooltipTrigger>
        <TooltipContent className="bg-red-600">
          <p>Error tooltip</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};

/**
 * 폼 요소에 사용되는 툴팁
 */
export const FormElements: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <label className="block mb-2 text-sm font-medium">
          Password
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="p-1 ml-1 text-gray-400 hover:text-gray-600">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Password must be at least 8 characters long</p>
            </TooltipContent>
          </Tooltip>
        </label>
        <input type="password" className="w-full p-2 border rounded-md" placeholder="Enter your password" />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium">
          Email
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="p-1 ml-1 text-gray-400 hover:text-gray-600">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>We&apos;ll never share your email with anyone else</p>
            </TooltipContent>
          </Tooltip>
        </label>
        <input type="email" className="w-full p-2 border rounded-md" placeholder="Enter your email" />
      </div>
    </div>
  ),
};

/**
 * 테이블에서 사용되는 툴팁
 */
export const InTable: Story = {
  render: () => (
    <div className="w-80">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {[
            { name: 'John Doe', status: 'Active' },
            { name: 'Jane Smith', status: 'Inactive' },
            { name: 'Bob Johnson', status: 'Pending' },
          ].map((user, index) => (
            <tr key={index} className="border-b">
              <td className="p-2 text-sm">{user.name}</td>
              <td className="p-2 text-sm">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    user.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : user.status === 'Inactive'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                  }`}>
                  {user.status}
                </span>
              </td>
              <td className="p-2">
                <div className="flex space-x-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="p-1 text-blue-600 hover:text-blue-800">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View details</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="p-1 text-green-600 hover:text-green-800">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Edit user</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="p-1 text-red-600 hover:text-red-800">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete user</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
        <h3 className="mb-4 text-lg font-semibold">Different Positions</h3>
        <div className="grid grid-cols-2 gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="px-4 py-2 text-white bg-blue-500 rounded-md">Top</button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Tooltip on top</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button className="px-4 py-2 text-white bg-blue-500 rounded-md">Bottom</button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Tooltip on bottom</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button className="px-4 py-2 text-white bg-blue-500 rounded-md">Left</button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Tooltip on left</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button className="px-4 py-2 text-white bg-blue-500 rounded-md">Right</button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Tooltip on right</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Different Colors</h3>
        <div className="flex space-x-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="px-4 py-2 text-white bg-blue-500 rounded-md">Default</button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Default tooltip</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button className="px-4 py-2 text-white bg-green-500 rounded-md">Success</button>
            </TooltipTrigger>
            <TooltipContent className="bg-green-600">
              <p>Success tooltip</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button className="px-4 py-2 text-white bg-red-500 rounded-md">Error</button>
            </TooltipTrigger>
            <TooltipContent className="bg-red-600">
              <p>Error tooltip</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Icon Buttons</h3>
        <div className="flex space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="p-2 border rounded-md hover:bg-gray-100">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button className="p-2 border rounded-md hover:bg-gray-100">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button className="p-2 border rounded-md hover:bg-gray-100">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  ),
};
