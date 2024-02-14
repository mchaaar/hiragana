'use client'

import { useHiragana } from '../components/hooks/useHiragana';
import DifficultySwitcher from '../components/DifficultySwitcher';
import SplineViewer from '../components/SplineViewer';
import HiraganaButtons from '../components/HiraganaButtons';
import HiraganaListDisplay from '../components/HiraganaListDisplay';
import HiraganaListSort from '../components/HiraganaListSort';
import HiraganaList from '../components/HiraganaList';
import { HiraganaProvider } from '../components/hooks/HiraganaContext';

export default function Hiragana() {

    const hiragana = useHiragana();

    return (
        <HiraganaProvider value={hiragana}>
            <main className="flex flex-col items-center">
                <SplineViewer />
                <HiraganaButtons />
                <div className='mt-10 flex flex-col items-center'>
                    <DifficultySwitcher />
                    <HiraganaListDisplay />
                </div>
                {hiragana.listDisplayed && (
                    <div className='mt-20'>
                        <h2 className='text-center text-gray-100 text-4xl mb-12'>List of Hiraganas</h2>
                        {hiragana.listDisplayed && (
                            <HiraganaListSort />
                        )}
                        <HiraganaList />
                    </div>
                )}
            </main>
        </HiraganaProvider>
    );
}
