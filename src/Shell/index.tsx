import React from 'react';
import { Col, Form, FormItemProps } from 'antd';

export interface ShellProps<V> extends FormItemProps<V> {
  span?: number;
}

function Shell<V>(props: ShellProps<V>) {
  return (
    <Col span={props.span}>
      <Form.Item {...props}>{props.children}</Form.Item>
    </Col>
  );
}

export default Shell;
