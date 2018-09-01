import React, {Component} from 'react';
import { Segment, Container } from 'semantic-ui-react'
import Question from './page/Question';
import UserStatistics from './component/UserStatistics';

class App extends Component {
  render() {
    return (
        <Container>
          <Segment.Group>
            <Segment>
              <UserStatistics/>
            </Segment>
            <Segment.Group horizontal>
              <Segment>
                <Question/>
              </Segment>
            </Segment.Group>
          </Segment.Group>
        </Container>
    );
  }
}

export default App;
