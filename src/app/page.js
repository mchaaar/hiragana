'use client'

import Spline from '@splinetool/react-spline';
import { useRef, useState, useEffect } from "react";
import { hiraganas } from './components/Hiraganas';
import { Switch } from '@headlessui/react';
import { PlusIcon } from '@heroicons/react/20/solid';
import { MinusIcon } from '@heroicons/react/20/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Home() {

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

  useEffect(() => {
    updateButtonHiraganas(currentHiragana, hardMode ? 'hard' : 'easy', currentDifficulty);
  }, []);

  function updateButtonHiraganas(currentHiraganaKey, mode, difficulty) {
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
  }

  function onLoad(spline) {
    splineRef.current = spline;
    nextHiragana();
  }

  function nextHiragana() {
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
  }

  function handleClick(event, index) {
    const buttonText = event.target.textContent;
    submitAnswer(buttonText, index);
  }

  function submitAnswer(answer, buttonIndex) {
    const isCorrect = hiraganas.base[currentHiragana] == answer;
    isCorrect ? correct() : incorrect(buttonIndex);
  }

  function correct(){
    nextHiragana();
  }

  function incorrect(buttonIndex) {
    setSelectedButton(buttonIndex);
    setButtonStyle("rounded-2xl bg-red-500 px-5 py-4 text-3xl font-semibold text-white shadow-sm hover:bg-red-600 ms-3 me-3");

    setTimeout(() => {
      setButtonStyle("rounded-2xl bg-white/10 px-5 py-4 text-3xl font-semibold text-white shadow-sm hover:bg-white/20 ms-3 me-3");
      setSelectedButton(null);
    }, 400);
  }

  function handleModeChange() {
    const newMode = !hardMode;
    setHardMode(newMode);
    setCurrentDifficulty(newMode ? 5 : 3);
    updateButtonHiraganas(currentHiragana, newMode ? 'hard' : 'easy', newMode ? 5 : 3);
  }

  function increaseDifficulty() {
    if (hardMode && currentDifficulty < hiraganas.mode.base.max){
      const newDifficulty = currentDifficulty + 1;
      setCurrentDifficulty(newDifficulty);
      updateButtonHiraganas(currentHiragana, hardMode ? 'hard' : 'easy', newDifficulty);
    }
  }

  function decreaseDifficulty() {
    if (currentDifficulty > hiraganas.mode.base.easy){
      const newDifficulty = currentDifficulty - 1;
      setCurrentDifficulty(newDifficulty);
      updateButtonHiraganas(currentHiragana, hardMode ? 'hard' : 'easy', newDifficulty);
    }
  }

  return (
    <main className="flex flex-col items-center">
      <Spline
        scene="https://prod.spline.design/BVpsusTnFqCtrLKj/scene.splinecode"
        className="w-full h-auto max-h-[1400px] md:max-h-[700px]"
        onLoad={onLoad}
      />
      <div className="mt-20 justify-center">
        {buttonTexts.map((text, index) => (
          <button
            key={index}
            type="button"
            onClick={(e) => handleClick(e, index)}
            className={selectedButton === index ? buttonStyle : "rounded-2xl bg-white/10 px-5 py-4 text-3xl font-semibold text-white shadow-sm hover:bg-white/20 ms-3 me-3"}
          >
            <span className="buttonText">{text}</span>
          </button>
        ))}
      </div>
      <div className='mt-20'>
        <Switch.Group as="div" className="flex items-center">
          {hardMode && (
            <button
              type="button"
              className="me-3 rounded-full bg-gray-600 p-1 text-white shadow-sm hover:bg-gray-500 hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800"
              onClick={decreaseDifficulty}
            >
              <MinusIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          )}
          <span className={hardMode ? 'text-gray-600 text-xl me-4 mb-1' : 'text-gray-200 text-xl me-4 mb-1'}>easy</span>
          <Switch
            checked={hardMode}
            onChange={handleModeChange}
            className={
              'bg-gray-600 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2'
            }
          >
            <span
              aria-hidden="true"
              className={classNames(
                hardMode ? 'translate-x-5' : 'translate-x-0',
                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-300 ease-in-out'
              )}
            />
          </Switch>
          <span className={hardMode ? 'text-gray-200 text-xl ms-4 mb-1' : 'text-gray-600 text-xl ms-4 mb-1'}>hard</span>
          {hardMode && (
            <button
              type="button"
              className="ms-3 rounded-full bg-gray-600 p-1 text-white shadow-sm hover:bg-gray-500 hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800"
              onClick={increaseDifficulty}
            >
              <PlusIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          )}
        </Switch.Group>
      </div>
    </main>
  );
}
