
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View, BackHandler, Alert } from 'react-native'; import FrogImg from '@/components/FrogImg';
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';
import { useEffect, useRef, useState } from 'react';
import { frogData } from '@/components/frogData';
import { Frog } from '@/components/frogs';
import { Audio } from 'expo-av';

//sound of the clickedFog
const playFrogSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
        require('@/assets/soundOfClickedForg.mp3')
    );
    await sound.playAsync();
};

export default function HomeScreen() {
    const frogImages: ImageSourcePropType[] = [
        require('@/assets/images/frog1.png'),
        require('@/assets/images/frog2.png'),
        require('@/assets/images/frog3.png'),
        require('@/assets/images/frog4.png'),
        require('@/assets/images/frog5.png'),
        require('@/assets/images/frog6.png'),
        require('@/assets/images/frog7.png'),
    ];
    const [frogs, setFrogs] = useState<Frog[]>([]);
    const [score, setScore] = useState<Int32>(0);
    const [startScreen, showStartScreen] = useState<boolean>(true);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const pauseRef = useRef(false);
    const pauseGame = () => (pauseRef.current = true);
    const resume = () => (pauseRef.current = false);


    function clickedFrog(id: number) {
        playFrogSound();
        setFrogs(prev => prev.filter(f => f.id !== id));
        setScore(prev => prev + 1);
    }


    //frogs spawn interval
    useEffect(() => {
        if (score > 9) { setGameOver(true); }
    }, [score]);

    useEffect(() => {
        if (!isPlaying) return;

        function spawn() {
            if (pauseRef.current) return;

            setFrogs(prev => {
                if (prev.length >= 10) return prev;

                const newFrog = frogData(Date.now(), frogImages);
                return [...prev, newFrog];
            });

            const next = Math.random() * 3000 + 1000;
            setTimeout(spawn, next);
        }

        spawn();
    }, [isPlaying]);


    //frogs lifetime
    useEffect(() => {
        if (!isPlaying) return;

        const interval = setInterval(() => {
            setFrogs(prev =>
                prev.map(f => ({ ...f, time: f.time - 1000 })).filter(f => f.time > 0)
            );
        }, 1000);

        return () => clearInterval(interval);
    }, [isPlaying]);

    const toStartScreen = () => {
        setScore(0);
        setFrogs([]);
        setGameOver(false);
        setIsPlaying(false);
        showStartScreen(true);
        pauseGame();
    };

    //main return function
    return (
        <>
            <Image source={require('@/assets/images/fullbackground.png')} style={styles.backGorundImage} />
            <Image source={require('@/assets/images/fullfrontground.png')} style={styles.backGorundImage} />
            <Text style={styles.score}>x{score}</Text>

            {startScreen && <StartScreen onStart={() => { setIsPlaying(true); showStartScreen(false); }} />}
            {gameOver && <WinScreen points={score} />}

            {frogs.map(frog => (
                <FrogImg key={frog.id} frog={frog} onPress={clickedFrog} />
            ))}
        </>
    );




    //additional displays
    type WinScreenProps = {
        points: number;
    };
    function WinScreen({ points }: WinScreenProps) {
        useEffect(() => {
            pauseGame();
        }, []);
        return (
            <View style={styles.mainWinWindow}>
                <Text style={{ flex: 1 }}></Text>
                <Text style={styles.text}>Well done!</Text>
                <Text style={styles.text}>You've caught {points} frogs</Text>
                <Text style={{ flex: 2 }}></Text>
                <Pressable onPress={()=>{alert("Sorry, This function is in progress. Please wait for a moderner version")}} style={[styles.button, {backgroundColor: 'grey'}]}><Text style={{ textAlign: 'center', lineHeight: 30, fontSize: 20 }}>Restart</Text></Pressable>
                <Text style={{ flex: 1 }}></Text>
                <Pressable onPress={toStartScreen} style={styles.button}><Text style={{ textAlign: 'center', lineHeight: 30, fontSize: 20 }}>Exit level</Text></Pressable>
                <Text style={{ flex: 1 }}></Text>
            </View>
        )
    }


    function StartScreen({ onStart }: { onStart: () => void }) {
        useEffect(() => {
            pauseGame();
        }, []);
        return (
            <View style={styles.mainStartWindow}>
                <Text style={[styles.sText, styles.mainText]}>Find the frog!</Text>
                <Text style={styles.sText}>Select the difficulty and play:</Text>
                <Text style={{ flex: 1 }}></Text><Pressable onPress={() => { onStart(); resume(); }} style={styles.sButton} ><Text style={{ textAlign: 'center', lineHeight: 40, fontSize: 20 }}>Play</Text></Pressable>
                <Text style={{ flex: 1 }}></Text>< Pressable onPress={() => { alert("Sorry, This function is in progress. Please wait for a moderner version") }} style={[styles.sButton, styles.chooseDifficulty]}><Text style={{ textAlign: 'center', lineHeight: 40, fontSize: 20 }}>Easy</Text></Pressable>
                <Text style={{ flex: 1 }}></Text>< Pressable onPress={() => BackHandler.exitApp()} style={styles.sButton}><Text style={{ textAlign: 'center', lineHeight: 40, fontSize: 20 }}>Exit game</Text></Pressable>
                <Text style={{ flex: 1 }}></Text>
            </View>
        )
    }
}






export const styles = StyleSheet.create({
    backGorundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -2,
    },
    frogImage: {
        position: 'absolute',
        zIndex: 5,
        top: "60%",
        flex: 5,
        height: 'auto',
        width: 120,
    },
    score: {
        marginBottom: 1,
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: 70,
        height: 40,
        lineHeight: 37,
        textAlign: 'center',
        fontSize: 30,
        borderStyle: 'solid',
        borderWidth: 4,
        borderColor: 'yellow',
        color: 'yellow',
        backgroundColor: '#98d40c93',
        zIndex: 10,
    },

    //Win screen styles
    mainWinWindow: {
        position: 'absolute',
        flexDirection: 'column',

        width: 225,
        height: 300,
        left: 300,
        top: 75,

        backgroundColor: "#ebeae8ff",
        color: "ghostwhite",

        borderColor: "#80FF00",
        borderWidth: 3,
        borderStyle: "solid",
        borderRadius: 20,

        zIndex: 3,
        padding: 10,
    },

    text: {
        flex: 3,
        color: "#003262",
        width: "100%",
        height: 10,
        fontFamily: 'monospace',
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 20,
    },

    button: {
        flex: 2,
        zIndex: 4,
        backgroundColor: '#FF7900',
        color: '#242423',
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 10,
        width: "100%",
        height: "15%",
        padding: 5,
    },




    //start screen settings

    mainStartWindow: {
        position: 'absolute',
        flexDirection: 'column',

        width: 275,
        height: 420,
        left: "35%",
        top: 5,

        backgroundColor: "#ebeae8ff",
        color: "ghostwhite",

        borderColor: "#80FF00",
        borderWidth: 3,
        borderStyle: "solid",
        borderRadius: 20,

        zIndex: 3,
        padding: 10,
    },

    sText: {
        flex: 2,
        color: "#003262",
        width: "100%",
        height: 10,
        fontFamily: 'monospace',
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 17,
    },
    mainText: {
        textTransform: 'uppercase',
        fontWeight: 900,
    },

    sButton: {
        flex: 2,
        zIndex: 4,
        backgroundColor: '#FF7900',
        color: '#242423',
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 10,
        width: "100%",
        height: "15%",
        padding: 5,
    },
    chooseDifficulty: {
        backgroundColor: "grey",
        color: "grey"
    }
});
