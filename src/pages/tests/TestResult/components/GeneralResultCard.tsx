import { tv } from "tailwind-variants";

const cardSlot = tv({
    slots: {
        card: 'w-[270px] rounded-2xl overflow-hidden border-4 border-',
        title: 'py-3 px-4 text-white text-center text-2xl font-bold',
    },
    variants: {
        color: {
            yellow: {
                card: 'border-yellow-400',
                title: 'bg-yellow-400',
            },
            green: {
                card: 'border-green-400',
                title: 'bg-green-400',
            },
            red: {
                card: 'border-red-400',
                title: 'bg-red-400',
            },
        },
    },
});
interface GeneralResultCardProps {
    color: 'yellow' | 'green' | 'red';
    title: string;
    correct: number;
    wrong: number;
    empty: number;
    total: number;
    point: number;
}

function GeneralResultCard({ color, title, correct, wrong, empty, total, point }: GeneralResultCardProps) {
    const { card, title: titleSlot } = cardSlot({ color });
    return (
        <div className={card()}>
            <div className={titleSlot()}>
                {title}
            </div>
        <div className="p-4 flex flex-col items-center text-xl font-bold">
            <p className="text-gray-700 font-medium mb-2">Misal sayı-{total}</p>
            <p className="text-gray-700 font-medium mb-2">Doğru-{correct}</p>
                <p className="text-gray-700 font-medium mb-2">Yanlış-{wrong}</p>
                <p className="text-gray-700 font-medium mb-2">Boş-{empty}</p>
                <p className="text-gray-700 font-medium">Bal-{point}</p>
            </div>
        </div>
    )
}

export default GeneralResultCard;
