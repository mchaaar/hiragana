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
    const correct = hiraganas.base[currentHiragana] == answer ? true : false;
    console.log(correct);
    nextHiragana();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Spline
        scene="https://prod.spline.design/BVpsusTnFqCtrLKj/scene.splinecode"
        onLoad={onLoad}
      />
      <div className="relative inline-flex group">
        {buttonTexts.map((text, index) => (

          <button
            key={index}
            type="button"
            onClick={handleClick}
            className="rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
          >
            <span className="buttonText">{text}</span>
          </button>

        ))}
      </div>
    </main>
  );
}
