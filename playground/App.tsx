import * as React from 'react';
import { Card } from 'antd';
import Filter, { Text } from '../components';

function App() {
  const onSearch = () => new Promise<boolean>(resolve => setTimeout(() => resolve(true), 2000));
  const onReset = () => console.log('onReset');
  const onChange = () => console.log(123);
  return (
    <div>
      <Card title={Text.name}>
        <Filter onSearch={onSearch} onReset={onReset}>
          <Text label='Text demo' onChange={onChange} />
        </Filter>
      </Card>
    </div>
  );
}

export default App;
