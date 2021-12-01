import * as React from 'react';
import { Form, Input } from 'antd';

interface TextProps {
  label: React.ReactNode;
  placeholder?: string;
}

function Text(props: TextProps) {
  return (
    <Form.Item label={props.label}>
      <Input placeholder={props.placeholder} />
    </Form.Item>
  );
}

export default Text;
