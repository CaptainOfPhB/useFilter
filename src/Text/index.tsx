import React from 'react';
import { Form, Input, InputProps } from 'antd';
import { FieldProps, PruneProps } from '../useFilter';

type TextKeys = 'disabled' | 'placeholder' | 'onChange' | 'allowClear';

export type TextProps = PruneProps<InputProps, TextKeys, 'textExtraProps'>;

function Text<Values>(props: TextProps & FieldProps<Values>) {
  const { textExtraProps, fieldExtraProps } = props;

  return (
    <Form.Item
      {...fieldExtraProps}
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
        {...textExtraProps}
        onChange={props.onChange}
        disabled={props.disabled}
        placeholder={props.placeholder}
        allowClear={props.allowClear}
      />
    </Form.Item>
  );
}

export default Text;
