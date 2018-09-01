import React, {Component} from 'react';
import {Button, Image, Loader, Segment} from 'semantic-ui-react'
import * as api from '../util/api';

class Question extends Component {
  constructor(props) {
    super(props);

    this.answerQuestion = this.answerQuestion.bind(this);

    this.state = {
      question: {},
      showAnswer: false,
      givenAnswer: '',
      loaded: false,
      answerQuestion: this.answerQuestion
    };
  }

  answerQuestion(givenAnswer) {
    console.log("given answer: ", givenAnswer);
    const correctAnswer = this.state.question.correctAnswer;
    if (givenAnswer === correctAnswer) {
      console.log("Act on correct answer");
    } else {
      console.log("Act on wrong answer")
    }
    this.setState({givenAnswer: givenAnswer, showAnswer: true})
  }

  componentDidMount() {
    api.newQuestion().then(response => {
      this.setState({question: response, loaded: true})
    });
  }

  render() {
    const buttonSize = 'large';

    return (
      <div>
        {this.state.loaded ?
          (
            <div>
              <Button.Group attached='top' size={buttonSize}>
                {constructButton(0, this.state)}
                <Button.Or />
                {constructButton(1, this.state)}
              </Button.Group>
              <Segment attached>
                <Image src={this.state.question.imgUrl} centered width={800}/>
              </Segment>
              <Button.Group attached='bottom' size={buttonSize}>
                {constructButton(2, this.state)}
                <Button.Or />
                {constructButton(3, this.state)}
              </Button.Group>
            </div>
          ) :
          (<Loader active content='Bringing you a new question...' />)
        }
      </div>
    );
  }
}

export default Question;

function getButtonColor(buttonText, state) {
  if (state.showAnswer) {
    if (state.question.correctAnswer === buttonText) {
      return 'green';
    }
    if (state.givenAnswer === buttonText) {
      return 'red';
    }
  }
  return 'blue';
}

function constructButton(number, state) {
  const option = state.question.options[number];

  return (
    <Button
      color={getButtonColor(option, state)}
      onClick={(e) => state.answerQuestion(option, e)} >
      {option}
    </Button>
  );
}
