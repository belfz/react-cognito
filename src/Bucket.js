import React, { Component } from 'react';
import { Storage } from 'aws-amplify';

class Bucket extends Component {
  constructor () {
    super();
    this.state = {
      list: [],
      isLoading: true
    };
  }

  async componentDidMount () {
    await this.refreshList();
  }
  
  async refreshList () {
    const list = await Storage.list('');
    this.setState({ list, isLoading: false });
  }

  render () {
    if (this.state.isLoading) {
      return <p>loading...</p>;
    }
    return (
      <ul>
        {
          this.state.list
            .map(({ key }) => <li key={key}>{key}</li>)
        }
      </ul>
    );
  }
}

export default Bucket;
