import type { ReactNode } from 'react';
import { Button, Col, Form, Row, Space } from 'antd';
import { FormInstance, FormProps } from 'antd/lib/form/Form';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
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

export interface FilterProps<V = unknown> extends FormProps<V> {
  form: FormInstance<V>;
  defaultExpanded?: boolean;
  resetText?: React.ReactNode;
  submitText?: React.ReactNode;
  filterSize?: 'default' | 'large';
  onSubmit?: (values: V) => Promise<unknown> | void;
}

function Filter<V>(props: FilterProps<V>) {
  const { defaultExpanded, resetText, submitText, filterSize, form, onSubmit, ...rest } = props;
  const span = filterSize ? Span[filterSize] : Span.default;
  const gutter = filterSize ? Gutter[filterSize] : Gutter.default;
  const columns = filterSize ? Column[filterSize] : Column.default;
  const [loading, setLoading] = useState<boolean | { delay?: number }>(false);
  const [expanded, setExpanded] = useState<boolean>(defaultExpanded || false);

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
    const pickedChildren = expanded ? props.children : Children.toArray(props.children).slice(0, columns - 1);
    const childrenLength = Children.count(pickedChildren);
    const column = columns - (childrenLength % columns) - 1;
    const colWrappedChildren = Children.map(pickedChildren, (child: ReactNode) => <Col span={span}>{child}</Col>);
    return [column * span, colWrappedChildren];
  }, [columns, expanded, props.children, span]);

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

export default Filter;
