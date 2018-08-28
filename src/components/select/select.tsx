/**
 * 用于datastream或者猛犸事件跟踪的过滤筛选交互
 */
import classNames from 'classnames/bind';
import React, { Component } from 'react';

import styles from './select.scss';
import Menu from '../menu';
import Icon from '../icon';

const Item = Menu.Item;
const ItemGroup = Menu.ItemGroup;

const cx = classNames.bind(styles);

interface ISourceOption {
  name: string;
  key: string;
  filter?: number | string;
}

interface ISourceGroup {
  title: string;
  options: ISourceOption[];
}

type SourceItem = ISourceOption | ISourceGroup;

interface ISelectProps {
  className?: string;
  style?: React.CSSProperties;
  source: SourceItem[]; // select的数据源
  title: string; //  selectAll的文案
}

interface ISelectState {
  value: string; // 显示在input框里面的文案，会随着选择的选项不同而变化
  showMenu: boolean;
  selected: string[];
  searchKey: string;
}

/**
 * source数据源示例：
 * const source = [
  {
    title: '数据开发',
    options: [
      {
        name: '新建任务',
        key: 'newTask',
        filter: 9
      },
      {
        name: '开放依赖授权',
        key: 'exposeDependency',
        filter: 46
      },
      {
        name: '收回依赖授权',
        key: 'withdrawDependency',
        filter: 47
      }
    ]
  },
  {
    name: '新增队列',
    key: 'addQueue',
    filter: 32
  },
  {
    name: '移交Owner',
    key: 'charge',
    filter: 33
  },
  {
    name: '新增Hive库',
    key: 'addHive',
    filter: 34
  }];
 */

export default class Select extends Component<ISelectProps, ISelectState> {
  public static defaultProps: Partial<ISelectProps> = {
    title: '全部动作'
  };
  public readonly state: Readonly<ISelectState> = {
    value: this.props.title,
    showMenu: false,
    selected: [],
    searchKey: ''
  };
  public selectDom: React.RefObject<any> = React.createRef<any>();
  constructor(props) {
    super(props);
    this.selectItem = this.selectItem.bind(this);
    this.changeDropDown = this.changeDropDown.bind(this);
    this.search = this.search.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }
  public componentDidMount() {
    document.addEventListener('click', this.clickHandler);
  }

  public componentWillUnmount() {
    document.removeEventListener('click', this.clickHandler);
  }
  public clickHandler(e) {
    const selectDom = this.selectDom.current;
    if (!selectDom.contains(e.target)) {
      this.setState({
        showMenu: false
      });
    }
  }
  public selectItem(e) {
    const { title } = this.props;
    this.setState({
      selected: e,
      value: title.split('全部')[1] + '（已选' + e.length + '项）'
    });
  }
  public search(e) {
    this.setState({
      searchKey: e.target.value,
      showMenu: true
    });
  }
  public changeDropDown() {
    const { showMenu } = this.state;
    this.setState({
      showMenu: !showMenu
    });
  }
  public render() {
    const { className, style, source, title } = this.props;
    const { showMenu, value, searchKey, selected } = this.state;
    const classes = cx('u-select', className);
    const inputClasses = cx('input');
    return (
      <div className={classes} style={style} ref={this.selectDom}>
        <input
          type="text"
          className={inputClasses}
          value={searchKey}
          placeholder={value}
          onClick={this.changeDropDown}
          onChange={this.search}
        />
        <Icon name="caret-down" className={cx('vareticon')} />
        {showMenu && (
          <Menu
            className={cx('selectmenu')}
            isTick={true}
            multiple={true}
            onSelect={this.selectItem}
            selected={selected}
          >
            <Item value="ALL">{title}</Item>
            <Menu.Divider />
            {source.map((item: SourceItem) => {
              if ((item as ISourceGroup).title) {
                return (
                  <ItemGroup key={(item as ISourceGroup).title} title={(item as ISourceGroup).title}>
                    {(item as ISourceGroup).options.map(option => {
                      return (
                        <Item
                          key={option.key}
                          value={option.key}
                          visible={!searchKey || option.name.indexOf(searchKey) !== -1}
                        >
                          {option.name}
                        </Item>
                      );
                    })}
                  </ItemGroup>
                );
              } else {
                return (
                  <Item
                    key={(item as ISourceOption).key}
                    value={(item as ISourceOption).key}
                    visible={!searchKey || (item as ISourceOption).name.indexOf(searchKey) !== -1}
                  >
                    {(item as ISourceOption).name}
                  </Item>
                );
              }
            })}
          </Menu>
        )}
      </div>
    );
  }
}
