import clickSound from "../../assets/sounds/click.mp3";
import loseSounf from "../../assets/sounds/lose.mp3";
import winSound from "../../assets/sounds/win.mp3";
import bgSound from "../../assets/sounds/bg-loop.mp3";
import hoverSound from "../../assets/sounds/hover.mp3";
import wrongSound from "../../assets/sounds/wrong.mp3";
import correctSound from "../../assets/sounds/correct.mp3";


// Volume değerleri
let sfxVolume = 1;   // efekt sesleri
let musicVolume = 0.5; // müzik sesi

// Tek seferde cache’lenen sesler
const clickAudio = new Audio(clickSound);
const loseAudio = new Audio(loseSounf);
const winAudio = new Audio(winSound);
const hoverAudio = new Audio(hoverSound);
const wrongAudio = new Audio(wrongSound);
const correctAudio = new Audio(correctSound);


// Background music özel obje
const bgAudio = new Audio(bgSound);
bgAudio.loop = true;
bgAudio.volume = musicVolume;

// Genel play fonksiyonu 
const play = (audio: HTMLAudioElement) => {
    audio.volume = sfxVolume;
    audio.currentTime = 0;
    audio.play();
};

// ses bittikten sonra diğer işlemler yapılsın diye ses çalma işini asyn await yapıyorum
const playAsync = (audio: HTMLAudioElement) => {
    return new Promise<void>((resolve) => {
        audio.volume = sfxVolume;
        audio.currentTime = 0;
        audio.play();

        audio.onended = () => {
            resolve();
        };
    });
};

export const Sounds = {

    // Efekt sesleri
    click: () => play(clickAudio),
    clickAsync: () => playAsync(clickAudio),

    lose: () => play(loseAudio),
    loseAsync: () => playAsync(loseAudio),

    win: () => play(winAudio),
    winAsync: () => playAsync(winAudio),

    hover: () => { play(hoverAudio); },
    hoverAsync: () => playAsync(hoverAudio),

    wrong: () => play(wrongAudio),
    wrongAsync: () => playAsync(wrongAudio),

    correct: () => play(correctAudio),
    correctAsync: () => playAsync(correctAudio),

    // Müzik kontrolü
    bgStart: () => {
        bgAudio.volume = musicVolume;
        bgAudio.currentTime = 0;
        bgAudio.play();
    },
    bgStop: () => bgAudio.pause(),

    // 0 - 1 arası olacak 
    setSfxVolume: (v: number) => {
        sfxVolume = v;
    },

    setMusicVolume: (v: number) => {
        musicVolume = v;
        bgAudio.volume = v;
    },


    getSfxVolume: () => sfxVolume,       // 0–1 arasında
    getMusicVolume: () => musicVolume,   // 0–1 arasında
};