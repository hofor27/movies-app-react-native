const mockedMovies = [
  {
    adult: false,
    backdrop_path: '/fCw8CVgII6W7ALbIh0SgXax3Hsj.jpg',
    genre_ids: [12, 10751, 14, 10749],
    id: 447277,
    original_language: 'en',
    original_title: 'The Little Mermaid',
    overview:
      'The youngest of King Triton’s daughters, and the most defiant, Ariel longs to find out more about the world beyond the sea, and while visiting the surface, falls for the dashing Prince Eric. With mermaids forbidden to interact with humans, Ariel makes a deal with the evil sea witch, Ursula, which gives her a chance to experience life on land, but ultimately places her life – and her father’s crown – in jeopardy.',
    popularity: 757.23,
    poster_path: '/ym1dxyOk4jFcSl4Q2zmRrA5BEEN.jpg',
    release_date: '2023-05-18',
    title: 'The Little Mermaid',
    video: false,
    vote_average: 6.3,
    vote_count: 895,
  },
  {
    adult: false,
    backdrop_path: '/vw3zNfzvnVNF7nIjpiEgcdznfeC.jpg',
    genre_ids: [16, 28, 14],
    id: 664767,
    original_language: 'en',
    original_title: "Mortal Kombat Legends: Scorpion's Revenge",
    overview:
      'After the vicious slaughter of his family by stone-cold mercenary Sub-Zero, Hanzo Hasashi is exiled to the torturous Netherrealm. There, in exchange for his servitude to the sinister Quan Chi, he’s given a chance to avenge his family – and is resurrected as Scorpion, a lost soul bent on revenge. Back on Earthrealm, Lord Raiden gathers a team of elite warriors – Shaolin monk Liu Kang, Special Forces officer Sonya Blade and action star Johnny Cage – an unlikely band of heroes with one chance to save humanity. To do this, they must defeat Shang Tsung’s horde of Outworld gladiators and reign over the Mortal Kombat tournament.',
    popularity: 728.044,
    poster_path: '/4VlXER3FImHeFuUjBShFamhIp9M.jpg',
    release_date: '2020-04-12',
    title: "Mortal Kombat Legends: Scorpion's Revenge",
    video: false,
    vote_average: 8.2,
    vote_count: 1246,
  },
];

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(() => ({
      canGoBack: () => true,
    })),
    useRoute: () => ({
      params: {
        movieId: '447277',
      },
    }),
  };
});

jest.mock('@tanstack/react-query', () => {
  return {
    ...jest.requireActual('@tanstack/react-query'),
    useQuery: (key, func) => {
      if (key.includes('GET_POPULAR_MOVIES')) {
        return {
          data: mockedMovies,
          isLoading: false,
          isError: false,
          isFetched: true,
        };
      }
      if (key.includes('GET_MOVIE_DETAILS')) {
        return {
          data: mockedMovies[0],
          isLoading: false,
          isError: false,
          isFetched: true,
        };
      }
    },
  };
});
