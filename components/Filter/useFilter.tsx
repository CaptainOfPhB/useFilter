import React from 'react';
import { Form } from 'antd';
import Root, { RootProps } from '../Root';
import type { PropsWithChildren } from 'react';
import { FormInstance } from 'antd/lib/form/Form';

export type FilterProps<V = unknown> = PropsWithChildren<Omit<RootProps<V>, 'form'>>;

export type FilterComp<V = unknown> = {
  Filter: (props: FilterProps<V>) => JSX.Element;
};

export interface FilterHandler<V = unknown> {
  reset: FormInstance<V>['resetFields'];
  validate: FormInstance<V>['validateFields'];
  getValue: FormInstance<V>['getFieldValue'];
  getValues: FormInstance<V>['getFieldsValue'];
  setValues: FormInstance<V>['setFieldsValue'];
}

function useFilter<V>(): FilterComp<V> & FilterHandler<V> {
  const [form] = Form.useForm();
  return {
    Filter: (props: FilterProps<V>) => {
      const { children, ...rest } = props;
      return (
        <Root form={form} {...rest}>
          {children}
        </Root>
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
