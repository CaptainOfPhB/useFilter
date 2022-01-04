import React from 'react';
import { Form } from 'antd';
import Filter, { FilterProps } from './Filter';
import { FormInstance } from 'antd/lib/form/Form';

export type Return<V> = {
  Filter: (props: React.PropsWithChildren<Omit<FilterProps<V>, 'form'>>) => JSX.Element;
  reset: FormInstance<V>['resetFields'];
  validate: FormInstance<V>['validateFields'];
  getValue: FormInstance<V>['getFieldValue'];
  getValues: FormInstance<V>['getFieldsValue'];
  setValues: FormInstance<V>['setFieldsValue'];
};

function useFilter<FilterValues>(): Return<FilterValues> {
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
