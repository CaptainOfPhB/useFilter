import React from 'react';
import { FieldProps, PruneProps } from '../useFilter';
import { Form, InputNumber, InputNumberProps } from 'antd';

type NumericKeys = 'disabled' | 'placeholder' | 'onChange' | 'precision' | 'max' | 'min';

export type NumericProps = PruneProps<InputNumberProps, NumericKeys, 'numericExtraProps'>;

function Numeric<V>(props: NumericProps & FieldProps<V>) {
  const { fieldExtraProps, numericExtraProps } = props;
  const controls = !!props.numericExtraProps?.controls;

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
      <InputNumber
        {...numericExtraProps}
        min={props.min}
        max={props.max}
        controls={controls}
        style={{ width: '100%' }}
        onChange={props.onChange}
        disabled={props.disabled}
        precision={props.precision}
        placeholder={props.placeholder}
      />
    </Form.Item>
  );
}

export default Numeric;
