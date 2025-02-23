
interface NumberSelectorProps {
    numbers: number[];
    digitCount: number;
    setDigitCount: (count: number) => void;
}

function NumberSelector({ numbers, digitCount, setDigitCount }: NumberSelectorProps) {
    return (
        <div className="relative flex items-center justify-between w-full mb-4">
            {/* Connecting line */}
            <div className="absolute left-0 right-0 h-[2px] bg-gray-200" />
            <div 
                className="absolute left-0 h-[2px] bg-[#FF4D4F] transition-all duration-300"
                style={{
                    width: `${(numbers.indexOf(digitCount) / (numbers.length - 1)) * 100}%`
                }}
            />

            {/* Circles */}
            {numbers.map((num) => (
                <div key={num} className="relative z-10">
                    <button
                        title={`${num} seç`}
                        onClick={() => setDigitCount(num)}
                        className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-all
                            ${num <= digitCount 
                                ? 'bg-[#FF4D4F] border-[#FF4D4F]' 
                                : 'bg-white border-2 border-gray-300'}`}
                    >
                    </button>
                    {/* Number label below */}
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-gray-600 text-lg font-bold">
                        {num}
                    </span>
                </div>
            ))}
        </div>
    )
}

export default NumberSelector;
