import { hiraganas } from './Hiraganas';
import { useHiraganaContext } from './hooks/HiraganaContext';

export default function HiraganaList() {

    const { sorted } = useHiraganaContext();

    const hiraganaArray = Object.entries(hiraganas.base).map(([character, romaji]) => {
        return { hiragana: character, romaji: romaji };
    });

    const sortedHiraganas = Object.entries(hiraganas.base).map(([character, romaji]) => {
        return { hiragana: character, romaji: romaji };
    });

    const groupedHiraganaArrays = Object.keys(hiraganas).reduce((acc, key) => {
        if (typeof hiraganas[key] === 'object') {
            acc[key] = Object.entries(hiraganas[key]).map(([character, romaji]) => ({
                hiragana: character,
                romaji: romaji
            }));
        }
        return acc;
    }, {});

    return (
        <div className="grid grid-cols-5 md:grid-cols-5 gap-4 p-4 max-w-max mx-auto text-gray-100">
            {
                !sorted && (
                    hiraganaArray.map((item, index) => (
                        <div key={index} className="text-center border border-gray-700 p-5">
                            <div className="text-6xl cursor-pointer hover:scale-125">{item.hiragana}</div>
                            <div className="mt-4 text-3xl">{item.romaji}</div>
                        </div>
                    ))
                )
            }

            {
                sorted && (
                    <>
                        {hiraganas.sortedSimpleToMo.map(group =>
                            groupedHiraganaArrays[group].map((item, index) => (
                                <div key={`${group}-${index}`} className="text-center border border-gray-700 p-5">
                                    <div className="text-6xl cursor-pointer hover:scale-125">{item.hiragana}</div>
                                    <div className="mt-4 text-3xl">{item.romaji}</div>
                                </div>
                            ))
                        )}
                        {groupedHiraganaArrays['y'].map((item, index) => (
                            <div key={`y-${index}`} className="text-center border border-gray-700 p-5">
                                <div className="text-6xl cursor-pointer hover:scale-125">{item.hiragana}</div>
                                <div className="mt-4 text-3xl">{item.romaji}</div>
                            </div>
                        ))}
                        {groupedHiraganaArrays['r'].map((item, index) => (
                            <div key={`y-${index}`} className="text-center border border-gray-700 p-5">
                                <div className="text-6xl cursor-pointer hover:scale-125">{item.hiragana}</div>
                                <div className="mt-4 text-3xl">{item.romaji}</div>
                            </div>
                        ))}
                        {groupedHiraganaArrays['w'].map((item, index) => (
                            <div key={`y-${index}`} className="text-center border border-gray-700 p-5">
                                <div className="text-6xl cursor-pointer hover:scale-125">{item.hiragana}</div>
                                <div className="mt-4 text-3xl">{item.romaji}</div>
                            </div>
                        ))}
                        {groupedHiraganaArrays['x'].map((item, index) => (
                            <div key={`y-${index}`} className="text-center border border-gray-700 p-5">
                                <div className="text-6xl cursor-pointer hover:scale-125">{item.hiragana}</div>
                                <div className="mt-4 text-3xl">{item.romaji}</div>
                            </div>
                        ))}
                    </>
                )
            }
        </div>
    );
}
