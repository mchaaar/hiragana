import { Switch } from '@headlessui/react';

export default function HiraganaListSort({sorted, handleSortedChange, classNames}) {
    return (
        <Switch.Group as="div" className="mb-12 me-6 justify-center flex items-center">
            <span className={sorted ? 'text-gray-600 text-xl me-4' : 'text-gray-100 text-xl me-4'}>unsorted</span>
            <Switch
                checked={sorted}
                onChange={handleSortedChange}
                className={
                    'bg-gray-600 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2'
                }
            >
                <span
                    aria-hidden="true"
                    className={classNames(
                        sorted ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-300 ease-in-out'
                    )}
                />
            </Switch>
            <span className={sorted ? 'text-gray-100 text-xl ms-4' : 'text-gray-600 text-xl ms-4'}>sorted</span>
        </Switch.Group>
    );
}
