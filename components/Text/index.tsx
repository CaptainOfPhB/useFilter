import * as React from 'react';
import { Form, Input, Col } from 'antd';
import { ValidateStatus } from 'antd/lib/form/FormItem';
import { ReactNode, ChangeEvent, useState, useEffect, useCallback } from 'react';

export interface TextProps {
  span?: number;
  value?: string;
  label: ReactNode;
  disabled?: boolean;
  placeholder?: string;
  onChange: (value?: string) => void;
  normalizer?: (value: string) => string;
  validator?: (value: string) => true | string;
}

function Text(props: TextProps) {
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

  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setStatus('');
      setValue(e.target.value);
      setHelp(undefined);

      const trimmedValue = e.target.value.trim();

      if (!trimmedValue) {
        onChange(undefined);
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

      normalizer ? onChange(normalizer(trimmedValue)) : onChange(trimmedValue);
    },
    [normalizer, onChange, validator]
  );

  return (
    <Col span={props.span}>
      <Form.Item label={props.label} help={help} validateStatus={status}>
        <Input
          allowClear={true}
          onChange={onInputChange}
          disabled={props.disabled}
          placeholder={props.placeholder}
          value={propsValue !== undefined ? value : undefined}
        />
      </Form.Item>
    </Col>
  );
}

export default Text;
