import React from 'react';
import { Form, Input, InputProps } from 'antd';
import { FieldProps, PruneProps } from '../index';

type TextKeys = 'disabled' | 'placeholder' | 'onChange' | 'allowClear';

export type TextProps = PruneProps<InputProps, TextKeys, 'extras'>;

function Text<Values>(props: TextProps & FieldProps<Values>) {
  const { extras, fields } = props;

  return (
    <Form.Item
      {...fields}
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
        {...extras}
        onChange={props.onChange}
        disabled={props.disabled}
        allowClear={props.allowClear}
        placeholder={props.placeholder}
      />
    </Form.Item>
  );
}

export default Text;
