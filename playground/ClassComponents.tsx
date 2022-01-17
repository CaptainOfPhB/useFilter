import { Card } from 'antd';
import Filter, { Text } from '../components';
import React, { Component, createRef } from 'react';
import { FilterHandler } from '../components/Filter/useFilter';

class App extends Component {
  filter = createRef<FilterHandler>();

  componentDidMount() {
    setTimeout(() => this.filter.current?.setValues({ text: 'aaaaaaaaaaaaa' }), 1000);
  }

  render() {
    return (
      <Card title='class component'>
        <Filter ref={this.filter}>
          <Text name='text' label='text label' />
        </Filter>
      </Card>
    );
  }
}

export default App;
