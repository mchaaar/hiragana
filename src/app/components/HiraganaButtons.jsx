'use client'

export default function HiraganaButtons({ handleClick, buttonTexts, selectedButton, buttonStyle }) {
    return (
        <div className="mt-20 justify-center">
            {buttonTexts.map((text, index) => (
                <button
                    key={index}
                    type="button"
                    onClick={(e) => handleClick(e, index)}
                    className={selectedButton === index ? buttonStyle : "rounded-2xl bg-white/10 px-5 py-4 text-3xl font-semibold text-gray-100 shadow-sm hover:bg-white/20 ms-3 me-3"}
                >
                    <span className="buttonText">{text}</span>
                </button>
            ))}
        </div>
    );
}
