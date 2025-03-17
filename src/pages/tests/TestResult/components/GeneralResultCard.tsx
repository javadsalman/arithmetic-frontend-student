
interface GeneralResultCardProps {
    color: string;
    title: string;
    correct: number;
    wrong: number;
    total: number;
}

function GeneralResultCard({ color, title, correct, wrong, total }: GeneralResultCardProps) {
    return (
        <div className={`w-[270px] rounded-2xl overflow-hidden border-4 border-${color}-400`}>
        <div className={`bg-${color}-400 py-3 px-4 text-white text-center text-2xl font-bold`}>
            {title}
        </div>
        <div className="p-4 flex flex-col items-center text-xl font-bold">
            <p className="text-gray-700 font-medium mb-2">Misal sayı-{total}</p>
            <p className="text-gray-700 font-medium mb-2">Doğru-{correct}</p>
                <p className="text-gray-700 font-medium">Yanlış-{wrong}</p>
            </div>
        </div>
    )
}

export default GeneralResultCard;
