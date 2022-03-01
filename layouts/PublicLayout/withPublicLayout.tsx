import React from 'react';

import PublicLayout from './PublicLayout';

const withPublicLayout = (WrappedComponent) => {
  function WithPublicLayout(props) {
    return <WrappedComponent {...props} />;
  }

  WithPublicLayout.getLayout = (page) => {
    return <PublicLayout>{page}</PublicLayout>;
  };

  return WithPublicLayout;
};

export default withPublicLayout;
