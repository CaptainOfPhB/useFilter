import React from 'react';
import { Prune } from '../index';
import Field, { FieldProps } from '../Field';
import { InputNumber, InputNumberProps } from 'antd';

type NumericKeys = 'disabled' | 'placeholder' | 'onChange' | 'precision' | 'max' | 'min';

export type NumericProps = Prune<InputNumberProps, NumericKeys, 'rest'>;

function Numeric(props: NumericProps & FieldProps) {
  const { rest } = props;
  const controls = !!rest?.controls;

  return (
    <Field {...props}>
      <InputNumber
        {...rest}
        min={props.min}
        max={props.max}
        controls={controls}
        style={{ width: '100%' }}
        onChange={props.onChange}
        disabled={props.disabled}
        precision={props.precision}
        placeholder={props.placeholder}
      />
    </Field>
  );
}

export default Numeric;
