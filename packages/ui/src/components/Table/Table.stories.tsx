import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from './index';

/**
 * Table 컴포넌트의 Storybook 스토리
 * 테이블의 다양한 사용 사례를 보여줍니다.
 */
const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
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
 * 기본 테이블 스토리
 */
export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV002</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell>PayPal</TableCell>
          <TableCell className="text-right">$150.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV003</TableCell>
          <TableCell>Unpaid</TableCell>
          <TableCell>Bank Transfer</TableCell>
          <TableCell className="text-right">$350.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV004</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$450.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV005</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>PayPal</TableCell>
          <TableCell className="text-right">$550.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV006</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell>Bank Transfer</TableCell>
          <TableCell className="text-right">$200.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV007</TableCell>
          <TableCell>Unpaid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$300.00</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

/**
 * 사용자 테이블
 */
export const Users: Story = {
  render: () => (
    <Table>
      <TableCaption>A list of users in your organization.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">John Doe</TableCell>
          <TableCell>john.doe@example.com</TableCell>
          <TableCell>Admin</TableCell>
          <TableCell>
            <span className="px-2 py-1 text-xs text-green-800 bg-green-100 rounded-full">Active</span>
          </TableCell>
          <TableCell className="text-right">
            <button className="text-sm text-blue-600 hover:text-blue-800">Edit</button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Jane Smith</TableCell>
          <TableCell>jane.smith@example.com</TableCell>
          <TableCell>User</TableCell>
          <TableCell>
            <span className="px-2 py-1 text-xs text-green-800 bg-green-100 rounded-full">Active</span>
          </TableCell>
          <TableCell className="text-right">
            <button className="text-sm text-blue-600 hover:text-blue-800">Edit</button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Bob Johnson</TableCell>
          <TableCell>bob.johnson@example.com</TableCell>
          <TableCell>User</TableCell>
          <TableCell>
            <span className="px-2 py-1 text-xs text-yellow-800 bg-yellow-100 rounded-full">Pending</span>
          </TableCell>
          <TableCell className="text-right">
            <button className="text-sm text-blue-600 hover:text-blue-800">Edit</button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Alice Brown</TableCell>
          <TableCell>alice.brown@example.com</TableCell>
          <TableCell>Moderator</TableCell>
          <TableCell>
            <span className="px-2 py-1 text-xs text-red-800 bg-red-100 rounded-full">Inactive</span>
          </TableCell>
          <TableCell className="text-right">
            <button className="text-sm text-blue-600 hover:text-blue-800">Edit</button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

/**
 * 제품 테이블
 */
export const Products: Story = {
  render: () => (
    <Table>
      <TableCaption>Product inventory and pricing information.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Rating</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">MacBook Pro</TableCell>
          <TableCell>Electronics</TableCell>
          <TableCell>15</TableCell>
          <TableCell>$1,999.00</TableCell>
          <TableCell>
            <div className="flex items-center">
              <span className="text-yellow-400">★★★★★</span>
              <span className="ml-1 text-sm text-muted-foreground">(4.8)</span>
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">iPhone 15</TableCell>
          <TableCell>Electronics</TableCell>
          <TableCell>32</TableCell>
          <TableCell>$799.00</TableCell>
          <TableCell>
            <div className="flex items-center">
              <span className="text-yellow-400">★★★★☆</span>
              <span className="ml-1 text-sm text-muted-foreground">(4.5)</span>
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">AirPods Pro</TableCell>
          <TableCell>Electronics</TableCell>
          <TableCell>8</TableCell>
          <TableCell>$249.00</TableCell>
          <TableCell>
            <div className="flex items-center">
              <span className="text-yellow-400">★★★★★</span>
              <span className="ml-1 text-sm text-muted-foreground">(4.9)</span>
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">iPad Air</TableCell>
          <TableCell>Electronics</TableCell>
          <TableCell>0</TableCell>
          <TableCell>$599.00</TableCell>
          <TableCell>
            <div className="flex items-center">
              <span className="text-yellow-400">★★★★☆</span>
              <span className="ml-1 text-sm text-muted-foreground">(4.3)</span>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total Products</TableCell>
          <TableCell>55</TableCell>
          <TableCell>$3,646.00</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

/**
 * 체크박스가 있는 테이블
 */
export const WithCheckboxes: Story = {
  render: () => (
    <Table>
      <TableCaption>Select items to perform bulk actions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">
            <input type="checkbox" />
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            <input type="checkbox" />
          </TableCell>
          <TableCell className="font-medium">John Doe</TableCell>
          <TableCell>john.doe@example.com</TableCell>
          <TableCell>Admin</TableCell>
          <TableCell>
            <span className="px-2 py-1 text-xs text-green-800 bg-green-100 rounded-full">Active</span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <input type="checkbox" />
          </TableCell>
          <TableCell className="font-medium">Jane Smith</TableCell>
          <TableCell>jane.smith@example.com</TableCell>
          <TableCell>User</TableCell>
          <TableCell>
            <span className="px-2 py-1 text-xs text-green-800 bg-green-100 rounded-full">Active</span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <input type="checkbox" />
          </TableCell>
          <TableCell className="font-medium">Bob Johnson</TableCell>
          <TableCell>bob.johnson@example.com</TableCell>
          <TableCell>User</TableCell>
          <TableCell>
            <span className="px-2 py-1 text-xs text-yellow-800 bg-yellow-100 rounded-full">Pending</span>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

/**
 * 정렬 가능한 테이블
 */
export const Sortable: Story = {
  render: () => (
    <Table>
      <TableCaption>Click column headers to sort.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="cursor-pointer hover:bg-muted/50">
            <div className="flex items-center space-x-1">
              <span>Name</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                />
              </svg>
            </div>
          </TableHead>
          <TableHead className="cursor-pointer hover:bg-muted/50">
            <div className="flex items-center space-x-1">
              <span>Date</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                />
              </svg>
            </div>
          </TableHead>
          <TableHead className="cursor-pointer hover:bg-muted/50">
            <div className="flex items-center space-x-1">
              <span>Amount</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                />
              </svg>
            </div>
          </TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">John Doe</TableCell>
          <TableCell>2024-01-15</TableCell>
          <TableCell>$1,250.00</TableCell>
          <TableCell>
            <span className="px-2 py-1 text-xs text-green-800 bg-green-100 rounded-full">Completed</span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Jane Smith</TableCell>
          <TableCell>2024-01-14</TableCell>
          <TableCell>$850.00</TableCell>
          <TableCell>
            <span className="px-2 py-1 text-xs text-yellow-800 bg-yellow-100 rounded-full">Pending</span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Bob Johnson</TableCell>
          <TableCell>2024-01-13</TableCell>
          <TableCell>$2,100.00</TableCell>
          <TableCell>
            <span className="px-2 py-1 text-xs text-green-800 bg-green-100 rounded-full">Completed</span>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

/**
 * 액션이 있는 테이블
 */
export const WithActions: Story = {
  render: () => (
    <Table>
      <TableCaption>Manage your team members.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">John Doe</TableCell>
          <TableCell>john.doe@example.com</TableCell>
          <TableCell>Admin</TableCell>
          <TableCell>
            <span className="px-2 py-1 text-xs text-green-800 bg-green-100 rounded-full">Active</span>
          </TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end space-x-2">
              <button className="text-sm text-blue-600 hover:text-blue-800">Edit</button>
              <button className="text-sm text-red-600 hover:text-red-800">Delete</button>
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Jane Smith</TableCell>
          <TableCell>jane.smith@example.com</TableCell>
          <TableCell>User</TableCell>
          <TableCell>
            <span className="px-2 py-1 text-xs text-green-800 bg-green-100 rounded-full">Active</span>
          </TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end space-x-2">
              <button className="text-sm text-blue-600 hover:text-blue-800">Edit</button>
              <button className="text-sm text-red-600 hover:text-red-800">Delete</button>
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Bob Johnson</TableCell>
          <TableCell>bob.johnson@example.com</TableCell>
          <TableCell>User</TableCell>
          <TableCell>
            <span className="px-2 py-1 text-xs text-yellow-800 bg-yellow-100 rounded-full">Pending</span>
          </TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end space-x-2">
              <button className="text-sm text-blue-600 hover:text-blue-800">Edit</button>
              <button className="text-sm text-red-600 hover:text-red-800">Delete</button>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

/**
 * 모든 변형을 보여주는 종합 스토리
 */
export const AllVariations: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Basic Table</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">John Doe</TableCell>
              <TableCell>john.doe@example.com</TableCell>
              <TableCell>Admin</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Jane Smith</TableCell>
              <TableCell>jane.smith@example.com</TableCell>
              <TableCell>User</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Table with Footer</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Product A</TableCell>
              <TableCell>2</TableCell>
              <TableCell>$10.00</TableCell>
              <TableCell className="text-right">$20.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Product B</TableCell>
              <TableCell>1</TableCell>
              <TableCell>$15.00</TableCell>
              <TableCell className="text-right">$15.00</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$35.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Table with Caption</h3>
        <Table>
          <TableCaption>This table shows sample data for demonstration purposes.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>Item 1</TableCell>
              <TableCell>$100</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2</TableCell>
              <TableCell>Item 2</TableCell>
              <TableCell>$200</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  ),
};
