import {Button, Card, IconExclamation, Stack, Text} from 'degen';
import React from 'react';

type ErrorBlockProps = {
  icon?: JSX.Element;
  title: string;
  message: string;
  retry?: () => void;
};

const ErrorBlock = (props: ErrorBlockProps): JSX.Element => {
  const {
    icon = <IconExclamation size="32" color="red" />,
    title,
    message,
    retry,
  } = props;

  return (
    <Card padding="6">
      <Stack align="center">
        {icon && icon}
        <Text variant="extraLarge">{title}</Text>
        <Text>{message}</Text>
        {retry && <Button onClick={retry}>Retry</Button>}
      </Stack>
    </Card>
  );
};

export default ErrorBlock;
