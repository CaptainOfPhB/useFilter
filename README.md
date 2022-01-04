# useFilter

![staging-test-statement][staging-test-statement] ![coverage-statement][coverage-statement]

A [React][react] hooks that can gather form values easily, based on [antd 4.0][antd].

[staging-test-statement]: https://github.com/feasier/useFilter/actions/workflows/main.yml/badge.svg?branch=staging 'badge link'

[react]: https://reactjs.org 'react'

[antd]: https://ant.design 'ant design'

[coverage-statement]: ./coverage/badge-statements.svg

## Usage

```typescript jsx
import React from 'react';
import useFilter, { Text } from 'feasier/useFilter';

interface Values {
  name: string;
}

function Demo() {
  const { Filter } = useFilter<Values>();

  const onSearch = (values: Values) => {
    console.log(values);
  }

  return (
    <Filter<Values> onSearch={onSearch}>
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
