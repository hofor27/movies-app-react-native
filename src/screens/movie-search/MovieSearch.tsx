import {useNavigation} from '@react-navigation/native';
import {Box, FlatList, Spinner, Text} from 'native-base';
import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import Config from 'react-native-config';

import {APP_IMAGES} from '../../../assets/images';
import {Header} from '../../components';
import useGetMovies from '../../hooks/api/useGetMovies';
import {SearchScreenNavigationProp} from '../../navigation/RootNavigator';
import {Movie} from '../../types/api.type';

function SearchScreen() {
  const [page, setPage] = useState(1);
  const [endReached, setEndReached] = useState(false);
  const [movieList, setMovieList] = useState<Movie[][]>([]);

  const navigation = useNavigation<SearchScreenNavigationProp>();
  const {data, isLoading, isFetched, isError} = useGetMovies(page);

  useEffect(() => {
    if (isFetched && data && !isError) {
      movieList[page - 1] = data;
      setMovieList([...movieList]);
      if (data.length < 20) {
        setEndReached(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetched, data, isError]);

  const getMovieList = useMemo(() => {
    let list: Movie[] = [];
    for (let i = 0; i < page; i++) {
      list = list.concat(movieList[i] || []);
    }
    return list;
  }, [movieList, page]);

  const loadMoreMovies = () => {
    if (endReached || isLoading || !getMovieList.length) {
      return;
    }
    setPage(page + 1);
  };

  const onPressMovieItem = (item: Movie) => {
    navigation.navigate('Details', {movieId: item.id});
  };

  const renderMovieItem = ({item}: {item: Movie}) => {
    return (
      <TouchableOpacity
        onPress={() => onPressMovieItem(item)}
        style={styles.movieItemWrapper}>
        <Image
          source={{uri: `${Config.IMAGE_ROOT_PATH}${item.poster_path}`}}
          defaultSource={APP_IMAGES.defaultMovie}
          style={styles.movie}
          testID={`movie-image-${item.id}`}
        />
      </TouchableOpacity>
    );
  };

  const renderListEmpty = () => {
    if (isLoading) return null;
    if (isError) return <Text textAlign={'center'}>Error occured</Text>;
    else return <Text textAlign={'center'}>No movies</Text>;
  };

  const renderListFooter = () => {
    if (endReached) return <Text textAlign={'center'}>End reached</Text>;
    else if (isLoading) return <Spinner mt={5} />;
    return null;
  };

  return (
    <Box flex={1} testID="Movie-Search">
      <Header title="Pop Movies" />
      <FlatList
        ListEmptyComponent={renderListEmpty}
        ListFooterComponent={renderListFooter}
        data={getMovieList}
        renderItem={renderMovieItem}
        numColumns={2}
        onEndReachedThreshold={0.5}
        onEndReached={loadMoreMovies}
        contentContainerStyle={styles.scroll}
      />
    </Box>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingBottom: 100,
  },
  movieItemWrapper: {
    width: '50%',
  },
  movie: {
    width: '100%',
    paddingBottom: '160%',
    resizeMode: 'cover',
  },
});

export default SearchScreen;
