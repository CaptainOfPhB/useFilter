import React, { useCallback } from 'react';
import { RowProps } from 'antd/lib/grid/row';
import { FormInstance, FormProps } from 'antd/lib/form/Form';
import { Button, Col, ColProps, Form, Row, Space } from 'antd';
import { ReactElement, Children, useState, useMemo } from 'react';

export type ChildType = ReactElement<{ span?: number }>;

export interface FilterProps<FilterValues = unknown> {
  defaultSpan?: number;
  actionProps?: ColProps;
  gap?: RowProps['gutter'];
  resetText?: React.ReactNode;
  searchText?: React.ReactNode;
  customAction?: React.ReactNode;
  form: FormInstance<FilterValues>;
  children: ChildType | ChildType[];
  filterProps?: Omit<FormProps<FilterValues>, 'form'>;
  onSearch?: (filterValues: FilterValues) => Promise<unknown> | void;
}

function Filter<FilterValues>(props: FilterProps<FilterValues>) {
  const defaultSpan = props.defaultSpan || 4;
  const [loading, setLoading] = useState<boolean | { delay?: number }>(false);
  const { form, onSearch, filterProps, actionProps, customAction, searchText, resetText } = props;

  const ColWrappedChildren = useMemo(() => {
    const childrenCount = Children.count(props.children);
    if (!childrenCount) {
      throw Error('Wrong usage of <Filter>, you should pass at least one child.');
    }
    return Children.map(props.children, function (child: ChildType) {
      const span = child.props.span || defaultSpan;
      return <Col span={span}>{child}</Col>;
    });
  }, [props.children, defaultSpan]);

  const onFinish = useCallback(
    async (values: FilterValues) => {
      if (onSearch) {
        setLoading({ delay: 100 });
        try {
          await onSearch(values);
        } finally {
          setLoading(false);
        }
      }
    },
    [onSearch]
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

export default Filter;
