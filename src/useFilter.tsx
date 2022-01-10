import React from 'react';
import { Form } from 'antd';
import Root, { RootProps } from './Root';
import { FormInstance } from 'antd/lib/form/Form';

export type Return<V> = {
  Filter: (props: React.PropsWithChildren<Omit<RootProps<V>, 'form'>>) => JSX.Element;
  reset: FormInstance<V>['resetFields'];
  validate: FormInstance<V>['validateFields'];
  getValue: FormInstance<V>['getFieldValue'];
  getValues: FormInstance<V>['getFieldsValue'];
  setValues: FormInstance<V>['setFieldsValue'];
};

function useFilter<FieldsValue>(): Return<FieldsValue> {
  const [form] = Form.useForm();
  return {
    Filter: (props: React.PropsWithChildren<Omit<RootProps<FieldsValue>, 'form'>>) => {
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
