import React, { useCallback } from 'react';
import { RowProps } from 'antd/lib/grid/row';
import { FormInstance, FormProps } from 'antd/lib/form/Form';
import { Button, Col, ColProps, Form, Row, Space } from 'antd';
import { ReactElement, Children, useState, useMemo } from 'react';

export type ChildType = ReactElement<{ span?: number }>;

export interface RootProps<V> {
  defaultSpan?: number;
  actionProps?: ColProps;
  gap?: RowProps['gutter'];
  resetText?: React.ReactNode;
  searchText?: React.ReactNode;
  customAction?: React.ReactNode;
  form: FormInstance<V>;
  children: ChildType | ChildType[];
  filterProps?: Omit<FormProps<V>, 'form'>;
  onSubmit?: (fieldsValue: V) => Promise<unknown> | void;
}

function Root<V>(props: RootProps<V>) {
  const defaultSpan = props.defaultSpan || 4;
  const [loading, setLoading] = useState<boolean | { delay?: number }>(false);
  const { form, onSubmit, filterProps, actionProps, customAction, searchText, resetText } = props;

  const ColWrappedChildren = useMemo(() => {
    return Children.map(props.children, function (child: ChildType) {
      const span = child.props.span || defaultSpan;
      return <Col span={span}>{child}</Col>;
    });
  }, [props.children, defaultSpan]);

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

  return (
    <Form form={form} layout='vertical' {...filterProps} onFinish={onFinish}>
      <Row gutter={props.gap || 16}>
        {ColWrappedChildren}
        <Col span={defaultSpan} {...actionProps}>
          <Form.Item label=' '>
            {customAction || (
              <Space size='middle'>
                <Button type='primary' htmlType='submit' loading={loading}>
                  {searchText || '搜索'}
                </Button>
                <Button type='dashed' htmlType='reset'>
                  {resetText || '重置'}
                </Button>
              </Space>
            )}
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export default Root;
