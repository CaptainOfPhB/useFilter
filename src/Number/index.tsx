import React from 'react';
import { Form, Input } from 'antd';
import { BaseProps, TextBaseProps } from '../interface';

export interface NumericProps<V> extends TextBaseProps, BaseProps<V> {}

function Numeric<V>(props: NumericProps<V>) {
  const { fieldProps, textProps } = props;

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(2, Number(e.target.value));
  }

  return (
    <Form.Item
      {...fieldProps}
      name={props.name}
      rules={props.rules}
      label={props.label}
      extra={props.extra}
      tooltip={props.tooltip}
      required={props.required}
      normalize={props.normalize}
      initialValue={props.initialValue}
    >
      <Input
        {...textProps}
        onChange={onChange}
        disabled={props.disabled}
        placeholder={props.placeholder}
        allowClear={props.allowClear}
      />
    </Form.Item>
  );
}

export default Numeric;
