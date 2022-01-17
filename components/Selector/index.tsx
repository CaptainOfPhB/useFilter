import React from 'react';
import { Prune } from '../index';
import { Select, SelectProps } from 'antd';
import Field, { FieldProps } from '../Field';
import { OptionProps } from 'antd/lib/select';

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

export interface SelectorProps<V, O> extends Prune<SelectProps<V, O>, SelectorKeys, 'rest'> {
  optionProps?: (row: O) => OptionProps;
}

function Selector<Value, OptionType>(props: SelectorProps<Value, OptionType> & FieldProps) {
  const options = props.optionProps ? undefined : props.options;
  return (
    <Field {...props}>
      <Select<Value, OptionType>
        {...props.rest}
        options={options}
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
      >
        {props.optionProps
          ? props.options?.map(option => {
              const optionProps = props.optionProps!(option);
              return <Select.Option key={optionProps.value} {...optionProps} />;
            })
          : null}
      </Select>
    </Field>
  );
}

export default Selector;
