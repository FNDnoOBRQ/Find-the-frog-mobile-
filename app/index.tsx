
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View, BackHandler, Alert } from 'react-native';
import FrogImg from '@/components/FrogImg';
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';
import { useEffect, useRef, useState } from 'react';
import { frogData } from '@/components/frogData';
import { Frog } from '@/components/frogs';
import { Audio } from 'expo-av';

import { styles } from './style';

//sound of the clickedFog
const playFrogSound = async () => {
    let { sound } = await Audio.Sound.createAsync(
        require('@/assets/soundOfClickedForg.mp3')
    );
    await sound.playAsync();
};



type WinScreenProps = {
    points: number;
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
    const [score1, setScore1] = useState<Int32>(0);
    const [requireFrogs, setRequireFrogs] = useState(1);
    const [startScreen, showStartScreen] = useState<boolean>(true);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [difficulty, setDifficulty] = useState(1);
    const [difficultyStyles, setDifficultyStyles] = useState(["#3FFF00", "#4B0082", "Easy", "DejaVu Sans Mono, monospace"]);

    const pauseRef = useRef(false);
    const pauseGame = () => (pauseRef.current = true);
    const resume = () => (pauseRef.current = false);

    const toStartScreen = () => {
        setScore(0);
        setScore1(0);
        setFrogs([]);
        setGameOver(false);
        setIsPlaying(false);
        showStartScreen(true);
        pauseGame();
    };


    //frogs spawn interval
    useEffect(() => {
        if (score >= requireFrogs * 3 + 7) { setGameOver(true); }
        if (score1 >= 5) { setGameOver(true); }
    }, [score, score1, setGameOver, requireFrogs]);



    useEffect(() => {
        if (!isPlaying) return;

        function spawn() {
            if (pauseRef.current) return;

            setFrogs(prev => {
                if (prev.length >= 10) return prev;

                const newFrog = frogData(Date.now(), frogImages);
                return [...prev, newFrog];
            });

            const next = Math.random() * 3000 + (1000 / (requireFrogs * 2));
            setTimeout(spawn, next);
        }

        spawn();
    }, [isPlaying]);


    //frogs lifetime
    useEffect(() => {
        if (!isPlaying) return;

        const interval = setInterval(() => {
            setFrogs(prev => {
                const updated = prev.map(f => ({ ...f, time: f.time - 1000 }));
                const deadFrogs = updated.filter(f => f.time <= 0).length;
                if (deadFrogs > 0) {
                    setScore1(c => c + deadFrogs);
                }
                return updated.filter(f => f.time > 0);
            });

        }, 1000);

        return () => clearInterval(interval);
    }, [isPlaying, setFrogs]);




    function clickedFrog(id: number) {
        playFrogSound();
        setFrogs(prev => prev.filter(f => f.id !== id));
        setScore(prev => prev + 1);
    }



    //difficulty settings
    function changeDifficulty() {
        switch (difficulty) {
            case 1:
                setRequireFrogs(1);
                setDifficultyStyles(["#3FFF00", "#4B0082", "Easy", "DejaVu Sans Mono, monospace"]);
                break;
            case 2:
                setRequireFrogs(2);
                setDifficultyStyles(["#FFD800", "#0000B8", "Medium", "URW Chancery L, cursive"]);
                break;
            case 3:
                setRequireFrogs(3);
                setDifficultyStyles(["#ED1B24", "#FFFAFA", "Hard", "Trattatello, fantasy"]);
                break;
        }

        if (difficulty < 3) {
            setDifficulty(difficulty + 1);
        }
        else {
            setDifficulty(1);
        }


    }



    function WinScreen({ points }: WinScreenProps) {
        useEffect(() => {
            pauseGame();
        }, []);

        if (points == requireFrogs * 3 + 7) {
            return (
                <View style={styles.mainWinWindow}>
                    <Text style={{ flex: 1 }}></Text>
                    <Text style={styles.text}>Well done!</Text>
                    <Text style={styles.text}>You've caught {points} frogs</Text>
                    <Text style={{ flex: 2 }}></Text>
                    <Pressable onPress={() => { alert("Sorry, This function is in progress. Please wait for a moderner version") }} style={[styles.button, { backgroundColor: 'grey' }]}><Text style={{ textAlign: 'center', lineHeight: 30, fontSize: 20 }}>Restart</Text></Pressable>
                    <Text style={{ flex: 1 }}></Text>
                    <Pressable onPress={toStartScreen} style={styles.button}><Text style={{ textAlign: 'center', lineHeight: 30, fontSize: 20 }}>Exit level</Text></Pressable>
                    <Text style={{ flex: 1 }}></Text>
                </View>
            )
        }
        else {
            return (
                <View style={styles.mainWinWindow}>
                    <Text style={{ flex: 1 }}></Text>
                    <Text style={styles.text}>Computer wins</Text>
                    <Text style={styles.text}>Try again next time</Text>
                    <Text style={{ flex: 2 }}></Text>
                    <Pressable onPress={() => { alert("Sorry, This function is in progress. Please wait for a moderner version") }} style={[styles.button, { backgroundColor: 'grey' }]}><Text style={{ textAlign: 'center', lineHeight: 30, fontSize: 20 }}>Restart</Text></Pressable>
                    <Text style={{ flex: 1 }}></Text>
                    <Pressable onPress={toStartScreen} style={styles.button}><Text style={{ textAlign: 'center', lineHeight: 30, fontSize: 20 }}>Exit level</Text></Pressable>
                    <Text style={{ flex: 1 }}></Text>
                </View>
            )
        }
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
                <Text style={{ flex: 1 }}></Text>< Pressable onPress={changeDifficulty} style={[styles.sButton, { backgroundColor: difficultyStyles[0] }]}><Text style={{ textAlign: 'center', lineHeight: 40, fontSize: 20, color: difficultyStyles[1], fontFamily: difficultyStyles[3] }}>{difficultyStyles[2]}</Text></Pressable>
                <Text style={{ flex: 1 }}></Text>< Pressable onPress={() => BackHandler.exitApp()} style={styles.sButton}><Text style={{ textAlign: 'center', lineHeight: 40, fontSize: 20 }}>Exit game</Text></Pressable>
                <Text style={{ flex: 1 }}></Text>
            </View>
        )
    }


    return (
        <>
            <Image source={require('@/assets/images/fullbackground.png')} style={styles.backGorundImage} />
            <Image source={require('@/assets/images/fullfrontground.png')} style={styles.backGorundImage} />
            <Text style={styles.score}>x{score}</Text>
            <Text style={styles.score1}>x{score1}</Text>

            {startScreen && <StartScreen onStart={() => { setIsPlaying(true); showStartScreen(false); }} />}
            {gameOver && <WinScreen points={score} />}

            {frogs.map(frog => (
                <FrogImg key={frog.id} frog={frog} onPress={clickedFrog} />
            ))}
        </>
    );


}

