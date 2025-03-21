import GeneralResultCard from "./components/GeneralResultCard";
import medalImageSource from '../../../assets/images/medal.png';
import { useTestStore } from "../../../stores/testStore";
import Lang, { content as langContent } from "../Lang";
import { useLanguageStore } from "../../../stores/languageStore";

function GeneralResult() {
    const { language } = useLanguageStore();
    const { rounds, coefficients } = useTestStore();

    const totalEasy = rounds.easy.length;
    const correctEasy = rounds.easy.filter(round => round.isCorrect).length;
    const wrongEasy = rounds.easy.filter(round => round.isCorrect === false).length;
    const emptyEasy = rounds.easy.filter(round => round.userAnswer === '').length;
    const totalEasyPoints = correctEasy * coefficients.easy;

    const totalMedium = rounds.medium.length;
    const correctMedium = rounds.medium.filter(round => round.isCorrect).length;
    const wrongMedium = rounds.medium.filter(round => round.isCorrect === false).length;
    const emptyMedium = rounds.medium.filter(round => round.userAnswer === '').length;
    const totalMediumPoints = correctMedium * coefficients.medium;


    const totalHard = rounds.hard.length;
    const correctHard = rounds.hard.filter(round => round.isCorrect).length;
    const wrongHard = rounds.hard.filter(round => round.isCorrect === false).length;
    const emptyHard = rounds.hard.filter(round => round.userAnswer === '').length;
    const totalHardPoints = correctHard * coefficients.hard;
    
    const totalPoints = totalEasyPoints + totalMediumPoints + totalHardPoints;
    
    return (
        <div className="border-4 border-red-200 rounded-2xl p-8 py-10 max-w-[1200px] mx-auto">
            <div className="flex items-center justify-center gap-3 mb-16">
                <img src={medalImageSource} alt="Medal" className="w-14" />
                <h2 className="text-5xl font-bold text-red-500"><Lang>Ümumi nəticəsi</Lang> - {totalPoints}</h2>
                <img src={medalImageSource} alt="Medal" className="w-14" />

            </div>

            <div className="flex flex-wrap justify-evenly mb-16">
                <GeneralResultCard color="green" title={langContent[language]!['Bal-1']} correct={correctEasy} wrong={wrongEasy} empty={emptyEasy} total={totalEasy} point={totalEasyPoints} />
                <GeneralResultCard color="yellow" title={langContent[language]!['Bal-1.5']} correct={correctMedium} wrong={wrongMedium} empty={emptyMedium} total={totalMedium} point={totalMediumPoints} />
                <GeneralResultCard color="red" title={langContent[language]!['Bal-2']} correct={correctHard} wrong={wrongHard} empty={emptyHard} total={totalHard} point={totalHardPoints} />

            </div>

            <div className="text-center">
                <h3 className="text-4xl font-bold text-red-500"><Lang>Sən dahisən!</Lang> <span role="img" aria-label="thumbs up">👍</span></h3>
            </div>
        </div>
    )
}

export default GeneralResult;