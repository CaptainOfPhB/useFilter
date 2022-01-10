import React from 'react';
import { Card, Input } from 'antd';
import useFilter, { Text, Numeric, Selector, Field } from '../src';

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
        <Filter onSubmit={onSearch}>
          <Text
            name='foo'
            label='Text demo'
            initialValue='abc'
            tooltip='text demo tooltip'
            rules={[{ required: true, message: 'foo is required' }]}
          />
          <Numeric
            name='bar'
            label='Number demo'
            initialValue={123}
            tooltip='number demo tooltip'
            rules={[{ required: true, message: 'bar is required' }]}
          />
          <Selector
            name='user'
            label='Selector demo'
            placeholder='please select an user'
            options={[
              { label: 123, value: 123 },
              { label: 'aaa', value: 'aaa' }
            ]}
          />
          <Field span={6} fieldProps={{ dependencies: ['user'] }}>
            {() => {
              return (
                <Field
                  name='input'
                  initialValue='aaa'
                  label='custom input'
                  rules={[
                    { required: true, message: 'please input a name' },
                    { pattern: /^[a-zA-Z]+$/g, message: 'please input letter' }
                  ]}
                >
                  <Input placeholder='11111111' disabled={!getValue('user')} />
                </Field>
              );
            }}
          </Field>
        </Filter>
      </Card>
    </div>
  );
}

export default App;
