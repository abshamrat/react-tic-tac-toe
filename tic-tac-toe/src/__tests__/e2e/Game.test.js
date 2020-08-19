import '@testing-library/jest-dom';
import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithState } from '../../utils/TestingUtils';
import App from '../../views/App';
import { configureStore } from '../../redux/store';


const { store } = configureStore({})

/**
 * Rendering game component before each test
 */
beforeEach(() => {
  renderWithState(<App />, store);
});

test('App loaded and default text are displayed.', () => { 
  const expectedTexts = [
    'Tic Tac Toe',
    'Player: 1 (x)',
    'Action Logs'
  ];
  expectedTexts.forEach((expected) => {
    expect(screen.getByText(expected)).toBeInTheDocument();
  })
});
