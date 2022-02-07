import React from 'react';
import { Form } from 'antd';
import Filter, { FilterProps } from './index';
import type { PropsWithChildren } from 'react';
import { FormInstance } from 'antd/lib/form/Form';

export type Return<V> = {
  Filter: (props: PropsWithChildren<Omit<FilterProps<V>, 'form'>>) => JSX.Element;
  reset: FormInstance<V>['resetFields'];
  validate: FormInstance<V>['validateFields'];
  getValue: FormInstance<V>['getFieldValue'];
  getValues: FormInstance<V>['getFieldsValue'];
  setValues: FormInstance<V>['setFieldsValue'];
};

function useFilter<FieldsValue>(): Return<FieldsValue> {
  const [form] = Form.useForm();
  return {
    Filter: (props: PropsWithChildren<Omit<FilterProps<FieldsValue>, 'form'>>) => {
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
