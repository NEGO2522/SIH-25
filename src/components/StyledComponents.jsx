import React from 'react';
import { Global as StyledGlobal } from '@emotion/react';

export const Global = ({ styles }) => (
  <StyledGlobal styles={styles} />
);

export const JSX = ({ children, ...props }) => {
  // Filter out the 'jsx' prop to prevent it from being passed to the DOM
  const { jsx, ...filteredProps } = props;
  return <div {...filteredProps}>{children}</div>;
};
