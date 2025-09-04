import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './index';

/**
 * Select 컴포넌트의 Storybook 스토리
 * 셀렉트의 다양한 사용 사례를 보여줍니다.
 */
const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: { type: 'text' },
      description: '기본 선택된 값',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '셀렉트 비활성화 여부',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 셀렉트 스토리
 */
export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="blueberry">Blueberry</SelectItem>
        <SelectItem value="grapes">Grapes</SelectItem>
        <SelectItem value="pineapple">Pineapple</SelectItem>
      </SelectContent>
    </Select>
  ),
};

/**
 * 다양한 크기의 셀렉트
 */
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <label className="block mb-2 text-sm font-medium">Small</label>
        <Select>
          <SelectTrigger size="sm" className="w-[180px]">
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
            <SelectItem value="option3">Option 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium">Default</label>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
            <SelectItem value="option3">Option 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
};

/**
 * 그룹이 있는 셀렉트
 */
export const WithGroups: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a timezone" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>North America</SelectLabel>
          <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
          <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
          <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
          <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
          <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
          <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Europe & Africa</SelectLabel>
          <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
          <SelectItem value="cet">Central European Time (CET)</SelectItem>
          <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
          <SelectItem value="west">Western European Summer Time (WEST)</SelectItem>
          <SelectItem value="cat">Central Africa Time (CAT)</SelectItem>
          <SelectItem value="eat">Eastern Africa Time (EAT)</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Asia</SelectLabel>
          <SelectItem value="msk">Moscow Time (MSK)</SelectItem>
          <SelectItem value="ist">India Standard Time (IST)</SelectItem>
          <SelectItem value="cst_china">China Standard Time (CST)</SelectItem>
          <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
          <SelectItem value="kst">Korea Standard Time (KST)</SelectItem>
          <SelectItem value="ist_indonesia">Indonesia Standard Time (IST)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

/**
 * 아이콘이 있는 셀렉트
 */
export const WithIcons: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a country" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="us">
          <div className="flex items-center gap-2">
            <span className="text-lg">🇺🇸</span>
            <span>United States</span>
          </div>
        </SelectItem>
        <SelectItem value="uk">
          <div className="flex items-center gap-2">
            <span className="text-lg">🇬🇧</span>
            <span>United Kingdom</span>
          </div>
        </SelectItem>
        <SelectItem value="ca">
          <div className="flex items-center gap-2">
            <span className="text-lg">🇨🇦</span>
            <span>Canada</span>
          </div>
        </SelectItem>
        <SelectItem value="fr">
          <div className="flex items-center gap-2">
            <span className="text-lg">🇫🇷</span>
            <span>France</span>
          </div>
        </SelectItem>
        <SelectItem value="de">
          <div className="flex items-center gap-2">
            <span className="text-lg">🇩🇪</span>
            <span>Germany</span>
          </div>
        </SelectItem>
        <SelectItem value="jp">
          <div className="flex items-center gap-2">
            <span className="text-lg">🇯🇵</span>
            <span>Japan</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  ),
};

/**
 * 폼에서 사용되는 셀렉트
 */
export const InForm: Story = {
  render: () => (
    <form className="space-y-4 w-80">
      <div>
        <label className="block mb-2 text-sm font-medium">Country</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select your country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="uk">United Kingdom</SelectItem>
            <SelectItem value="ca">Canada</SelectItem>
            <SelectItem value="au">Australia</SelectItem>
            <SelectItem value="de">Germany</SelectItem>
            <SelectItem value="fr">France</SelectItem>
            <SelectItem value="jp">Japan</SelectItem>
            <SelectItem value="kr">South Korea</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium">Language</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select your language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="es">Spanish</SelectItem>
            <SelectItem value="fr">French</SelectItem>
            <SelectItem value="de">German</SelectItem>
            <SelectItem value="it">Italian</SelectItem>
            <SelectItem value="pt">Portuguese</SelectItem>
            <SelectItem value="ru">Russian</SelectItem>
            <SelectItem value="ja">Japanese</SelectItem>
            <SelectItem value="ko">Korean</SelectItem>
            <SelectItem value="zh">Chinese</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium">Age Range</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select your age range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="18-24">18-24</SelectItem>
            <SelectItem value="25-34">25-34</SelectItem>
            <SelectItem value="35-44">35-44</SelectItem>
            <SelectItem value="45-54">45-54</SelectItem>
            <SelectItem value="55-64">55-64</SelectItem>
            <SelectItem value="65+">65+</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </form>
  ),
};

