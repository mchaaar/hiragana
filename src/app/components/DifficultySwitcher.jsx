import { Switch } from '@headlessui/react';
import { PlusIcon } from '@heroicons/react/20/solid';
import { MinusIcon } from '@heroicons/react/20/solid';
import { useHiraganaContext } from './hooks/HiraganaContext';

export default function DifficultySwitcher(){
 
    const { hardMode, decreaseDifficulty, increaseDifficulty, handleModeChange, classNames } = useHiraganaContext();

    return (
        <Switch.Group as="div" className="flex items-center">
            {hardMode && (
                <button
                    type="button"
                    className="me-3 rounded-full p-1 text-gray-100 shadow-sm hover:scale-125 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800"
                    onClick={decreaseDifficulty}
                >
                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                </button>
            )}
            <span className={hardMode ? 'text-gray-600 text-xl me-4' : 'text-gray-100 text-xl me-4'}>easy</span>
            <Switch
                checked={hardMode}
                onChange={handleModeChange}
                className='bg-gray-600 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2'
            >
                <span
                    aria-hidden="true"
                    className={classNames(
                        hardMode ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-300 ease-in-out'
                    )}
                />
            </Switch>
            <span className={hardMode ? 'text-gray-100 text-xl ms-4' : 'text-gray-600 text-xl ms-4'}>hard</span>
            {hardMode && (
                <button
                    type="button"
                    className="ms-3 rounded-full p-1 text-white shadow-sm hover:scale-125 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800"
                    onClick={increaseDifficulty}
                >
                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                </button>
            )}
        </Switch.Group>
    );
}
