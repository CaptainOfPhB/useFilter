import React from 'react';
import { Form, Input } from 'antd';
import { BaseProps, TextBaseProps } from '../interface';

export interface TextProps<V> extends TextBaseProps, BaseProps<V> {
  trim?: boolean;
}

function Text<Values>(props: TextProps<Values>) {
  const { textProps, fieldProps } = props;

  // const [value, setValue] = useState<string | undefined>(propsValue);

  // useEffect(() => {
  //   if (propsValue === undefined) {
  //     setStatus('');
  //     setHelp(undefined);
  //   }
  // }, [propsValue]);

  // const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setStatus('');
  //   setValue(e.target.value);
  //   setHelp(undefined);

  //   const trimmedValue = e.target.value.trim();

  //   if (!trimmedValue) {
  //     onChange(undefined);
  //     return;
  //   }

  //   if (validator) {
  //     const result = validator(trimmedValue);
  //     if (result !== true) {
  //       setHelp(result);
  //       setStatus('error');
  //       return;
  //     }
  //   }

  //   normalizer ? onChange(normalizer(trimmedValue)) : onChange(trimmedValue);
  // };

  return (
    <Form.Item
      {...fieldProps}
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
        {...textProps}
        onChange={props.onChange}
        disabled={props.disabled}
        placeholder={props.placeholder}
        allowClear={props.allowClear || true}
      />
    </Form.Item>
  );
}

export default Text;
