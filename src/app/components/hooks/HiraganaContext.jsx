import { createContext, useContext } from 'react';

const HiraganaContext = createContext();
export const useHiraganaContext = () => useContext(HiraganaContext);

export const HiraganaProvider = ({ children, value }) => (
    <HiraganaContext.Provider value={value}>{children}</HiraganaContext.Provider>
);
