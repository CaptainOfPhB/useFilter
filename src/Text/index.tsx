import React from 'react';
import { Prune } from '../index';
import { Input, InputProps } from 'antd';
import Field, { FieldProps } from '../Field';

type TextKeys = 'disabled' | 'placeholder' | 'onChange' | 'allowClear';

export type TextProps = Prune<InputProps, TextKeys, 'extras'>;

function Text(props: TextProps & FieldProps) {
  return (
    <Field {...props}>
      <Input
        {...props.extras}
        onChange={props.onChange}
        disabled={props.disabled}
        allowClear={props.allowClear}
        placeholder={props.placeholder}
      />
    </Field>
  );
}

export default Text;
