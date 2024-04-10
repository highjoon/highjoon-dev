import { ComboboxItem, OptionsFilter } from '@mantine/core';

export const searchOptionsFilter: OptionsFilter = ({ options, search }) => {
  const splittedSearch = search.toLowerCase().trim().split(' ');
  return (options as ComboboxItem[])
    .filter((option) => {
      const words = option.label.toLowerCase().trim().split(' ');
      return splittedSearch.every((searchWord) => words.some((word) => word.includes(searchWord)));
    })
    .sort((a, b) => a.label.localeCompare(b.label));
};
