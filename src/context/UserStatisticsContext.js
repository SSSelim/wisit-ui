import { createContext } from 'react';
import React, { Component } from 'react';

export const UserStatisticsContext = createContext();

export class UserStatisticsContextProvider extends Component {
  constructor(props) {
    super(props);

    this.actOnCorrectAnswer = () => {
      this.setState((prevState) => ({
        correctCount: prevState.correctCount + 1
      }));
    };

    this.actOnWrongAnswer = () => {
      this.setState((prevState) => ({
        wrongCount: prevState.wrongCount + 1
      }));
    };

    this.state = {
      correctCount: 0,
      wrongCount: 0,
      actOnCorrectAnswer: this.actOnCorrectAnswer,
      actOnWrongAnswer: this.actOnWrongAnswer
    };
  }

  componentWillMount() {
    this.setState({ correctCount: 0, wrongCount: 0 });
  }

  render() {
    return (
      <UserStatisticsContext.Provider value={this.state}>
        {this.props.children}
      </UserStatisticsContext.Provider>
    );
  }
}
