import React from 'react';
import { Prune } from '../index';
import { Select, SelectProps } from 'antd';
import Field, { FieldProps } from '../Field';

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

export type SelectorProps<V, O> = Prune<SelectProps<V, O>, SelectorKeys, 'selectorProps'>;

function Selector<Value, OptionType>(props: SelectorProps<Value, OptionType> & FieldProps) {
  return (
    <Field {...props}>
      <Select<Value, OptionType>
        {...props.selectorProps}
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
    </Field>
  );
}

export default Selector;
