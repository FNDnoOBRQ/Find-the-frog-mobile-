import { ImageSourcePropType } from 'react-native';

export interface Frog {
    id: number;
    active: boolean;
    time: number;
    image: ImageSourcePropType;
    x: number;
    y: number;
}
