import { FormItemProps, InputProps } from 'antd';

type FieldBaseKeys = 'rules' | 'name' | 'initialValue' | 'required' | 'extra' | 'label' | 'tooltip' | 'normalize';

/**
 * The basic interface that any custom component should extend it.
 */
export type BaseProps<V = unknown> = Pick<FormItemProps<V>, FieldBaseKeys> & {
  span?: number;
  fieldProps?: Exclude<FormItemProps<V>, FieldBaseKeys>;
};

type TextBaseKeys = 'disabled' | 'placeholder' | 'onChange' | 'allowClear';

/**
 * Custom components that use Input as the child of Form.Item should extend it.
 */
export type TextBaseProps = Pick<InputProps, TextBaseKeys> & {
  textProps?: Exclude<InputProps, TextBaseKeys>;
};
