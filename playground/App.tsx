import React from 'react';
import { Card, Input, Form } from 'antd';
import useFilter, { Text, Numeric, Selector } from '../src';

interface Values {
  foo: string;
  bar: string;
}

function App() {
  const { Filter, getValue } = useFilter<Values>();

  const onSearch = (values: Values) =>
    new Promise<boolean>(resolve =>
      setTimeout(() => {
        console.log(values);
        resolve(true);
      }, 1000)
    );

  return (
    <div>
      <Card title={Text.name}>
        <Filter size='large' onSubmit={onSearch}>
          <Text name='foo' label='Text demo' placeholder='please input a string' />
          <Numeric name='bar' label='Number demo' placeholder='please input a number' />
          <Numeric name='bar' label='Number demo' placeholder='please input a number' />
          <Numeric name='bar' label='Number demo' placeholder='please input a number' />
          <Numeric name='bar' label='Number demo' placeholder='please input a number' />
          <Numeric name='bar' label='Number demo' placeholder='please input a number' />
          <Numeric name='bar' label='Number demo' placeholder='please input a number' />
          <Selector
            name='user'
            label='Selector demo'
            placeholder='please select an user'
            options={[
              { label: 123, value: 123 },
              { label: 'aaa', value: 'aaa' }
            ]}
          />
          <Form.Item dependencies={['user']}>
            {() => (
              <Form.Item name='input' label='custom input'>
                <Input placeholder='please input' disabled={!getValue('user')} />
              </Form.Item>
            )}
          </Form.Item>
        </Filter>
      </Card>
    </div>
  );
}

export default App;
