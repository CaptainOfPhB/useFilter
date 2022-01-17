import { Button, Col, Form, Row, Space } from 'antd';
import type { PropsWithChildren, ReactNode } from 'react';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import { FormInstance, FormProps } from 'antd/lib/form/Form';
import React, { useState, useMemo, useCallback, Children } from 'react';

export enum Column {
  default = 6,
  large = 3
}

export enum Span {
  default = 4,
  large = 8
}

export enum Gutter {
  default = 16,
  large = 24
}

export interface RootProps<V> {
  form: FormInstance<V>;
  defaultExpanded?: boolean;
  size?: 'default' | 'large';
  resetText?: React.ReactNode;
  submitText?: React.ReactNode;
  rest?: Omit<FormProps<V>, 'form'>;
  onSubmit?: (values: V) => Promise<unknown> | void;
}

function Root<V>(props: PropsWithChildren<RootProps<V>>) {
  const span = props.size ? Span[props.size] : Span.default;
  const gutter = props.size ? Gutter[props.size] : Gutter.default;
  const columns = props.size ? Column[props.size] : Column.default;
  const [loading, setLoading] = useState<boolean | { delay?: number }>(false);
  const [expanded, setExpanded] = useState<boolean>(props.defaultExpanded || false);
  const { form, onSubmit, children, rest, submitText, resetText } = props;

  const onFinish = useCallback(
    async (values: V) => {
      if (onSubmit) {
        setLoading({ delay: 100 });
        try {
          await onSubmit(values);
        } finally {
          setLoading(false);
        }
      }
    },
    [onSubmit]
  );

  const [memoizedOffset, memoizedChildren] = useMemo(() => {
    const pickedChildren = expanded ? children : Children.toArray(children).slice(0, columns - 1);
    const childrenLength = Children.count(pickedChildren);
    const column = columns - (childrenLength % columns) - 1;
    const colWrappedChildren = Children.map(pickedChildren, (child: ReactNode) => <Col span={span}>{child}</Col>);
    return [column * span, colWrappedChildren];
  }, [children, columns, expanded, span]);

  return (
    <Form form={form} layout='vertical' onFinish={onFinish} {...rest}>
      <Row gutter={gutter}>
        {memoizedChildren}
        <Col offset={memoizedOffset} span={span} style={{ textAlign: 'right' }}>
          <Form.Item label=' ' colon={false}>
            <Space>
              <Button type='primary' htmlType='submit' loading={loading}>
                {submitText || '搜索'}
              </Button>
              <Button htmlType='reset'>{resetText || '重置'}</Button>
              <Button type='link' onClick={() => setExpanded(!expanded)}>
                {expanded ? '收起' : '展开'}
                {expanded ? <UpOutlined /> : <DownOutlined />}
              </Button>
            </Space>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export default Root;
