import {useNavigation} from '@react-navigation/native';
import {ChevronLeftIcon, HStack, IconButton, Text} from 'native-base';
import React from 'react';
import {EllipsisVerticalIcon} from 'react-native-heroicons/outline';

interface HeaderProps {
  title: string;
}

export function Header({title}: HeaderProps) {
  const navigation = useNavigation();
  return (
    <HStack alignItems={'center'} bgColor={'dark.50'} height={16} px={4}>
      {navigation.canGoBack() && (
        <IconButton
          icon={<ChevronLeftIcon />}
          onPress={navigation.goBack}
          ml={-4}
        />
      )}
      <Text flex={1} color="white" fontSize={20} bold>
        {title}
      </Text>
      <EllipsisVerticalIcon color="white" />
    </HStack>
  );
}
