import React, {Component} from 'react';
import {Card, Icon, Button, Image, Loader, Segment} from 'semantic-ui-react'
import * as api from '../util/api';
import {UserStatisticsContext} from '../context/UserStatisticsContext';

class Question extends Component {
  constructor(props) {
    super(props);

    this.answerQuestion = this.answerQuestion.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);

    this.state = {
      question: {},
      showAnswer: false,
      givenAnswer: '',
      loaded: false,
      answerQuestion: this.answerQuestion,
      nextQuestion: this.nextQuestion
    };
  }

  nextQuestion() {
    this.setState({loaded: false, showAnswer: false, givenAnswer: ''});

    api.newQuestion().then(response => {
      this.setState({question: response, loaded: true})
    });

  }

  answerQuestion(givenAnswer) {
    console.log("given answer: ", givenAnswer);
    const correctAnswer = this.state.question.correctAnswer;
    if (givenAnswer === correctAnswer) {
      console.log("Act on correct answer");
      this.props.context.actOnCorrectAnswer();
    } else {
      console.log("Act on wrong answer");
      this.props.context.actOnWrongAnswer();
    }
    this.setState({givenAnswer: givenAnswer, showAnswer: true})
  }

  componentDidMount() {
    this.nextQuestion()
  }

  render() {
    const buttonSize = 'large';

    return (
      <div>
        {this.state.loaded ?
          (
            <div>
              {this.state.showAnswer ? (
                <InformationCard info={this.state}/>
              ): (
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
              )}
            </div>
          ) : (
            <Loader active content='Bringing you a new question...' />
          )
        }
      </div>
    );
  }
}

// so we can pass context as props to component,
// and reach out context functions in component functions
export default props => (
  <UserStatisticsContext.Consumer>
    {context => <Question {...props} context={context} />}
  </UserStatisticsContext.Consumer>
);

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
      disabled={state.showAnswer}
      color={getButtonColor(option, state)}
      onClick={(e) => state.answerQuestion(option, e)} >
      {option}
    </Button>
  );
}

const InformationCard = (props) => (
  <Card fluid>
    <Card.Content extra>
      <a onClick={props.info.nextQuestion}>
        <Icon name='angle right' />
        Next Question
      </a>
    </Card.Content>
    <Card.Content>
      <Card.Header>{props.info.question.correctAnswer}</Card.Header>
      {/*<Card.Meta>Joined in 2016</Card.Meta>*/}
      <Card.Description>Some information about the location.</Card.Description>
    </Card.Content>
    <Image src={props.info.question.imgUrl} />
  </Card>
);
