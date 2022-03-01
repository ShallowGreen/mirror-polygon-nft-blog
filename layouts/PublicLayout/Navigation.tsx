import {ReactElement} from 'react';
import Link from 'next/link';
import {Stack} from 'degen';

import routes from '@/routes';

const Navigation = (): ReactElement => {
  return (
    <Stack>
      <Link href={routes.home}>Home</Link>
    </Stack>
  );
};

export default Navigation;
