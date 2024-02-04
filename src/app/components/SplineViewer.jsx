'use client'

import Spline from '@splinetool/react-spline';
import { useHiraganaContext } from './hooks/HiraganaContext';

export default function SplineViewer() {

    const { onLoad } = useHiraganaContext();

    return (
        <Spline
            scene="https://prod.spline.design/BVpsusTnFqCtrLKj/scene.splinecode"
            className="w-full h-auto max-h-[1400px] md:max-h-[700px]"
            onLoad={onLoad}
        />
    );
}
