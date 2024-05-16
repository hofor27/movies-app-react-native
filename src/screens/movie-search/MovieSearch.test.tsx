import React from 'react';

import SearchScreen from './MovieSearch';
import {render} from '../../jest/testUtils';

test('Render movie search screen correctly', async () => {
  const screen = render(<SearchScreen />);
  const element = await screen.findByTestId('Movie-Search');
  expect(element).toBeDefined();
  const image = await screen.findByTestId('movie-image-447277');
  expect(image).toBeDefined();
});
