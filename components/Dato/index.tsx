import React from 'react';
import { Prune } from '../index';
import Field, { FieldProps } from '../Field';
import { DatePicker, DatePickerProps } from 'antd';

const defaultFormat = 'YYYY-MM-DD HH:mm:ss';

type DatoKeys = 'disabled' | 'placeholder' | 'allowClear' | 'disabledDate' | 'format' | 'onChange';

export type DatoProps = Prune<DatePickerProps, DatoKeys, 'rest'>;

function Dato(props: DatoProps & FieldProps) {
  return (
    <Field {...props}>
      <DatePicker
        style={{ width: '100%' }}
        disabled={props.disabled}
        onChange={props.onChange}
        allowClear={props.allowClear}
        placeholder={props.placeholder}
        disabledDate={props.disabledDate}
        format={props.format || defaultFormat}
      />
    </Field>
  );
}

export default Dato;
