import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Area,
  AreaChart as RechartsAreaChart,
  Bar,
  BarChart as RechartsBarChart,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart as RechartsPieChart,
  XAxis,
  YAxis,
} from 'recharts';

import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from './index';

const meta: Meta<typeof ChartContainer> = {
  title: 'Components/Chart',
  component: ChartContainer,
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
type Story = StoryObj<typeof ChartContainer>;

const chartConfig = {
  count: {
    label: 'Count',
    color: 'hsl(var(--chart-1))',
  },
  fill: {
    label: 'Fill',
    color: 'hsl(var(--chart-2))',
  },
  indicator: {
    label: 'Indicator',
    color: 'hsl(var(--chart-3))',
  },
};

const data = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
];

const pieData = [
  { fill: '#8884d8', value: 400, name: 'Group A' },
  { fill: '#82ca9d', value: 300, name: 'Group B' },
  { fill: '#ffc658', value: 300, name: 'Group C' },
  { fill: '#ff7300', value: 200, name: 'Group D' },
];

export const LineChartStory: Story = {
  args: {},
  render: () => (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <RechartsLineChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line type="monotone" dataKey="desktop" stroke="var(--color-desktop)" strokeWidth={2} />
        <Line type="monotone" dataKey="mobile" stroke="var(--color-mobile)" strokeWidth={2} />
      </RechartsLineChart>
    </ChartContainer>
  ),
};

export const AreaChartStory: Story = {
  args: {},
  render: () => (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <RechartsAreaChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area type="monotone" dataKey="desktop" stackId="1" stroke="var(--color-desktop)" fill="var(--color-desktop)" />
        <Area type="monotone" dataKey="mobile" stackId="1" stroke="var(--color-mobile)" fill="var(--color-mobile)" />
      </RechartsAreaChart>
    </ChartContainer>
  ),
};

export const BarChartStory: Story = {
  args: {},
  render: () => (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <RechartsBarChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" />
        <Bar dataKey="mobile" fill="var(--color-mobile)" />
      </RechartsBarChart>
    </ChartContainer>
  ),
};

export const PieChartStory: Story = {
  args: {},
  render: () => (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <RechartsPieChart>
        <ChartTooltip content={<ChartTooltipContent />} />
        <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} />
        <ChartLegend content={<ChartLegendContent />} />
      </RechartsPieChart>
    </ChartContainer>
  ),
};

export const WithLegend: Story = {
  args: {},
  render: () => (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <RechartsLineChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Line type="monotone" dataKey="desktop" stroke="var(--color-desktop)" strokeWidth={2} />
        <Line type="monotone" dataKey="mobile" stroke="var(--color-mobile)" strokeWidth={2} />
      </RechartsLineChart>
    </ChartContainer>
  ),
};

export const CustomTooltip: Story = {
  args: {},
  render: () => (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <RechartsLineChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <ChartTooltip
          content={
            <ChartTooltipContent
              indicator="line"
              labelFormatter={(value) => `Month: ${value}`}
              formatter={(value, name) => [`${value} users`, name]}
            />
          }
        />
        <Line type="monotone" dataKey="desktop" stroke="var(--color-desktop)" strokeWidth={2} />
        <Line type="monotone" dataKey="mobile" stroke="var(--color-mobile)" strokeWidth={2} />
      </RechartsLineChart>
    </ChartContainer>
  ),
};
