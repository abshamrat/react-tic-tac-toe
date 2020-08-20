import '@testing-library/jest-dom';
import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { renderWithState } from '../../utils/TestingUtils';
import App from '../../views/App';
import { configureStore } from '../../redux/store';
import { fetchMock } from '../../__mock__/fetch.mock';

const { store, sessionId } = configureStore({})

const apiBaseUrl = 'http://localhost:4000';
const playerOneText = 'clear';
const playerTwoText = 'panorama_fish_eye';
const playerTitle = {1: 'Player: 1 (x)', 2: 'Player: 2 (o)'};
const logMessage = (player, row, col) => `${playerTitle[player]} move row: ${row}, col: ${col}`;


// Running the mock server before all test
beforeAll(() => fetchMock
  .get(`${apiBaseUrl}//v1/action-logs/${sessionId}`)
  .reply({data: [{logMessage: logMessage(1, 0, 0)}]})
);

// Clearing the mock server before all test
afterAll(() => {
  fetchMock.clear();
})

/**
 * Rendering game component before each test
 */
beforeEach(() => {
  // Rendering the App view with an initial state.
  renderWithState(<App />, store);
});

describe('Tic Tac Toe ', () => {
  test('Game loaded and default text are displayed.', () => { 
    // All the static texts
    const expectedTexts = [
      'Tic Tac Toe',
      'Player: 1 (x)',
      'Action Logs'
    ];
    // Iterating to the text to assert
    expectedTexts.forEach((expected) => {
      expect(screen.getByText(expected)).toBeInTheDocument();
    })
  });
  
  test('Show the player-1 symbol to the clicked cell', async ()=> {
    // Taking the first cell to click
    const gameCell00 = screen.getByTestId('0-0');
    // Clicking on the cell
    await userEvent.click(gameCell00);
    // We should se the player 1 icon to the dom.
    expect(screen.getByText(playerOneText)).toBeInTheDocument();
    // As player 1 clicked on the cell so it should not show player 2 symbol.
    expect(screen.queryByText(playerTwoText)).not.toBeInTheDocument();

  }); 
  test('Turn moved to the player-2', ()=> {
    expect(screen.getByText(playerTitle[2])).toBeInTheDocument();
  });
  // Getting the api response and showing the logs
  test('Should show the action log', ()=> {
    expect(screen.getByText(logMessage(1, 0, 0))).toBeInTheDocument();
  });
});

// Testing re-rendering our app should restore the redux state where we leave
describe('Re-render the app', () => {
  test('Should restore the state', ()=> {
    // Asserting the previous state to see if it resumes the state or not
    expect(screen.getByText(playerOneText)).toBeInTheDocument();
    expect(screen.getByText(playerTitle[2])).toBeInTheDocument();
    expect(screen.getByText(logMessage(1, 0, 0))).toBeInTheDocument();
  });
});

// if session re-stored so now testing player-2 move
describe('Play-2 Actions', () => {
  test('Should show the player-2 symbol to the clicked cell', async ()=> {
    // Taking the  first row second cell
    const gameCell01 = screen.getByTestId('0-1');
    await userEvent.click(gameCell01);
    // We should se the player 2 icon to the dom.
    expect(screen.getByText(playerTwoText)).toBeInTheDocument();

  }); 
});

// We made do couple of more test to be able to -
// coverage all other user actions