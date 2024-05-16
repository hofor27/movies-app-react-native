import React from 'react';

import DetailsScreen from './MovieDetails';
import {render} from '../../jest/testUtils';

test('Render movie detais correctly', async () => {
  const screen = render(<DetailsScreen />);
  const element = await screen.findByTestId('Movie-Details');
  expect(element).toBeDefined();
  const title = await screen.findByText('The Little Mermaid');
  expect(title).toBeDefined();
  const image = await screen.findByTestId('movie-details-image-447277');
  expect(image).toBeDefined();
  const releaseDate = await screen.findByText('2023-05-18');
  expect(releaseDate).toBeDefined();
  const score = await screen.findByText('6.3 / 10');
  expect(score).toBeDefined();
  const favoriteButton = await screen.findByText('Add to Favorite');
  expect(favoriteButton).toBeDefined();
});
