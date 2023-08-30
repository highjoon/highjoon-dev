'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { BsMoonFill, BsSunFill } from 'react-icons/bs';

import { Theme } from '@/services/constants/theme';

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleClickButton = () => {
    setTheme(theme === Theme.dark ? Theme.light : Theme.dark);
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
      {theme === Theme.light ? <BsSunFill /> : <BsMoonFill />}
    </button>
  );
};

export default ThemeSwitch;
