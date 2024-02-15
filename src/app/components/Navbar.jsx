'use client';

import { usePathname } from 'next/navigation';

const navigation = [
    { name: 'Hiragana', href: '/hiragana', current: false },
    { name: 'Home', href: '/', current: false },
    { name: 'Katakana', href: '/katakana', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar() {

    const pathname = usePathname();
    const isCurrent = (item) => pathname === item.href;

    return (
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-center">
                <div className="flex flex-grow justify-center sm:justify-center">
                    <div className="flex space-x-4 mt-8">
                        {navigation.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className={classNames(
                                    isCurrent(item) ? 'text-white border-b-2 border-white' : 'text-gray-400 hover:text-white',
                                    'px-3 py-2 rounded-md text-xl font-medium transition duration-150 ease-in-out'
                                )}
                                aria-current={isCurrent(item) ? 'page' : undefined}
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
