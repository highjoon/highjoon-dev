'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { BsMoonFill, BsSunFill } from 'react-icons/bs';

import { THEME } from '@/constants/theme';

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleClickButton = () => {
    setTheme(theme === THEME.DARK ? THEME.LIGHT : THEME.DARK);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      aria-label="Toggle Theme"
      type="button"
      className="text-[25px] md:text-[35px] lg:text-[45px] hover:text-primary-500 dark:text-white dark:hover:text-primary-500"
      onClick={handleClickButton}>
      {theme === THEME.LIGHT ? <BsSunFill /> : <BsMoonFill />}
    </button>
  );
};

export default ThemeSwitch;
