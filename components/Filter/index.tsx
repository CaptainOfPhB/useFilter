import * as React from 'react';
import { RowProps } from 'antd/lib/grid/row';
import { FormInstance, FormProps } from 'antd/lib/form/Form';
import { Button, Col, ColProps, Form, Row, Space } from 'antd';
import { ReactElement, Children, cloneElement, useState, useMemo, useCallback } from 'react';

export type ChildType = ReactElement<{ span?: number; form: FormInstance }>;

export interface FilterProps<FilterValues> {
  offset?: number;
  onReset: () => void;
  rowProps?: RowProps;
  colProps?: ColProps;
  children: ChildType | ChildType[];
  formProps?: Omit<FormProps<FilterValues>, 'form'>;
  onSearch: (filterValues: FilterValues) => Promise<boolean>;
}

const defaultSpan = 4;

function Filter<FilterValues>(props: FilterProps<FilterValues>) {
  const { onSearch, children } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const ColWrappedChildren = useMemo(() => {
    const childrenCount = Children.count(children);
    if (!childrenCount) {
      throw Error('Wrong usage of <Filter>, you should pass at least one child.');
    }
    if (childrenCount === 1) {
      const span = (children as ChildType).props.span || defaultSpan;
      return <Col span={span}>{cloneElement(children as ChildType, { form })}</Col>;
    }
    if (childrenCount > 1) {
      return Children.map(children, function (child: ChildType) {
        const span = child.props.span || defaultSpan;
        return <Col span={span}>{cloneElement(child, { form })}</Col>;
      });
    }
  }, [children, form]);

  const onClickSearch = useCallback(async () => {
    setLoading(true);
    await onSearch({} as FilterValues);
    setLoading(false);
  }, [onSearch]);

  return (
    <Form form={form} layout='vertical' name='filter-component' {...props.formProps}>
      <Row gutter={{ lg: 4, xl: 16 }} align='middle' {...props.rowProps}>
        {ColWrappedChildren}
        <Col offset={props.offset} span={defaultSpan} {...props.colProps}>
          <Form.Item label=' '>
            <Space size='middle'>
              <Button type='primary' loading={loading} onClick={onClickSearch}>
                查询
              </Button>
              <Button onClick={props.onReset}>重置</Button>
            </Space>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

Filter.create = function <P extends { form: FormInstance }>(Component: React.ComponentType<P>) {
  return function (props: Omit<P, 'form'>): JSX.Element {
    return <Component {...(props as P)} />;
  };
};

export default Filter;
