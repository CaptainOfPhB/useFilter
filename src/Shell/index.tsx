import React from 'react';
import { Col, Form, FormItemProps } from 'antd';

export interface ShellProps<V> extends FormItemProps<V> {
  span?: number;
}

function Shell<V>(props: ShellProps<V>) {
  const { span, ...rest } = props;
  return (
    <Col span={span}>
      <Form.Item {...rest} />
    </Col>
  );
}

export default Shell;
