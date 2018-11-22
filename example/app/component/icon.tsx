import { Samples } from "../Demo";
import { Icon } from "../../../src";
import React from "react";

const icons = [
  'details',
  'file-mini',
  'ture',
  'order-down',
  'order-up',
  'choose',
  'choose-cancle',
  'stop',
  'log-big',
  'more',
  'notebook',
  'query',
  'sidebar-up',
  'sidebar-down',
  'format2',
  'fullscreen',
  'run2',
  'save2',
  'download',
  'light-off',
  'light-on',
  'rerun',
  'cancel',
  'disable',
  'result',
  'info',
  'release',
  'project',
  'project-open',
  'folder-closed',
  'folder-open',
  'taskflows',
  'node',
  'database',
  'table',
  'waiting',
  'ok',
  'warning',
  'error',
  'script',
  'loaddata',
  'top',
  'save',
  'format',
  'package',
  'run',
  'refresh',
  'setting',
  'preparing',
  'running',
  'killed',
  'paused',
  'succeeded',
  'failed',
  'field',
  'statistics',
  'instance',
  'tasklist',
  'projectcenter',
  'zoomin',
  'zoomout',
  'original',
  'search',
  'back',
  'add',
  'close-circle',
  'filter',
  'close',
  'chevron-down',
  'chevron-up',
  'caret-down',
  'message',
  'calendar',
  'time',
  'log',
  'copy',
  'delete',
  'edit',
  'view',
  'right',
  'left',
  'arrow'
];

function IconGroup(props) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap'
    }}>{props.children}</div>
  )
}

function IconSample({name}: any) {
  return (
    <div style={{
      flex: 'none',
      width: '80px',
      textAlign: 'center',
      padding: '12px 8px',
      fontSize: '14px'
    }}>
      <Icon name={name}/>
      <div>{name}</div>
    </div>
  )
}

const samples: Samples = [{
  title: '所有图标',
  description: '所有图标',
  component: () => (
    <IconGroup>
      {icons.map((icon) => (<IconSample name={icon} key={icon}/>))}
    </IconGroup>
  )
}]

export default samples
