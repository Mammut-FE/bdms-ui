import { addDays, subDays } from 'date-fns';
import * as React from 'react';
import { DatePicker } from '../../../src';
import { Samples } from '../Demo';

const { DateRangePicker } = DatePicker

const samples: Samples = [{
  title: '基础使用',
  description: '默认只能选择日期',
  component: () => <DatePicker placeholder="请选择时间"/>
}, {
  title: '带时间选择',
  description: '通过设置 showTime 参数',
  component: () => <DatePicker showTime={true} placeholder="请选择日期和时间"/>
}, {
  title: '自定义显示内容',
  description: 'format 参数接受格式化字符串或者格式化函数',
  component: () => (
    <>
      <DatePicker defaultValue={new Date()} format="YYYY" placeholder="格式化字符串"/>
      <DatePicker defaultValue={new Date()} format={time => `星期 ${time.getDay()}`} placeholder="格式化函数"/>
    </>
  )
}, {
  title: '支持显示当前时间',
  description: 'showToday 和 todayText 参数分别控制是否显示跳转到当前时间和当前的文字',
  component: () => (
    <>
      <DatePicker placeholder="默认为“此刻”" showToday={true}/>
      <DatePicker placeholder="自定义为今天" showToday={true} todayText="今天"/>
    </>
  )
}, {
  title: '时间范围选择',
  description: 'DatePicker.DateRangePicker 支持范围时间选择',
  component: () => (
    <>
      <DateRangePicker placeholder="范围日期选择"/>
      <DateRangePicker showTime={true} placeholder="范围时间选择"/>
      <DateRangePicker defaultValue={[new Date(), new Date()]} format={range => `星期 ${range[0].getDay()} 到 星期${range[1].getDay()}`} placeholder="自定义格式化参数"/>
      <DateRangePicker placeholder="支持显示当前" showToday={true} showTime={true}/>
    </>
  )
}, {
  title: '对范围进行限制',
  description: '通过 `max` `min` 字段进行限制，时间戳或者 Date 对象',
  component: () => (
    <>
      <DatePicker placeholder="只能选择今天之前的" max={new Date()}/>
      <DatePicker placeholder="只能选择前天之后的" min={subDays(new Date(), 2)}/>
      <DateRangePicker placeholder="范围选择同样支持" min={subDays(new Date(), 5)} max={addDays(new Date(), 5)}/>
    </>
  )
}]

export default samples
