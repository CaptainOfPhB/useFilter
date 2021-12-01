import * as React from 'react';
import { Button, Col, Form, Row, Space } from 'antd';
import { ReactElement, Children, cloneElement, useState, useMemo, useCallback } from 'react';

export type ChildType = ReactElement<{ span?: number }>;

export interface FilterProps {
  offset?: number;
  onReset: () => void;
  onSearch: () => Promise<boolean>;
  children: ChildType | ChildType[];
}

const defaultSpan = 4;

function Filter(props: FilterProps) {
  const { onSearch, children } = props;
  const [loading, setLoading] = useState(false);

  const SpanPropsInjectedChildren = useMemo(() => {
    const childrenCount = Children.count(children);
    if (!childrenCount) {
      throw Error('Wrong usage of <Filter>, you should pass at least one child.');
    }
    if (childrenCount === 1) {
      const span = (children as ChildType).props.span || defaultSpan;
      return cloneElement(children as ReactElement, { span });
    }
    if (childrenCount > 1) {
      return Children.map(children, function (child: ChildType) {
        const span = child.props.span || defaultSpan;
        return cloneElement(child as ReactElement, { span });
      });
    }
  }, [children]);

  const onClickSearch = useCallback(async () => {
    setLoading(true);
    await onSearch();
    setLoading(false);
  }, [onSearch]);

  return (
    <Form layout='vertical' name='filter-component'>
      <Row gutter={{ lg: 4, xl: 16 }} align='middle'>
        {SpanPropsInjectedChildren}
        <Col offset={props.offset} span={defaultSpan}>
          <Form.Item style={{ marginTop: 30, textAlign: 'right' }}>
            <Space align='center'>
              <Button type='primary' loading={loading} onClick={onClickSearch} style={{ marginRight: 10 }}>
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

export default Filter;