/**
 * 비활성화된 셀렉트
 */
export const Disabled: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <label className="block mb-2 text-sm font-medium">Disabled Select</label>
        <Select disabled>
          <SelectTrigger>
            <SelectValue placeholder="This is disabled" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
            <SelectItem value="option3">Option 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium">Disabled with Value</label>
        <Select disabled defaultValue="option2">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
            <SelectItem value="option3">Option 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
};

/**
 * 긴 옵션 목록이 있는 셀렉트
 */
export const LongList: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a city" />
      </SelectTrigger>
      <SelectContent>
        <SelectScrollUpButton />
        <SelectGroup>
          <SelectLabel>Major Cities</SelectLabel>
          <SelectItem value="new-york">New York</SelectItem>
          <SelectItem value="los-angeles">Los Angeles</SelectItem>
          <SelectItem value="chicago">Chicago</SelectItem>
          <SelectItem value="houston">Houston</SelectItem>
          <SelectItem value="phoenix">Phoenix</SelectItem>
          <SelectItem value="philadelphia">Philadelphia</SelectItem>
          <SelectItem value="san-antonio">San Antonio</SelectItem>
          <SelectItem value="san-diego">San Diego</SelectItem>
          <SelectItem value="dallas">Dallas</SelectItem>
          <SelectItem value="san-jose">San Jose</SelectItem>
          <SelectItem value="austin">Austin</SelectItem>
          <SelectItem value="jacksonville">Jacksonville</SelectItem>
          <SelectItem value="fort-worth">Fort Worth</SelectItem>
          <SelectItem value="columbus">Columbus</SelectItem>
          <SelectItem value="charlotte">Charlotte</SelectItem>
          <SelectItem value="san-francisco">San Francisco</SelectItem>
          <SelectItem value="indianapolis">Indianapolis</SelectItem>
          <SelectItem value="seattle">Seattle</SelectItem>
          <SelectItem value="denver">Denver</SelectItem>
          <SelectItem value="washington">Washington</SelectItem>
        </SelectGroup>
        <SelectScrollDownButton />
      </SelectContent>
    </Select>
  ),
};

/**
 * 모든 변형을 보여주는 종합 스토리
 */
export const AllVariations: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-medium">Basic Select</h3>
        <Select>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
            <SelectItem value="option3">Option 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">With Groups</h3>
        <Select>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="orange">Orange</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Vegetables</SelectLabel>
              <SelectItem value="carrot">Carrot</SelectItem>
              <SelectItem value="broccoli">Broccoli</SelectItem>
              <SelectItem value="spinach">Spinach</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">With Icons</h3>
        <Select>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Select a platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="web">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Web</span>
              </div>
            </SelectItem>
            <SelectItem value="mobile">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Mobile</span>
              </div>
            </SelectItem>
            <SelectItem value="desktop">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 011 1v8a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm1 0v8h12V4H4z"
                    clipRule="evenodd"
                  />
                  <path d="M8 12a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                </svg>
                <span>Desktop</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">Different Sizes</h3>
        <div className="space-y-2">
          <Select>
            <SelectTrigger size="sm" className="w-[200px]">
              <SelectValue placeholder="Small select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Default select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">Disabled States</h3>
        <div className="space-y-2">
          <Select disabled>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Disabled select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
            </SelectContent>
          </Select>
          <Select disabled defaultValue="option2">
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  ),
};
