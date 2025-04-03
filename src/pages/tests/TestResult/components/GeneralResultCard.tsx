import { tv } from "tailwind-variants";
import Lang from "../../Lang";

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
            blue: {
                card: 'border-blue-400',
                title: 'bg-blue-400',
            },
        },
    },
});
interface GeneralResultCardProps {
    color: 'yellow' | 'green' | 'blue';
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
            <p className="text-gray-700 font-medium mb-2"><Lang>Misal sayı</Lang>-{total}</p>
            <p className="text-gray-700 font-medium mb-2"><Lang>Doğru</Lang>-{correct}</p>
                <p className="text-gray-700 font-medium mb-2"><Lang>Yanlış</Lang>-{wrong}</p>
                <p className="text-gray-700 font-medium mb-2"><Lang>Boş</Lang>-{empty}</p>
                <p className="text-gray-700 font-medium"><Lang>Bal</Lang>-{point}</p>
            </div>
        </div>
    )
}

export default GeneralResultCard;
