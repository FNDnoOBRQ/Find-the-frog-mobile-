import { Dimensions, ImageSourcePropType } from 'react-native';
import { Frog } from '@/components/frogs';
const { width, height } = Dimensions.get('window');
import {Audio} from 'expo-av'; 


const playFrogSound = async () => {
  const { sound } = await Audio.Sound.createAsync(
    require('@/assets/frog-croak.mp3')
  );
  await sound.playAsync();
};

export function frogData(id: number, frogImages: ImageSourcePropType[]): Frog {
    playFrogSound();
    const spawnPosition: number[][] = [[13, 25], [28, 72], [45, 17], [52, -2], [65, 17], [58, 37], [75, 74],[53, 82],[73, -3]];
    const randomPosition = Math.floor(Math.random() * spawnPosition.length);

    return {
        id,
        active: true,
        time: Math.floor(Math.random() * 200 + 1500),
        image: frogImages[Math.floor(Math.random() * frogImages.length)],
        x: spawnPosition[randomPosition][0],
        y: spawnPosition[randomPosition][1],
    };
}
 