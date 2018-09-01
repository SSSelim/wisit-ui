import React from 'react'
import { Icon, Statistic } from 'semantic-ui-react'
import {UserStatisticsContext} from '../context/UserStatisticsContext';

const UserStatistics = () => (
  <UserStatisticsContext.Consumer>
    {(context) => (
      <Statistic.Group widths='two' size='small'>

        <Statistic color='green'>
          <Statistic.Value>
            <Icon name='check' />
            {context.correctCount}
          </Statistic.Value>
          <Statistic.Label>Correct</Statistic.Label>
        </Statistic>

        <Statistic color='red'>
          <Statistic.Value>
            <Icon name='cancel' />
            {context.wrongCount}
          </Statistic.Value>
          <Statistic.Label>Wrong</Statistic.Label>
        </Statistic>

      </Statistic.Group>

    )}
  </UserStatisticsContext.Consumer>
);

export default UserStatistics