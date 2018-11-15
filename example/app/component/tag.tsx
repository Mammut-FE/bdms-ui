import { Samples } from "../demo";
import * as React from "react";
import { Tag } from "../../../src";

const samples: Samples = [{
  title: '标签',
  description: '标签',
  component: () => (
    <div>
      <Tag>你好</Tag>
      <Tag>你好hsh</Tag>
    </div>
  )
}]

export default samples
