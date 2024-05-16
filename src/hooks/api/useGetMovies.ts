import {useQuery} from '@tanstack/react-query';
import {useContext} from 'react';
import Config from 'react-native-config';

import {AxiosContext} from '../../context/Axios';
import {Movie} from '../../types/api.type';
import {ReactQueryKeys} from '../../types/reactquery.type';

interface IResponse {
  results: Movie[];
}

const useGetMovies = (page: number) => {
  const axios = useContext(AxiosContext);
  const {API_KEY} = Config;
  return useQuery([ReactQueryKeys.GET_POPULAR_MOVIES, page], async () => {
    const response = await axios.api.get<IResponse>(
      `movie/popular?api_key=${API_KEY}&page=${page}`,
    );
    return response.data.results || [];
  });
};

export default useGetMovies;
