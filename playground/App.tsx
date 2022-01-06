import React from 'react';
import { Card } from 'antd';
import useFilter, { Text, Numeric, Selector } from '../src';

interface Values {
  foo: string;
  bar: string;
}

function App() {
  const { Filter } = useFilter<Values>();

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
        <Filter onSearch={onSearch}>
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
            options={[
              { label: 123, value: 123 },
              { label: 'aaa', value: 'aaa' }
            ]}
          />
        </Filter>
      </Card>
    </div>
  );
}

export default App;
