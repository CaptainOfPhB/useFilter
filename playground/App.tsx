import * as React from 'react';
import { Card } from 'antd';
import Filter, { Text } from '../components';
import { FormInstance } from 'antd/lib/form/Form';

interface Values {
  foo: string;
  bar: string;
}

function App() {
  const onSearch = () => new Promise<boolean>(resolve => setTimeout(() => resolve(true), 2000));
  const onReset = () => console.log('onReset');
  const onChange1 = (value: string | undefined, form: FormInstance) => {
    console.log(value);
    form.setFieldsValue({ bar: 123 });
  };
  const onChange2 = (value: string | undefined, form: FormInstance) => {
    console.log(value);
    form.setFieldsValue({ foo: 33333333 });
  };
  return (
    <div>
      <Card title={Text.name}>
        <Filter<Values> onSearch={onSearch} onReset={onReset}>
          <Text name='foo' label='Text demo' onChange={onChange1} />
          <Text name='bar' label='Text demo' onChange={onChange2} />
        </Filter>
      </Card>
    </div>
  );
}

export default App;
