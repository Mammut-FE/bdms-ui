import React from "react";
import { Grid, Col, Row } from "../../src";
import DemoCard from "./DemoCard";
import styles from './demo.scss'
import cn from 'classnames/bind'

const cx = cn.bind(styles)

export interface Sample {
  title: string
  description: string
  component: React.ComponentType
}

export type Samples = Sample[]

export interface Demo {
  /**
   * 英文小写缩写，用于 key
   */
  name: string
  /**
   * 名称
   */
  title: string
  description: string
  samples: Samples
  col?: number
}

export function buildDemo(demo: Demo): React.ComponentType {
  const {col = 12} = demo
  const Demo = class extends React.Component {
    public render() {
      return (
        <div className={cx('demo-page')}>
          <h1>{demo.title}</h1>
          <Grid>
            <Row>
              {demo.samples.map(sample => {
                return (
                  <Col key={sample.title} xs={col}>
                    <DemoCard {...sample}/>
                  </Col>
                )
              })}
            </Row>
          </Grid>
        </div>
      )
    }
  }

  ;(Demo as any).displayName = `Demo(${demo.name})`

  return Demo
}
