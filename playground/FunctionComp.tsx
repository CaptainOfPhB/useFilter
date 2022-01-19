import React from 'react';
import { Card, Input, Form } from 'antd';
import Filter, { Text, Dato, Numeric, Selector, Mutex } from '../components';

interface Values {
  foo: string;
  bar: string;
}

function FunctionComp() {
  const [form] = Form.useForm<Values>();

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
        <Filter form={form} filterSize='large' onFinish={onSearch}>
          <Text name='foo' label='Text demo' placeholder='please input a string' />
          <Numeric name='bar' label='Number demo' placeholder='please input a number' />
          <Dato name='date' label='date label' />
          <Mutex<boolean>
            name='mutex'
            label='mutex selector'
            positive={{ label: '是', value: true }}
            negative={{ label: '否', value: false }}
          />
          <Selector<number, { label1: string; value1: number }>
            name='user'
            label='Selector demo'
            placeholder='please select an user'
            options={[
              { label1: '123', value1: 123 },
              { label1: 'aaa', value1: 456 }
            ]}
            optionProps={row => ({
              value: row.value1,
              label: row.label1,
              disabled: row.value1 === 123,
              children: row.label1 + row.value1
            })}
          />
          <Form.Item dependencies={['user']}>
            {({ getFieldValue }) => (
              <Form.Item name='input' label='custom input'>
                <Input placeholder='please input' disabled={!getFieldValue('user')} />
              </Form.Item>
            )}
          </Form.Item>
        </Filter>
      </Card>
    </div>
  );
}

export default FunctionComp;
