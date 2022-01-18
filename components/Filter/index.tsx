import { Button, Col, Form, Row, Space } from 'antd';
import type { ReactElement, ReactNode, Ref } from 'react';
import { FormInstance, FormProps } from 'antd/lib/form/Form';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import React, { forwardRef, useState, useMemo, useCallback, Children } from 'react';

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
  defaultExpanded?: boolean;
  resetText?: React.ReactNode;
  submitText?: React.ReactNode;
  filterSize?: 'default' | 'large';
  onFinish?: (values: V) => Promise<unknown> | void;
}

function InternalFilter<V>(props: FilterProps<V>, ref: Ref<FormInstance<V>>) {
  const { defaultExpanded, resetText, submitText, filterSize, onFinish, ...rest } = props;
  const span = filterSize ? Span[filterSize] : Span.default;
  const gutter = filterSize ? Gutter[filterSize] : Gutter.default;
  const columns = filterSize ? Column[filterSize] : Column.default;
  const [loading, setLoading] = useState<boolean | { delay?: number }>(false);
  const [expanded, setExpanded] = useState<boolean>(defaultExpanded || false);

  const fn = useCallback(
    async (values: V) => {
      if (onFinish) {
        setLoading({ delay: 100 });
        try {
          await onFinish(values);
        } finally {
          setLoading(false);
        }
      }
    },
    [onFinish]
  );

  const [memoizedOffset, memoizedChildren] = useMemo(() => {
    const pickedChildren = expanded ? props.children : Children.toArray(props.children).slice(0, columns - 1);
    const childrenLength = Children.count(pickedChildren);
    const column = columns - (childrenLength % columns) - 1;
    const colWrappedChildren = Children.map(pickedChildren, (child: ReactNode) => <Col span={span}>{child}</Col>);
    return [column * span, colWrappedChildren];
  }, [columns, expanded, props.children, span]);

  return (
    <Form ref={ref} layout='vertical' onFinish={fn} {...rest}>
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

const Filter = forwardRef(InternalFilter) as <V>(
  props: FilterProps<V> & { ref?: Ref<FormInstance<V>> }
) => ReactElement;

export default Filter;
