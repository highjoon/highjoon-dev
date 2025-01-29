'use client';

import { useEffect, useState } from 'react';
import {
  type BoxProps,
  rem,
  Switch,
  useComputedColorScheme,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import { BsMoonFill, BsSunFill } from 'react-icons/bs';

import { THEME } from '@/constants/theme';

type Props = { visibleFrom?: BoxProps['visibleFrom'] };

const ThemeSwitch = ({ visibleFrom }: Props) => {
  const mantineTheme = useMantineTheme();
  const { setColorScheme } = useMantineColorScheme({ keepTransitions: true });
  const computedColorScheme = useComputedColorScheme(THEME.LIGHT);

  const [mounted, setMounted] = useState(false);

  const handleSwitchTheme = () => {
    // setTheme(theme === THEME.DARK ? THEME.LIGHT : THEME.DARK);
    setColorScheme(computedColorScheme === THEME.DARK ? THEME.LIGHT : THEME.DARK);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Switch
        size="md"
        color="dark.4"
        onLabel={<BsSunFill style={{ width: rem(13), height: rem(13) }} color={mantineTheme.colors.yellow[4]} />}
        offLabel={<BsMoonFill style={{ width: rem(13), height: rem(13) }} color={mantineTheme.white} />}
        disabled
        visibleFrom={visibleFrom}
      />
    );
  }

  return (
    <Switch
      size="md"
      color="dark.4"
      onLabel={<BsSunFill style={{ width: rem(13), height: rem(13) }} color={mantineTheme.colors.yellow[4]} />}
      offLabel={<BsMoonFill style={{ width: rem(13), height: rem(13) }} color={mantineTheme.white} />}
      checked={computedColorScheme === THEME.LIGHT}
      onChange={handleSwitchTheme}
      visibleFrom={visibleFrom}
    />
  );
};

export default ThemeSwitch;
