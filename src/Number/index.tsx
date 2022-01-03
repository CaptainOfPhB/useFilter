import React from 'react';
import { Form, Input } from 'antd';
import { BaseProps, TextBaseProps } from '../interface';

export interface NumericProps<V> extends TextBaseProps, BaseProps<V> {}

function Numeric<V>(props: NumericProps<V>) {
  const { form, fieldProps, textProps } = props;

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (!value.trim()) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      form!.setFieldsValue({ [props.name]: undefined });
    }
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
