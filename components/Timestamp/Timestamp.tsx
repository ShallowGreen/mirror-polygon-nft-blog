import React from 'react';
import {Text} from 'degen';
import {DateTime} from 'luxon';

type TimestampProps = {
  timestamp: number;
};

const Timestamp = (props: TimestampProps): JSX.Element => {
  const {timestamp} = props;
  const dateTime = DateTime.fromSeconds(timestamp);

  return <Text>{dateTime.toLocaleString(DateTime.DATETIME_MED)}</Text>;
};

export default Timestamp;
