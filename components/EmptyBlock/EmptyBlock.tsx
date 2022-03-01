import {Card, Stack, Text} from 'degen';
import React from 'react';

type EmptyBlockProps = {
  title: string;
  message: string;
};

const EmptyBlock = (props: EmptyBlockProps): JSX.Element => {
  const {title, message} = props;

  return (
    <Card padding="6">
      <Stack align="center">
        <Text variant="extraLarge">{title}</Text>
        <Text>{message}</Text>
      </Stack>
    </Card>
  );
};

export default EmptyBlock;
