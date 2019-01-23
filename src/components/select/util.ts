import { SelectOptionProps } from './option';

/**
 * 获取选择结果
 * @param optionProps
 */
export const getSelectOptionDisplayValue = (optionProps: SelectOptionProps) => {
  return optionProps.displayBy || optionProps.title;
};

/**
 * 判断option是否能被检索
 * @param optionProps
 * @param keyword
 */
export const isSelectOptionIncluded = (optionProps: SelectOptionProps, keyword: string) => {
  if (optionProps.filterBy) {
    return optionProps.filterBy.some(f => {
      return f.includes(keyword);
    });
  } else {
    return optionProps.title.includes(keyword);
  }
};
