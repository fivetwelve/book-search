import { render, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';

// //test block
// test('Tests app', () => {
//   // render the component on virtual dom
//   render(<App />);

//   //select the elements you want to interact with
//   const searchButton = screen.getByTestId('searchButton');
//   // const sortAlphaButton = screen.getByTestId('sortAlphaButton');
//   // const sortDateButton = screen.getByTestId('sortDateButton');

//   //interact with those elements
//   fireEvent.click(searchButton);

//   //assert the expected result
//   expect(counter).toHaveTextContent('1');
// });

describe('App', () => {
  test('renders the App component', () => {
    render(<App />);
  });
});

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
// });
