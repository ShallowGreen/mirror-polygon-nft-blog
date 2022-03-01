import {ReactElement} from 'react';
import {Text} from 'degen';

const MyError = ({statusCode}: {statusCode: string}): ReactElement => {
  return (
    <Text>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </Text>
  );
};

MyError.getInitialProps = async ({res, err}) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return {statusCode};
};

export default MyError;
