import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Calendar } from './index';

/**
 * Calendar 컴포넌트의 Storybook 스토리
 * 캘린더의 다양한 사용 사례를 보여줍니다.
 */
const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: { type: 'select' },
      options: ['single', 'multiple', 'range'],
      description: '캘린더 선택 모드',
    },
    showOutsideDays: {
      control: { type: 'boolean' },
      description: '외부 날짜 표시 여부',
    },
    captionLayout: {
      control: { type: 'select' },
      options: ['label', 'dropdown'],
      description: '캡션 레이아웃',
    },
    className: {
      control: { type: 'text' },
      description: '추가 CSS 클래스',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

/**
 * 기본 캘린더 스토리
 */
export const Default: Story = {
  args: {},
  render: () => <Calendar />,
};

/**
 * 단일 날짜 선택
 */
export const Single: Story = {
  args: {},
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return <Calendar mode="single" selected={date} onSelect={setDate} className="border rounded-md" />;
  },
};

/**
 * 여러 날짜 선택
 */
export const Multiple: Story = {
  args: {},
  render: () => {
    const [dates, setDates] = React.useState<Date[] | undefined>([]);

    return <Calendar mode="multiple" selected={dates} onSelect={setDates} className="border rounded-md" />;
  },
};

/**
 * 날짜 범위 선택
 */
export const Range: Story = {
  args: {},
  render: () => {
    const [dateRange, setDateRange] = React.useState<{ from: Date | undefined; to?: Date | undefined } | undefined>({
      from: new Date(),
      to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days later
    });

    const handleSelect = (range: { from: Date | undefined; to?: Date | undefined } | undefined) => {
      setDateRange(range);
    };

    return <Calendar mode="range" selected={dateRange} onSelect={handleSelect} className="border rounded-md" />;
  },
};

/**
 * 드롭다운 캡션
 */
export const DropdownCaption: Story = {
  args: {},
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        captionLayout="dropdown"
        className="border rounded-md"
      />
    );
  },
};

/**
 * 외부 날짜 숨김
 */
export const HideOutsideDays: Story = {
  args: {},
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        showOutsideDays={false}
        className="border rounded-md"
      />
    );
  },
};

/**
 * 비활성화된 날짜
 */
export const DisabledDates: Story = {
  args: {},
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    const disabledDates = [
      new Date(2024, 0, 1), // New Year's Day
      new Date(2024, 0, 15), // Martin Luther King Jr. Day
      new Date(2024, 1, 19), // Presidents' Day
      new Date(2024, 4, 27), // Memorial Day
      new Date(2024, 6, 4), // Independence Day
      new Date(2024, 8, 2), // Labor Day
      new Date(2024, 10, 28), // Thanksgiving
      new Date(2024, 11, 25), // Christmas
    ];

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        disabled={disabledDates}
        className="border rounded-md"
      />
    );
  },
};

/**
 * 최소/최대 날짜 제한
 */
export const MinMaxDates: Story = {
  args: {},
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        fromDate={today}
        toDate={nextMonth}
        className="border rounded-md"
      />
    );
  },
};

/**
 * 주말 비활성화
 */
export const DisableWeekends: Story = {
  args: {},
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        disabled={(date) => date.getDay() === 0 || date.getDay() === 6}
        className="border rounded-md"
      />
    );
  },
};

/**
 * 과거 날짜 비활성화
 */
export const DisablePastDates: Story = {
  args: {},
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        disabled={(date) => date < new Date()}
        className="border rounded-md"
      />
    );
  },
};

/**
 * 예약된 날짜 표시
 */
export const BookedDates: Story = {
  args: {},
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    const bookedDates = [new Date(2024, 0, 5), new Date(2024, 0, 12), new Date(2024, 0, 19), new Date(2024, 0, 26)];

    return (
      <Calendar mode="single" selected={date} onSelect={setDate} disabled={bookedDates} className="border rounded-md" />
    );
  },
};

/**
 * 이벤트가 있는 캘린더
 */
export const WithEvents: Story = {
  args: {},
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    // const _eventDates = [new Date(2024, 0, 8), new Date(2024, 0, 15), new Date(2024, 0, 22), new Date(2024, 0, 29)];

    return (
      <div className="space-y-4">
        <Calendar mode="single" selected={date} onSelect={setDate} className="border rounded-md" />
        <div className="text-sm text-muted-foreground">
          <p>• Blue dots indicate events</p>
          <p>• Click on a date to select it</p>
        </div>
      </div>
    );
  },
};

/**
 * 모든 변형을 보여주는 종합 스토리
 */
export const AllVariations: Story = {
  args: {},
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Single Date Selection</h3>
        <Calendar mode="single" className="border rounded-md" />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Multiple Date Selection</h3>
        <Calendar mode="multiple" className="border rounded-md" />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Date Range Selection</h3>
        <Calendar mode="range" className="border rounded-md" />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">With Dropdown Caption</h3>
        <Calendar mode="single" captionLayout="dropdown" className="border rounded-md" />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Hide Outside Days</h3>
        <Calendar mode="single" showOutsideDays={false} className="border rounded-md" />
      </div>
    </div>
  ),
};
