import { SelectOptionProps } from './option';

export const getSelectOptionDisplayTitle = (optionProps: SelectOptionProps) => {
  return optionProps.displayBy || optionProps.title;
};

export const isSelectOptionIncluded = (optionProps: SelectOptionProps, keyword: string) => {
  if (optionProps.filterBy) {
    return optionProps.filterBy.some(f => {
      return f.includes(keyword);
    });
  } else {
    return optionProps.title.includes(keyword);
  }
};
