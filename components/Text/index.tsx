import * as React from 'react';
import { Form, Input } from 'antd';
import { FormInstance } from 'antd/lib/form/Form';
import { FormItemProps, ValidateStatus } from 'antd/lib/form/FormItem';
import { ReactNode, ChangeEvent, useState, useEffect } from 'react';

import Filter from '../Filter';

export interface TextProps<FilterValues> extends FormItemProps<FilterValues> {
  span?: number;
  value?: string;
  disabled?: boolean;
  placeholder?: string;
  form: FormInstance<FilterValues>;
  onChange: (value: string | undefined, form: FormInstance<FilterValues>) => void;
  normalizer?: (value: string) => string;
  validator?: (value: string) => true | string;
}

function Text<FilterValues>(props: TextProps<FilterValues>) {
  const { value: propsValue, onChange, validator, normalizer } = props;

  const [value, setValue] = useState<string | undefined>(propsValue);
  const [help, setHelp] = useState<ReactNode | undefined>(undefined);
  const [status, setStatus] = useState<ValidateStatus | undefined>(undefined);

  useEffect(() => {
    if (propsValue === undefined) {
      setStatus('');
      setHelp(undefined);
    }
  }, [propsValue]);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus('');
    setValue(e.target.value);
    setHelp(undefined);

    const trimmedValue = e.target.value.trim();

    if (!trimmedValue) {
      onChange(undefined, props.form);
      return;
    }

    if (validator) {
      const result = validator(trimmedValue);
      if (result !== true) {
        setHelp(result);
        setStatus('error');
        return;
      }
    }

    normalizer ? onChange(normalizer(trimmedValue), props.form) : onChange(trimmedValue, props.form);
  };

  return (
    <Form.Item name={props.name} label={props.label} help={help} validateStatus={status}>
      <Input
        allowClear={true}
        onChange={onInputChange}
        disabled={props.disabled}
        placeholder={props.placeholder}
        value={propsValue !== undefined ? value : undefined}
      />
    </Form.Item>
  );
}

export default Filter.create(Text);
