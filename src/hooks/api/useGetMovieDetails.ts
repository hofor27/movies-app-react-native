import {useQuery} from '@tanstack/react-query';
import {useContext} from 'react';
import Config from 'react-native-config';

import {AxiosContext} from '../../context/Axios';
import {Movie} from '../../types/api.type';
import {ReactQueryKeys} from '../../types/reactquery.type';

const useGetMovieDetails = (movieId: number) => {
  const axios = useContext(AxiosContext);
  const {API_KEY} = Config;
  return useQuery([ReactQueryKeys.GET_MOVIE_DETAILS, movieId], async () => {
    const response = await axios.api.get<Movie>(
      `movie/${movieId}?api_key=${API_KEY}`,
    );
    return response.data;
  });
};

export default useGetMovieDetails;
