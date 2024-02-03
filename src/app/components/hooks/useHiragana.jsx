'use client'

import { useRef, useState, useEffect } from 'react';
import { hiraganas } from '../Hiraganas';

export const useHiragana = () => {

    const splineRef = useRef();
    const recentHiraganas = useRef([]);
    const queueSize = hiraganas.queueSize.base;
    const hiraganaKeys = Object.keys(hiraganas.base);

    const [buttonTexts, setButtonTexts] = useState([]);
    const [currentHiragana, setCurrentHiragana] = useState('あ');
    const [selectedButton, setSelectedButton] = useState(null);
    const [buttonStyle, setButtonStyle] = useState("rounded-2xl bg-white/10 px-5 py-4 text-3xl font-semibold text-white shadow-sm hover:bg-white/20 ms-10");
    const [hardMode, setHardMode] = useState(false);
    const [currentDifficulty, setCurrentDifficulty] = useState(3);
    const [sorted, setSorted] = useState(false);
    const [listDisplayed, setListDisplayed] = useState(false);

    useEffect(() => {
        updateButtonHiraganas(currentHiragana, hardMode ? 'hard' : 'easy', currentDifficulty);
    }, [currentHiragana, hardMode, currentDifficulty, listDisplayed]);

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const onLoad = (spline) => {
        splineRef.current = spline;
        nextHiragana();
    };

    const updateButtonHiraganas = (currentHiraganaKey, mode, difficulty) => {

        let newButtonTexts = [];
        const correctAnswer = hiraganas.base[currentHiraganaKey];
        newButtonTexts.push(correctAnswer);

        while ((newButtonTexts.length + hiraganas.mode.base[mode]) < (hiraganas.mode.base[mode] + difficulty)) {
            const randomIndex = Math.floor(Math.random() * hiraganaKeys.length);
            const hiraganaValue = hiraganas.base[hiraganaKeys[randomIndex]];

            if (!newButtonTexts.includes(hiraganaValue)) {
                newButtonTexts.push(hiraganaValue);
            }
        }

        newButtonTexts = newButtonTexts.sort(() => 0.5 - Math.random());
        setButtonTexts(newButtonTexts);
    };

    const nextHiragana = () => {
        if (splineRef.current) {
            let randomHiragana;
            do {
                const randomIndex = Math.floor(Math.random() * hiraganaKeys.length);
                randomHiragana = hiraganaKeys[randomIndex];
            } while (recentHiraganas.current.includes(randomHiragana));

            recentHiraganas.current.push(randomHiragana);
            if (recentHiraganas.current.length > queueSize) {
                recentHiraganas.current.shift();
            }
            splineRef.current.setVariable('Hiragana', randomHiragana);
            setCurrentHiragana(randomHiragana);
            updateButtonHiraganas(randomHiragana, hardMode ? 'hard' : 'easy', currentDifficulty);
        } else {
            console.error('Spline object not found...');
        }
    };

    const handleClick = (event, index) => {
        const buttonText = event.target.textContent;
        submitAnswer(buttonText, index);
    };

    const submitAnswer = (answer, buttonIndex) => {
        const isCorrect = hiraganas.base[currentHiragana] === answer;
        isCorrect ? correct() : incorrect(buttonIndex);
    };

    const correct = () => {
        nextHiragana();
    };

    const incorrect = (buttonIndex) => {
        setSelectedButton(buttonIndex);
        setButtonStyle("rounded-2xl bg-red-500 px-5 py-4 text-3xl font-semibold text-white shadow-sm hover:bg-red-600 ms-3 me-3");

        setTimeout(() => {
            setButtonStyle("rounded-2xl bg-white/10 px-5 py-4 text-3xl font-semibold text-white shadow-sm hover:bg-white/20 ms-3 me-3");
            setSelectedButton(null);
        }, 400);
    };

    const handleModeChange = () => {
        const newMode = !hardMode;
        setHardMode(newMode);
        setCurrentDifficulty(newMode ? 5 : 3);
        updateButtonHiraganas(currentHiragana, newMode ? 'hard' : 'easy', newMode ? 5 : 3);
    };

    const increaseDifficulty = () => {
        if (hardMode && currentDifficulty < hiraganas.mode.base.max) {
            const newDifficulty = currentDifficulty + 1;
            setCurrentDifficulty(newDifficulty);
            updateButtonHiraganas(currentHiragana, hardMode ? 'hard' : 'easy', newDifficulty);
        }
    };

    const decreaseDifficulty = () => {
        if (currentDifficulty > hiraganas.mode.base.easy) {
            const newDifficulty = currentDifficulty - 1;
            setCurrentDifficulty(newDifficulty);
            updateButtonHiraganas(currentHiragana, hardMode ? 'hard' : 'easy', newDifficulty);
        }
    };

    const handleSortedChange = () => {
        setSorted(!sorted);
    };

    const handleListDisplay = () => {
        setListDisplayed(!listDisplayed);
    };

    return {
        splineRef,
        buttonTexts,
        currentHiragana,
        selectedButton,
        buttonStyle,
        hardMode,
        currentDifficulty,
        sorted,
        listDisplayed,
        updateButtonHiraganas,
        nextHiragana,
        handleClick,
        submitAnswer,
        correct,
        incorrect,
        handleModeChange,
        increaseDifficulty,
        decreaseDifficulty,
        handleSortedChange,
        handleListDisplay,
        classNames,
        onLoad,
    };
};
