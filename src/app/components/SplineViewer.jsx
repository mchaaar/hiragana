'use client'

import Spline from '@splinetool/react-spline';

export default function SplineViewer({ onLoad }) {
    return (
        <Spline
            scene="https://prod.spline.design/BVpsusTnFqCtrLKj/scene.splinecode"
            className="w-full h-auto max-h-[1400px] md:max-h-[700px]"
            onLoad={onLoad}
        />
    );
}
