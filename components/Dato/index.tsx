import React from 'react';
import Field, { FieldProps } from '../Field';
import { DatePicker, DatePickerProps } from 'antd';

const defaultFormat = 'YYYY-MM-DD HH:mm:ss';

export type DatoProps = DatePickerProps & {
  a?: number;
};

function Dato(props: DatoProps & FieldProps) {
  const hasName = props.name !== undefined;
  return (
    <Field fields={{ dependencies: hasName ? [props.name!] : [] }}>
      {({ setFieldsValue }) => {
        return (
          <Field {...props}>
            <DatePicker
              format={defaultFormat}
              style={{ width: '100%' }}
              onChange={(_: unknown, dateString: string) => {
                setFieldsValue({ [props.name!]: dateString });
              }}
            />
          </Field>
        );
      }}
    </Field>
  );
}

export default Dato;
