import React from 'react';
import { Form, FormItemProps } from 'antd';
import { Prune } from '../index';

type FieldKeys = 'rules' | 'name' | 'initialValue' | 'required' | 'extra' | 'label' | 'tooltip' | 'normalize';

export type FieldProps = Prune<FormItemProps, FieldKeys, 'fieldProps'> & {
  span?: number;
  children?: FormItemProps['children'];
};

/**
 * Component wrapper
 * @param props: FormItemProps & { span?: number }
 * @return Form.Item instance
 */
function Field(props: FieldProps) {
  return (
    <Form.Item
      {...props.fieldProps}
      name={props.name}
      rules={props.rules}
      label={props.label}
      extra={props.extra}
      tooltip={props.tooltip}
      required={props.required}
      normalize={props.normalize}
      initialValue={props.initialValue}
    >
      {props.children}
    </Form.Item>
  );
}

export default Field;
