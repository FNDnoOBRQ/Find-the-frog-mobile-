import { StyleSheet } from 'react-native';

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
        top: "60%",
        flex: 5,
        height: 'auto',
        width: 200,
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
    enemyScore: {
        marginBottom: 1,
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 70,
        height: 40,
        lineHeight: 37,
        textAlign: 'center',
        fontSize: 30,
        borderStyle: 'solid',
        borderWidth: 4,
        borderColor: 'crimson',
        color: 'red',
        backgroundColor: '#0cb6d47e',
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

        backgroundColor: "#08e275ea",
        borderColor: "#191970",
        borderWidth: 5,
        borderStyle: "solid",
        borderRadius: 25,

        zIndex: 3,
        padding: 10,
    },

    text: {
        flex: 3,
        color: "#FFA500",
        width: "100%",
        height: 10,
        fontFamily: 'OCR A Std, monospace',
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 20,
    },
    buttonText: {
        flex: 3,
        color: "#0000CD",
        width: "100%",
        height: 10,
        fontFamily: 'OCR A Std, monospace',
        fontSize: 20,
        textAlign: 'center',
        lineHeight: 19,
    },

    button: {
        flex: 2,
        zIndex: 4,
        backgroundColor: '#FF8C00',
        borderColor: '#0711a3ff',
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 10,
        width: "100%",
        height: "15%",
        padding: 5,
    },


    // Lose screen settings

    loseMainWinWindow: {
        position: 'absolute',
        flexDirection: 'column',

        width: 225,
        height: 300,
        left: 300,
        top: 75,

        backgroundColor: "#08e275ea",
        borderColor: "#191970",
        borderWidth: 5,
        borderStyle: "solid",
        borderRadius: 25,

        zIndex: 3,
        padding: 10,
    },

    loseText: {
        flex: 3,
        color: "#CE2029",
        width: "100%",
        height: 10,
        fontFamily: 'DejaVu Sans Mono, monospace',
        fontSize: 19,
        textAlign: 'center',
        lineHeight: 20,
    },

    loseButtonText: {
        flex: 3,
        color: "#FFA000",
        width: "100%",
        height: 10,
        fontFamily: 'DejaVu Sans Mono, monospace',
        fontSize: 19,
        textAlign: 'center',
        lineHeight: 20,
    },


    loseButton: {
        flex: 2,
        zIndex: 4,
        backgroundColor: '#00B9E8',
        borderColor: '#E25822',
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
        fontFamily: 'Bradley Hand, cursive',
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
    }
}); 
