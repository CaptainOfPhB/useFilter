import React from 'react';
import { Form, Select, SelectProps } from 'antd';
import { FieldProps, PruneProps } from '../index';
import { BaseOptionType, SelectValue, DefaultOptionType } from 'antd/lib/select';

type SelectorKeys =
  | 'loading'
  | 'notFoundContent'
  | 'optionFilterProp'
  | 'optionLabelProp'
  | 'options'
  | 'showSearch'
  | 'onSearch'
  | 'disabled'
  | 'placeholder'
  | 'onChange'
  | 'allowClear'
  | 'fieldNames'
  | 'filterOption'
  | 'labelInValue';

export type SelectorProps<V, O> = PruneProps<SelectProps<V, O>, SelectorKeys, 'extras'>;

function Selector<
  Value extends SelectValue,
  FieldsValue = unknown,
  OptionType extends BaseOptionType = DefaultOptionType
>(props: SelectorProps<Value, OptionType> & FieldProps<FieldsValue>) {
  const { extras, fields } = props;

  return (
    <Form.Item
      {...fields}
      name={props.name}
      rules={props.rules}
      label={props.label}
      extra={props.extra}
      tooltip={props.tooltip}
      required={props.required}
      normalize={props.normalize}
      initialValue={props.initialValue}
    >
      <Select<Value, OptionType>
        {...extras}
        options={props.options}
        loading={props.loading}
        onSearch={props.onSearch}
        onChange={props.onChange}
        disabled={props.disabled}
        fieldNames={props.fieldNames}
        showSearch={props.showSearch}
        allowClear={props.allowClear}
        placeholder={props.placeholder}
        filterOption={props.filterOption}
        labelInValue={props.labelInValue}
        optionLabelProp={props.optionLabelProp}
        notFoundContent={props.notFoundContent}
        optionFilterProp={props.optionFilterProp}
      />
    </Form.Item>
  );
}

export default Selector;
