import React from 'react';
import { Form } from 'antd';
import Filter, { FilterProps } from './Filter';

function useFilter<FilterValues>() {
  const [form] = Form.useForm();
  return {
    Filter: (props: React.PropsWithChildren<Omit<FilterProps<FilterValues>, 'form'>>) => {
      const { children, ...rest } = props;
      return (
        <Filter form={form} {...rest}>
          {children}
        </Filter>
      );
    },
    reset: form.resetFields,
    validate: form.validateFields,
    getValue: form.getFieldValue,
    getValues: form.getFieldsValue,
    setValues: form.setFieldsValue
  };
}

export default useFilter;
