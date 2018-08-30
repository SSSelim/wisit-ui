import React, { Component } from 'react';
import * as api from '../util/api';

class Up extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: '[defaultMessage]'
    };
  }

  componentDidMount() {
    api.up().then(response => {
      this.setState({msg: response.msg})
    });
  }

  render() {
    return (
        <p> {this.state.msg} </p>
    );
  }
}

export default Up;
