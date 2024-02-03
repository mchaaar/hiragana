'use client'

import { useHiragana } from './components/hooks/useHiragana';
import DifficultySwitcher from './components/DifficultySwitcher';
import SplineViewer from './components/SplineViewer';
import HiraganaButtons from './components/HiraganaButtons';
import HiraganaListDisplay from './components/HiraganaListDisplay';
import HiraganaListSort from './components/HiraganaListSort';
import HiraganaList from './components/HiraganaList';

export default function Home() {

  const hiragana = useHiragana();

  return (
    <main className="flex flex-col items-center">
      <SplineViewer onLoad={hiragana.onLoad} />
      <HiraganaButtons
        handleClick={hiragana.handleClick}
        buttonTexts={hiragana.buttonTexts}
        selectedButton={hiragana.selectedButton}
        buttonStyle={hiragana.buttonStyle}
      />
      <div className='mt-20 flex flex-col items-center'>
        <DifficultySwitcher 
          hardMode={hiragana.hardMode}
          decreaseDifficulty={hiragana.decreaseDifficulty}
          increaseDifficulty={hiragana.increaseDifficulty}
          handleModeChange={hiragana.handleModeChange}
          classNames={hiragana.classNames}
        />
        <HiraganaListDisplay 
          listDisplayed={hiragana.listDisplayed}
          handleListDisplay={hiragana.handleListDisplay}
          classNames={hiragana.classNames}
        />
      </div>
      {hiragana.listDisplayed && (
        <div className='mt-20'>
          <h2 className='text-center text-gray-100 text-4xl mb-12'>List of Hiraganas</h2>
          {hiragana.listDisplayed && (
            <HiraganaListSort
              sorted={hiragana.sorted}
              handleSortedChange={hiragana.handleSortedChange}
              classNames={hiragana.classNames}
            />
          )}
          <HiraganaList sorted={hiragana.sorted}/>
        </div>
      )}
    </main>
  );
}
