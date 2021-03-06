import React from 'react';
export interface IMenuContextType {
  clickItem: (key: any) => void;
  selected: string | string[];
  isTick?: boolean;
  mode?: string;
  hasCheckBox?: boolean;
}
const menuContext = React.createContext<IMenuContextType>({
  clickItem: (key: string) => {},
  selected: '' || [],
  isTick: false,
  mode: 'vertical',
  hasCheckBox: false
});

export const Provider = menuContext.Provider;

export const Consumer = menuContext.Consumer;
