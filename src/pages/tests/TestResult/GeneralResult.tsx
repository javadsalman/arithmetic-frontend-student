import GeneralResultCard from "./components/GeneralResultCard";
import medalImageSource from '../../../assets/images/medal.png';

function GeneralResult() {
    return (
        <div className="border-4 border-red-200 rounded-2xl p-8 py-10">
            <div className="flex items-center justify-center gap-3 mb-16">
                <img src={medalImageSource} alt="Medal" className="w-14" />
                <h2 className="text-5xl font-bold text-red-500">Ümumi nəticəsi- 3.5</h2>
                <img src={medalImageSource} alt="Medal" className="w-14" />

            </div>

            <div className="flex flex-wrap justify-evenly mb-16">
                <GeneralResultCard color="yellow" title="Bal-1" correct={2} wrong={1} total={11} />
                <GeneralResultCard color="blue" title="Bal-2.5" correct={2} wrong={1} total={11} />
                <GeneralResultCard color="green" title="Bal-1.5" correct={2} wrong={1} total={11} />
                <GeneralResultCard color="red" title="Bal-2" correct={2} wrong={1} total={11} />

            </div>

            <div className="text-center">
                <h3 className="text-4xl font-bold text-red-500">Sən dahisən! <span role="img" aria-label="thumbs up">👍</span></h3>
            </div>
        </div>
    )
}

export default GeneralResult;