  
import { Provider } from 'react-redux';
import React from 'react';
import { render } from '@testing-library/react';

export function renderWithState(children, st) {
  return render(<Provider store={st}>{children}</Provider>);
}