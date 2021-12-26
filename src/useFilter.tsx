import React from 'react';
import { Form } from 'antd';
import { ReactElement } from 'react';
import Filter, { FilterProps } from './Filter';
import { FormInstance } from 'antd/lib/form/Form';

export type ChildType = ReactElement<{ span?: number; form: FormInstance }>;

function useFilter<FilterValues>() {
  const [form] = Form.useForm();
  return {
    Filter: (filterProps: Omit<FilterProps<FilterValues>, 'form'>) => <Filter form={form} {...filterProps} />,
    reset: form.resetFields,
    validate: form.validateFields,
    getValue: form.getFieldValue,
    getValues: form.getFieldsValue,
    setValues: form.setFieldsValue
  };
}

export default useFilter;
