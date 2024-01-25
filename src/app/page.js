'use client'

import Spline from '@splinetool/react-spline';
import { useRef, useState, useEffect } from "react";
import { hiraganas } from './components/Hiraganas';

export default function Home() {

  const splineRef = useRef();
  const recentHiraganas = useRef([]);
  const queueSize = hiraganas.queueSize.base;
  const hiraganaKeys = Object.keys(hiraganas.base);
  const [buttonTexts, setButtonTexts] = useState([]);
  const [currentHiragana, setCurrentHiragana] = useState('あ');

  useEffect(() => {
    updateButtonHiraganas();
  }, []);

  function updateButtonHiraganas(currentHiraganaKey) {
    let newButtonTexts = [];
    const correctAnswer = hiraganas.base[currentHiraganaKey];
    newButtonTexts.push(correctAnswer);

    while (newButtonTexts.length < 3) {
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
      updateButtonHiraganas(randomHiragana);
    } else {
      console.error('Spline object not found...');
    }
  }

  function handleClick(event) {
    const buttonText = event.target.textContent;
    submitAnswer(buttonText);
  }

  function submitAnswer(answer) {
    const isCorrect = hiraganas.base[currentHiragana] == answer ? true : false;
    isCorrect ? correct() : incorrect();
  }

  function correct(){
    nextHiragana();
  }

  function incorrect(){
    
  }

  return (
    <main className="flex min-h-screen flex-col items-center content-center">
      <Spline
        scene="https://prod.spline.design/BVpsusTnFqCtrLKj/scene.splinecode"
        onLoad={onLoad}
      />
      <div className="mt-20">
        {buttonTexts.map((text, index) => (

          <button
            key={index}
            type="button"
            onClick={handleClick}
            className="rounded-2xl bg-white/10 px-5 py-4 text-3xl font-semibold text-white shadow-sm hover:bg-white/20 ms-10"
          >
            <span className="buttonText">{text}</span>
          </button>

        ))}
      </div>
    </main>
  );
}
