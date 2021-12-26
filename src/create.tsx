import React from 'react';
import { FormInstance } from 'antd';

export default function create<P extends { form: FormInstance }>(Component: React.ComponentType<P>) {
  return function (props: Omit<P, 'form'>): JSX.Element {
    return <Component {...(props as P)} />;
  };
}
