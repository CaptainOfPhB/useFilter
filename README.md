# Filter

![staging-test-statement][staging-test-statement] ![coverage-statement][coverage-statement]

A [React][react] component that can gather form values easily, based on [antd 4.0][antd].

[staging-test-statement]: https://github.com/feasier/useFilter/actions/workflows/main.yml/badge.svg?branch=staging 'badge link'

[react]: https://reactjs.org 'react'

[antd]: https://ant.design 'ant design'

[coverage-statement]: ./badges/badge-statements.svg

## Usage

```typescript jsx
import React from 'react';
import Filter, { Text } from 'feasier/filter';

interface Values {
  name: string;
}

function Demo() {
  const onFinish = (values: Values) => {
    console.log(values);
  }

  return (
    <Filter<Values> onFinish={onSearch}>
      <Text
        name='name'
        label='your name'
        allowClear={true}
        rules={[{ required: true, message: 'name is required!' }]}
      />
    </Filter>
  )
}
```
