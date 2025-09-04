import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Checkbox } from './index';

/**
 * Checkbox 컴포넌트의 Storybook 스토리
 * 체크박스의 다양한 상태와 사용 사례를 보여줍니다.
 */
const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: { type: 'boolean' },
      description: '체크박스의 체크 상태',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '체크박스 비활성화 여부',
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
 * 기본 체크박스 스토리
 */
export const Default: Story = {
  args: {},
};

/**
 * 다양한 상태의 체크박스
 */
export const States: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="unchecked" />
        <label htmlFor="unchecked" className="text-sm font-medium">
          Unchecked
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="checked" checked />
        <label htmlFor="checked" className="text-sm font-medium">
          Checked
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled" disabled />
        <label htmlFor="disabled" className="text-sm font-medium text-muted-foreground">
          Disabled
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled-checked" checked disabled />
        <label htmlFor="disabled-checked" className="text-sm font-medium text-muted-foreground">
          Disabled Checked
        </label>
      </div>
    </div>
  ),
};

/**
 * 폼과 함께 사용되는 체크박스
 */
export const InForm: Story = {
  render: () => (
    <form className="space-y-4 w-80">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Preferences</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="email-notifications" />
            <label htmlFor="email-notifications" className="text-sm">
              Email notifications
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="sms-notifications" />
            <label htmlFor="sms-notifications" className="text-sm">
              SMS notifications
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="push-notifications" />
            <label htmlFor="push-notifications" className="text-sm">
              Push notifications
            </label>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Privacy</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="public-profile" />
            <label htmlFor="public-profile" className="text-sm">
              Make profile public
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="show-email" />
            <label htmlFor="show-email" className="text-sm">
              Show email address
            </label>
          </div>
        </div>
      </div>
    </form>
  ),
};

/**
 * 약관 동의 체크박스
 */
export const TermsAndConditions: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="flex items-start space-x-2">
        <Checkbox id="terms" className="mt-1" />
        <label htmlFor="terms" className="text-sm leading-relaxed">
          I agree to the{' '}
          <a href="#" className="underline text-primary hover:no-underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="underline text-primary hover:no-underline">
            Privacy Policy
          </a>
        </label>
      </div>
      <div className="flex items-start space-x-2">
        <Checkbox id="newsletter" className="mt-1" />
        <label htmlFor="newsletter" className="text-sm leading-relaxed">
          I would like to receive marketing emails and updates
        </label>
      </div>
    </div>
  ),
};

/**
 * 체크박스 리스트
 */
export const CheckboxList: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <h3 className="text-sm font-medium">Select your interests</h3>
      <div className="space-y-3">
        {['Technology', 'Design', 'Business', 'Marketing', 'Education', 'Health', 'Sports', 'Travel'].map(
          (interest) => (
            <div key={interest} className="flex items-center space-x-2">
              <Checkbox id={interest.toLowerCase()} />
              <label htmlFor={interest.toLowerCase()} className="text-sm">
                {interest}
              </label>
            </div>
          ),
        )}
      </div>
    </div>
  ),
};

/**
 * 중첩된 체크박스 (부모-자식 관계)
 */
export const NestedCheckboxes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="all-permissions" />
          <label htmlFor="all-permissions" className="text-sm font-medium">
            All Permissions
          </label>
        </div>
        <div className="ml-6 space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="read-permission" />
            <label htmlFor="read-permission" className="text-sm">
              Read
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="write-permission" />
            <label htmlFor="write-permission" className="text-sm">
              Write
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="execute-permission" />
            <label htmlFor="execute-permission" className="text-sm">
              Execute
            </label>
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * 테이블에서 사용되는 체크박스
 */
export const InTable: Story = {
  render: () => (
    <div className="w-80">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">
              <Checkbox id="select-all" />
            </th>
            <th className="p-2 text-sm font-medium text-left">Name</th>
            <th className="p-2 text-sm font-medium text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {[
            { name: 'John Doe', status: 'Active' },
            { name: 'Jane Smith', status: 'Inactive' },
            { name: 'Bob Johnson', status: 'Active' },
          ].map((user, index) => (
            <tr key={index} className="border-b">
              <td className="p-2">
                <Checkbox id={`user-${index}`} />
              </td>
              <td className="p-2 text-sm">{user.name}</td>
              <td className="p-2 text-sm">{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};

/**
 * 모든 상태를 보여주는 종합 스토리
 */
export const AllStates: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-medium">Basic States</h3>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Checkbox id="basic-unchecked" />
            <label htmlFor="basic-unchecked" className="text-sm">
              Unchecked
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="basic-checked" checked />
            <label htmlFor="basic-checked" className="text-sm">
              Checked
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="basic-disabled" disabled />
            <label htmlFor="basic-disabled" className="text-sm text-muted-foreground">
              Disabled
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="basic-disabled-checked" checked disabled />
            <label htmlFor="basic-disabled-checked" className="text-sm text-muted-foreground">
              Disabled Checked
            </label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">With Labels</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="label-1" />
            <label htmlFor="label-1" className="text-sm">
              Accept terms and conditions
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="label-2" />
            <label htmlFor="label-2" className="text-sm">
              Subscribe to newsletter
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="label-3" />
            <label htmlFor="label-3" className="text-sm">
              Enable notifications
            </label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">Form Example</h3>
        <form className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="form-1" />
            <label htmlFor="form-1" className="text-sm">
              Option 1
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="form-2" />
            <label htmlFor="form-2" className="text-sm">
              Option 2
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="form-3" />
            <label htmlFor="form-3" className="text-sm">
              Option 3
            </label>
          </div>
        </form>
      </div>
    </div>
  ),
};
