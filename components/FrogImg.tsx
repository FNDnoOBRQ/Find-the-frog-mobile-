import { Pressable, Image, ImageSourcePropType } from 'react-native';
import { Frog } from '@/components/frogs';

interface FrogImgProps {
    frog: Frog;
    onPress: (id: number) => void;
}

export default function FrogImg({ frog, onPress }: FrogImgProps) {

    return (
        <Pressable
            onPress={() => onPress(frog.id)}
            style={{
                position: 'absolute',
                top: `${frog.y}%`,
                left: `${frog.x}%`,
                zIndex: 5,
            }}
        >
            <Image
                source={frog.image as ImageSourcePropType}
                style={{ width: 80, height: 90 }}
            />
        </Pressable>
    );
}
