import React, {Component} from 'react';
import { Card, Container, Image, Button } from 'semantic-ui-react'
import * as api from '../util/api';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: {},
      loaded: false
    };
  }

  componentDidMount() {
    api.newQuestion().then(response => {
      console.log("Got question: ", response);
      this.setState({question: response, loaded: true})
    });
  }

  render() {
    return (
      <Container>
        {this.state.loaded ?
          (<QuestionForm questionData={this.state.question}/>) :
          (<p>Loading question...</p>)}
      </Container>
    );
  }
}

export default Question;

function QuestionForm(props) {
  return (
    <Card fluid>
      <Image src={props.questionData.imgUrl} />
      <Card.Content>
        <Card.Description>
          <Button.Group>
            <Button>{props.questionData.options[0]}</Button>
            <Button.Or />
            <Button>{props.questionData.options[1]}</Button>
            <Button.Or />
            <Button>{props.questionData.options[2]}</Button>
            <Button.Or />
            <Button>{props.questionData.options[3]}</Button>
          </Button.Group>
        </Card.Description>
      </Card.Content>
    </Card>
  );
}
