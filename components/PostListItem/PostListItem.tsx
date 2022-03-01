import React from 'react';
import Link from 'next/link';
import {Box, IconChevronRight, Text} from 'degen';

type PostListItemProps = {
  title: string;
  href: string;
};

const PostListItem = (props: PostListItemProps): JSX.Element => {
  const {title, href} = props;
  return (
    <Link href={href} passHref>
      <Box
        backgroundColor="white"
        padding="4"
        borderRadius="large"
        cursor="pointer"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text variant="extraLarge">{title}</Text>
        <IconChevronRight />
      </Box>
    </Link>
  );
};

export default PostListItem;
