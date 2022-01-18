import { Card, FormInstance } from 'antd';
import Filter, { Text } from '../components';
import React, { Component, createRef } from 'react';

interface Values {
  text: string;
}

class ClassComp extends Component {
  filter = createRef<FormInstance>();

  componentDidMount() {
    setTimeout(() => this.filter.current?.setFieldsValue({ text: 'aaaaaaaaaaaaa' }), 1000);
  }

  onSubmit(values: Values) {
    console.log(values);
  }

  render() {
    return (
      <Card title='class component'>
        <Filter ref={this.filter} onFinish={this.onSubmit}>
          <Text name='text' label='text label' />
        </Filter>
      </Card>
    );
  }
}

export default ClassComp;
