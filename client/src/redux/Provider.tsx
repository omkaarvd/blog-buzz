import { Provider } from 'react-redux';

import React from 'react';
import { store } from './Store';

export const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};
