import Note from './components/Note';
import { useNavigate } from 'react-router';
import { NOTE_SIZE, ATTACH_SIZE, FORMULE_TITLES } from './constants';
import { 
    SIMPLE_ADD_SUB,
    FIVE_ADD,
    FIVE_ADD_SUB,
    TEN_ADD,
    TEN_ADD_SUB,
    FIVE_K_ADD,
    FIVE_K_ADD_SUB,
    MIXED_ADD_SUB, 
} from '../../lib/formules/constants';
import Lang, {content as langContent } from './Lang';
import { useLanguageStore } from '../../stores/languageStore';
import { useGameStore } from '../../stores/gameStore';
import { FormuleMode } from '../../lib/formules/types';

function FormulesPage() {
    const navigate = useNavigate();
    const { language } = useLanguageStore();
    const { setGameType, setGameMode } = useGameStore();

    const handleNoteClick = (formule: string) => {
        setGameType("formules");
        setGameMode(formule as FormuleMode);
        navigate(`/game/formules/${formule}/steps/digit`);
    }

    return (
        <div className="container mx-auto px-4 pb-10">
            {/* Title */}
            <h1 className="text-center text-4xl font-bold text-red-500 mt-10 mb-20">
                <Lang>Sənə uyğun formulu seç!</Lang>
            </h1>

            {/* Custom Grid Layout */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <div className="flex justify-center mb-8 sm:mb-12 lg:mb-16">
                    <Note 
                        number={1}
                        title={langContent[language]![FORMULE_TITLES[SIMPLE_ADD_SUB]]}
                        numberColor="text-orange-400"
                        bgColor="bg-orange-400"
                        secondaryBgColor="bg-yellow-300"
                        noteSize={NOTE_SIZE}
                        attachSize={ATTACH_SIZE}
                        onClick={() => handleNoteClick(SIMPLE_ADD_SUB)}
                    />
                </div>

                {/* Second Row - 3 notes */}
                <div className="flex justify-center mb-8 sm:mb-12 lg:mb-16">
                    <Note 
                        number={2}
                        title={langContent[language]![FORMULE_TITLES[FIVE_ADD]]}
                        numberColor="text-red-400"
                        bgColor="bg-red-400"
                        secondaryBgColor="bg-red-300"
                        noteSize={NOTE_SIZE}
                        attachSize={ATTACH_SIZE}
                        onClick={() => handleNoteClick(FIVE_ADD)}
                    />
                </div>
                <div className="flex justify-center mb-8 sm:mb-12 lg:mb-16">
                    <Note 
                        number={3}
                        title={langContent[language]![FORMULE_TITLES[FIVE_ADD_SUB]]}
                        numberColor="text-green-600"
                        bgColor="bg-green-600"
                        secondaryBgColor="bg-green-500"
                        noteSize={NOTE_SIZE}
                        attachSize={ATTACH_SIZE}
                        onClick={() => handleNoteClick(FIVE_ADD_SUB)}
                    />
                </div>
                <div className="flex justify-center mb-8 sm:mb-12 lg:mb-16">
                    <Note 
                        number={4}
                        title={langContent[language]![FORMULE_TITLES[TEN_ADD]]}
                        numberColor="text-pink-500"
                        bgColor="bg-pink-500"
                        secondaryBgColor="bg-pink-400"
                        noteSize={NOTE_SIZE}
                        attachSize={ATTACH_SIZE}
                        onClick={() => handleNoteClick(TEN_ADD)}
                    />
                </div>
                <div className="flex justify-center mb-8 sm:mb-12 lg:mb-16">
                    <Note 
                        number={5}
                        title={langContent[language]![FORMULE_TITLES[TEN_ADD_SUB]]}
                        numberColor="text-blue-500"
                        bgColor="bg-blue-500"
                        secondaryBgColor="bg-blue-400"
                        noteSize={NOTE_SIZE}
                        attachSize={ATTACH_SIZE}
                        onClick={() => handleNoteClick(TEN_ADD_SUB)}
                    />
                </div>
                <div className="flex justify-center mb-8 sm:mb-12 lg:mb-16">
                    <Note 
                        number={6}
                        title={langContent[language]![FORMULE_TITLES[FIVE_K_ADD]]}
                        numberColor="text-red-800"
                        bgColor="bg-red-800"
                        secondaryBgColor="bg-red-700"
                        noteSize={NOTE_SIZE}
                        attachSize={ATTACH_SIZE}
                        onClick={() => handleNoteClick(FIVE_K_ADD)}
                    />
                </div>
                <div className="flex justify-center mb-8 sm:mb-12 lg:mb-16">
                    <Note 
                        number={7}
                        disabled={false}
                        title={langContent[language]![FORMULE_TITLES[FIVE_K_ADD_SUB]]}
                        numberColor="text-indigo-500"
                        bgColor="bg-indigo-500"
                        secondaryBgColor="bg-indigo-400"
                        noteSize={NOTE_SIZE}
                        attachSize={ATTACH_SIZE}
                        onClick={() => handleNoteClick(FIVE_K_ADD_SUB)}
                    />
                </div>
                {/* Fourth Row - 1 note */}
                <div className="flex justify-center mb-8 sm:mb-12 lg:mb-16">
                    <Note 
                        number={8}
                        disabled={false}
                        title={langContent[language]![FORMULE_TITLES[MIXED_ADD_SUB]]}
                        numberColor="text-green-500"
                        bgColor="bg-green-500"
                        secondaryBgColor="bg-green-400"
                        noteSize={NOTE_SIZE}
                        attachSize={ATTACH_SIZE}
                        onClick={() => handleNoteClick(MIXED_ADD_SUB)}
                    />
                </div>
            </div>
        </div>
    );
}

export default FormulesPage;
