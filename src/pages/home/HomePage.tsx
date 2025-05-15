import { useNavigate } from 'react-router';
import formulesIcon from '../../assets/images/formulesIcon.png';
import actionsIcon from '../../assets/images/actionsIcon.png';
import testsIcon from '../../assets/images/testsIcon.png';
import Lang from './Lang';
import { getHasAnyAccess } from '../../stores/authStore';
import { useNotificationStore } from '../../stores/notificationStore';


function HomePage() {
    const navigate = useNavigate();

    const notification = useNotificationStore();
    const hasAnyAccess = getHasAnyAccess();

    const onNavigatePage = (path: string) => {
        if (!hasAnyAccess) {
            notification.setNotification("Bu səhifəyə icazəniz yoxdur!", "error", "filled", { vertical: "bottom", horizontal: "center" });
        } else {
            navigate(path);
        }
    }

    return (
        <div className="mt-16 md:mt-32 flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl md:text-3xl font-bold text-[#ff6b6b] mb-20 md:mb-28 text-center px-4">
                <Lang>Daxil olmaq istədiyin bölməni seç!</Lang>
            </h1>
            
            <div className="flex flex-col gap-16 md:gap-32 items-center w-full max-w-5xl">
                {/* First Row - Formullar */}
                <div className="relative w-full max-w-[18rem] md:max-w-[24rem]">
                    <img 
                        src={formulesIcon} 
                        alt="" 
                        className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 md:w-24 h-16 md:h-24" 
                    />
                    <button 
                        onClick={() => onNavigatePage('/formules')}
                        className="relative z-10 w-full flex flex-col items-center p-4 md:p-6 bg-[#90be6d] rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <span className="text-white text-xl md:text-2xl font-semibold">
                            <Lang>FORMULLAR</Lang>
                        </span>
                    </button>
                </div>

                {/* Second Row - Əməllər and Testlər */}
                <div className="flex flex-col md:flex-row gap-16 md:gap-16 w-full items-center md:justify-between md:px-8">
                    <div className="relative w-full max-w-[18rem] md:max-w-[24rem]">
                        <img 
                            src={actionsIcon} 
                            alt="" 
                            className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 md:w-24 h-16 md:h-24" 
                        />
                        <button 
                            onClick={() => onNavigatePage('/actions')}
                            className="relative z-10 w-full flex flex-col items-center p-4 md:p-6 bg-red-500 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <span className="text-white text-xl md:text-2xl font-semibold">
                                <Lang>ƏMƏLLƏR</Lang>
                            </span>
                        </button>
                    </div>

                    <div className="relative w-full max-w-[18rem] md:max-w-[24rem]">
                        <img 
                            src={testsIcon} 
                            alt="" 
                            className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 md:w-24 h-16 md:h-24" 
                        />
                        <button 
                            onClick={() => onNavigatePage('/tests')}
                            className="relative z-10 w-full flex flex-col items-center p-4 md:p-6 bg-sky-500 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <span className="text-white text-xl md:text-2xl font-semibold">
                                <Lang>TESTLƏR</Lang>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
