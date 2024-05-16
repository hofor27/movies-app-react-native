import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const designDeviceWidth = 375;

export const DeviceWidth = width;
export const DeviceHeight = height;
export const ds = (value: number) => (DeviceWidth * value) / designDeviceWidth;
