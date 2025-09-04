import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Progress } from './index';

/**
 * Progress 컴포넌트의 Storybook 스토리
 * 진행률 표시기의 다양한 상태와 사용 사례를 보여줍니다.
 */
const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: '진행률 값 (0-100)',
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
 * 기본 진행률 표시기 스토리
 */
export const Default: Story = {
  args: {
    value: 33,
  },
};

/**
 * 다양한 진행률 값
 */
export const Values: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <div className="flex justify-between mb-2 text-sm">
          <span>0%</span>
          <span>0%</span>
        </div>
        <Progress value={0} />
      </div>
      <div>
        <div className="flex justify-between mb-2 text-sm">
          <span>25%</span>
          <span>25%</span>
        </div>
        <Progress value={25} />
      </div>
      <div>
        <div className="flex justify-between mb-2 text-sm">
          <span>50%</span>
          <span>50%</span>
        </div>
        <Progress value={50} />
      </div>
      <div>
        <div className="flex justify-between mb-2 text-sm">
          <span>75%</span>
          <span>75%</span>
        </div>
        <Progress value={75} />
      </div>
      <div>
        <div className="flex justify-between mb-2 text-sm">
          <span>100%</span>
          <span>100%</span>
        </div>
        <Progress value={100} />
      </div>
    </div>
  ),
};

/**
 * 파일 업로드 진행률
 */
export const FileUpload: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <div className="flex justify-between mb-2 text-sm">
          <span>document.pdf</span>
          <span>45%</span>
        </div>
        <Progress value={45} />
        <p className="mt-1 text-xs text-muted-foreground">Uploading...</p>
      </div>
      <div>
        <div className="flex justify-between mb-2 text-sm">
          <span>image.jpg</span>
          <span>100%</span>
        </div>
        <Progress value={100} />
        <p className="mt-1 text-xs text-green-600">Upload complete</p>
      </div>
    </div>
  ),
};

/**
 * 작업 진행률
 */
export const TaskProgress: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <div className="flex justify-between mb-2 text-sm">
          <span>Processing data...</span>
          <span>67%</span>
        </div>
        <Progress value={67} />
        <p className="mt-1 text-xs text-muted-foreground">Step 3 of 5</p>
      </div>
      <div>
        <div className="flex justify-between mb-2 text-sm">
          <span>Generating report...</span>
          <span>23%</span>
        </div>
        <Progress value={23} />
        <p className="mt-1 text-xs text-muted-foreground">Step 1 of 4</p>
      </div>
    </div>
  ),
};

/**
 * 다양한 크기의 진행률 표시기
 */
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <p className="mb-2 text-sm">Small</p>
        <Progress value={50} className="h-1" />
      </div>
      <div>
        <p className="mb-2 text-sm">Default</p>
        <Progress value={50} />
      </div>
      <div>
        <p className="mb-2 text-sm">Large</p>
        <Progress value={50} className="h-4" />
      </div>
      <div>
        <p className="mb-2 text-sm">Extra Large</p>
        <Progress value={50} className="h-6" />
      </div>
    </div>
  ),
};

/**
 * 다양한 색상의 진행률 표시기
 */
export const Colors: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <p className="mb-2 text-sm">Default</p>
        <Progress value={60} />
      </div>
      <div>
        <p className="mb-2 text-sm">Success</p>
        <Progress value={80} className="[&>div]:bg-green-500" />
      </div>
      <div>
        <p className="mb-2 text-sm">Warning</p>
        <Progress value={40} className="[&>div]:bg-yellow-500" />
      </div>
      <div>
        <p className="mb-2 text-sm">Error</p>
        <Progress value={20} className="[&>div]:bg-red-500" />
      </div>
      <div>
        <p className="mb-2 text-sm">Info</p>
        <Progress value={70} className="[&>div]:bg-blue-500" />
      </div>
    </div>
  ),
};

/**
 * 애니메이션이 있는 진행률 표시기
 */
export const Animated: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <div className="flex justify-between mb-2 text-sm">
          <span>Loading...</span>
          <span>Indeterminate</span>
        </div>
        <Progress value={undefined} className="[&>div]:animate-pulse" />
      </div>
      <div>
        <div className="flex justify-between mb-2 text-sm">
          <span>Processing...</span>
          <span>75%</span>
        </div>
        <Progress value={75} className="[&>div]:transition-all [&>div]:duration-500" />
      </div>
    </div>
  ),
};

/**
 * 다중 진행률 표시기
 */
export const Multiple: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div>
        <h3 className="mb-3 text-sm font-medium">Project Progress</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>Frontend Development</span>
              <span>85%</span>
            </div>
            <Progress value={85} />
          </div>
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>Backend Development</span>
              <span>60%</span>
            </div>
            <Progress value={60} />
          </div>
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>Testing</span>
              <span>30%</span>
            </div>
            <Progress value={30} />
          </div>
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>Documentation</span>
              <span>10%</span>
            </div>
            <Progress value={10} />
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * 스킬 레벨 표시
 */
export const SkillLevel: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <div className="flex justify-between mb-2 text-sm">
          <span>React</span>
          <span>Expert</span>
        </div>
        <Progress value={90} />
      </div>
      <div>
        <div className="flex justify-between mb-2 text-sm">
          <span>TypeScript</span>
          <span>Advanced</span>
        </div>
        <Progress value={75} />
      </div>
      <div>
        <div className="flex justify-between mb-2 text-sm">
          <span>Node.js</span>
          <span>Intermediate</span>
        </div>
        <Progress value={60} />
      </div>
      <div>
        <div className="flex justify-between mb-2 text-sm">
          <span>Python</span>
          <span>Beginner</span>
        </div>
        <Progress value={30} />
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
        <h3 className="mb-4 text-lg font-semibold">Different Values</h3>
        <div className="space-y-3 w-80">
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>0%</span>
              <span>0%</span>
            </div>
            <Progress value={0} />
          </div>
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>25%</span>
              <span>25%</span>
            </div>
            <Progress value={25} />
          </div>
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>50%</span>
              <span>50%</span>
            </div>
            <Progress value={50} />
          </div>
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>75%</span>
              <span>75%</span>
            </div>
            <Progress value={75} />
          </div>
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>100%</span>
              <span>100%</span>
            </div>
            <Progress value={100} />
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Different Sizes</h3>
        <div className="space-y-3 w-80">
          <div>
            <p className="mb-1 text-sm">Small (h-1)</p>
            <Progress value={60} className="h-1" />
          </div>
          <div>
            <p className="mb-1 text-sm">Default (h-2)</p>
            <Progress value={60} />
          </div>
          <div>
            <p className="mb-1 text-sm">Large (h-4)</p>
            <Progress value={60} className="h-4" />
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Different Colors</h3>
        <div className="space-y-3 w-80">
          <div>
            <p className="mb-1 text-sm">Default</p>
            <Progress value={70} />
          </div>
          <div>
            <p className="mb-1 text-sm">Success</p>
            <Progress value={70} className="[&>div]:bg-green-500" />
          </div>
          <div>
            <p className="mb-1 text-sm">Warning</p>
            <Progress value={70} className="[&>div]:bg-yellow-500" />
          </div>
          <div>
            <p className="mb-1 text-sm">Error</p>
            <Progress value={70} className="[&>div]:bg-red-500" />
          </div>
        </div>
      </div>
    </div>
  ),
};
