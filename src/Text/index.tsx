import React from 'react';
import { Form, Input } from 'antd';
import { BaseProps, TextBaseProps } from '../interface';

export type TextProps<V> = TextBaseProps & BaseProps<V>;

function Text<Values>(props: TextProps<Values>) {
  const { textProps, fieldProps } = props;

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
        onChange={props.onChange}
        disabled={props.disabled}
        placeholder={props.placeholder}
        allowClear={props.allowClear || true}
      />
    </Form.Item>
  );
}

export default Text;
