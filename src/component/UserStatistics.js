import React from 'react'
import { Icon, Statistic } from 'semantic-ui-react'

const UserStatistics = () => (
  <Statistic.Group widths='two' size='small'>

    <Statistic color='green'>
      <Statistic.Value>
        <Icon name='check' />
        15
      </Statistic.Value>
      <Statistic.Label>Correct</Statistic.Label>
    </Statistic>

    <Statistic color='red'>
      <Statistic.Value>
        <Icon name='cancel' />
        5
      </Statistic.Value>
      <Statistic.Label>Wrong</Statistic.Label>
    </Statistic>

  </Statistic.Group>
);

export default UserStatistics