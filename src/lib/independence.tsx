import React from 'react';

export function DefaultPropName(prop: string) {
  return `default${prop[0].toUpperCase()}${prop.slice(1)}`;
}

export function OnChangePropName(prop: string) {
  return `on${prop[0].toUpperCase()}${prop.slice(1)}Change`;
}

export function noop() {}

export interface PropertyOptions {
  [k: string]: PropertyOption;
}

export interface PropertyOption {
  defaultName?: string;
  onChangeName?: string;
  defaultValue?: any;
}

export interface IndependenceOption {
  defaultPropName?: (prop: string) => string;
  onChangePropName?: (prop: string) => string;
}

export interface Property {
  name: string;
  defaultName: string;
  onChangeName: string;
  defaultValue: any;
}

function normalizePropertyOptions(
  options: PropertyOptions,
  defaultPropName: (a: string) => string,
  onChangePropName: (a: string) => string
): Property[] {
  const properties: Property[] = [];
  for (const name of Object.keys(options)) {
    const property: Property = {
      name,
      defaultName: defaultPropName(name),
      onChangeName: onChangePropName(name),
      defaultValue: undefined
    };

    const value = options[name];
    Object.assign(property, value);

    properties.push(property);
  }

  return properties;
}

/**
 * 让组件支持可控和自主两种状态，当传入对应的值时，进入可控状态，由用户管理组件的状态。
 * 当不传入对应的值的时候，组件进入自主模式，由组件自己维护状态，用户只需要关心 onChange 等变化事件
 * @param propsMapper
 * @param defaultPropName
 * @param onChangePropName
 */
export function Independence(
  propsMapper: PropertyOptions,
  { defaultPropName = DefaultPropName, onChangePropName = OnChangePropName }: IndependenceOption = {}
) {
  const properties = normalizePropertyOptions(propsMapper, defaultPropName, onChangePropName);

  return (Component: any) => {
    class WrapperComponent extends React.Component<any> {
      public static displayName = `${Component.name || Component.displayName || 'Component'}(Independence)`;
      private onChangeCache: object = {};

      constructor(props) {
        super(props);

        const state = {};
        for (const prop of properties) {
          state[prop.name] = props[prop.defaultName] || prop.defaultValue;
        }

        this.state = state;
      }

      public render() {
        const { wrapperRef, ...restProps } = { ...this.props } as any;
        const props = {};

        for (const prop of properties) {
          if (prop.name in restProps) {
            Object.assign(props, this.ctlProp(prop));
          } else {
            Object.assign(props, this.indepProp(prop));
          }
          delete restProps[prop.defaultName];
        }

        return <Component {...restProps} {...props} ref={wrapperRef} />;
      }

      private ctlProp(prop: Property) {
        return {
          [prop.name]: this.props[prop.name],
          [prop.onChangeName]: this.props[prop.onChangeName] || noop
        };
      }

      private indepProp(prop: Property) {
        const onChange =
          this.onChangeCache[prop.name] ||
          (value => {
            this.setState({ [prop.name]: value });
            if (this.props[prop.onChangeName]) {
              this.props[prop.onChangeName](value);
            }
          });

        this.onChangeCache[prop.name] = onChange;
        return {
          [prop.name]: this.state[prop.name],
          [prop.onChangeName]: onChange
        };
      }
    }

    return React.forwardRef<any, any>((props, ref) => {
      return <WrapperComponent {...props} wrapperRef={ref} />;
    }) as any;
  };
}
