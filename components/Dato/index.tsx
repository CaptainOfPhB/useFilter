import React from 'react';
import Field, { FieldProps } from '../Field';
import { DatePicker, DatePickerProps } from 'antd';

const defaultFormat = 'YYYY-MM-DD HH:mm:ss';

export type DatoProps = DatePickerProps;

function Dato(props: DatoProps & FieldProps) {
  return (
    <Field {...props}>
      <DatePicker format={defaultFormat} style={{ width: '100%' }} />
    </Field>
  );
}

export default Dato;
