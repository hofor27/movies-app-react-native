import {useRoute} from '@react-navigation/native';
import {
  Box,
  Button,
  Center,
  HStack,
  ScrollView,
  Spinner,
  Text,
  VStack,
} from 'native-base';
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import Config from 'react-native-config';

import {APP_IMAGES} from '../../../assets/images';
import {Header} from '../../components';
import useGetMovieDetails from '../../hooks/api/useGetMovieDetails';
import {DetailsScreenRouteProp} from '../../navigation/RootNavigator';
import {ds} from '../../utils/responsive';

function DetailsScreen() {
  const route = useRoute<DetailsScreenRouteProp>();
  const {movieId} = route.params;
  const {data, isLoading} = useGetMovieDetails(movieId);

  return (
    <Box flex={1} testID="Movie-Details">
      <Header title="Movie Details" />
      {isLoading && (
        <Center flex={1}>
          <Spinner />
        </Center>
      )}
      {!isLoading && data && (
        <>
          <Box p={4} bgColor="gray.50">
            <Text color="white" fontSize={'md'}>
              {data.original_title}
            </Text>
          </Box>
          <ScrollView bgColor={'white'}>
            <HStack p={6}>
              <Image
                source={{uri: `${Config.IMAGE_ROOT_PATH}${data.poster_path}`}}
                defaultSource={APP_IMAGES.defaultMovie}
                style={styles.image}
                testID={`movie-details-image-${data.id}`}
              />
              <VStack flex={1} ml={6} justifyContent="space-between">
                <Text color="black" fontSize={'md'}>
                  {data.release_date}
                </Text>
                <Text color="black" fontSize={'sm'} bold>
                  {data.vote_average} / 10
                </Text>
                <Button bgColor={'gray.50'} _text={{color: 'white'}}>
                  Add to Favorite
                </Button>
              </VStack>
            </HStack>
            <Text fontSize={'sm'} color={'gray.100'} px={6} lineHeight={24}>
              Every child comes into the world full of promise, and none more so
              than chappie: he is gifted, special, a prodigy. Chappie he is a
              robot.
            </Text>
          </ScrollView>
        </>
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  image: {
    width: ds(115),
    height: ds(175),
    resizeMode: 'cover',
  },
});

export default DetailsScreen;
