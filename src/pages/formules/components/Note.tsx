import attachSvg from '../../../assets/svg/attach.svg'
import { useNotificationStore } from '../../../stores/notificationStore';

interface NoteProps {
  title: string;
  number?: number;
  numberColor?: string;
  bgColor?: string;
  secondaryBgColor?: string;
  textColor?: string;
  noteSize?: string;
  attachSize?: string;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

const Note: React.FC<NoteProps> = ({ 
  title, 
  number,
  bgColor = 'bg-orange-400',
  secondaryBgColor = 'bg-yellow-300',
  textColor = 'text-white',
  numberColor = 'text-orange-400',
  onClick,
  noteSize = 'w-[280px] h-[280px]',
  attachSize = 'w-24 h-24',
  disabled = false,
  className = ''
}) => {
  const { setNotification } = useNotificationStore();

  const handleClick = () => {
    if (disabled) {
      setNotification('Bu işəməliyyat mümkün deyil', 'error', 'filled', { vertical: 'bottom', horizontal: 'center' });
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <>
      <div className={`
        relative ${noteSize} group 
        ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} 
        flex items-center justify-center
      `}>
        {/* Number */}
        {number && (
          <span className={`
            absolute -left-8 -top-8
            text-4xl font-bold
            ${disabled ? 'text-gray-400' : numberColor}
            z-20
          `}>
            {number}.
          </span>
        )}

        {/* Attach Icon */}
        <img 
            src={attachSvg} 
            alt="attach" 
            className={`
              absolute -top-5 right-1/2 translate-x-1/2 
              ${attachSize} 
              ${disabled ? 'opacity-40' : 'opacity-80'} 
              z-10
              transition-all duration-300 ease-in-out
              group-hover:rotate-[-12deg]
              group-hover:scale-110
              group-hover:-translate-y-2
            `}
        />
        
        {/* Title */}
        <h3 className={`
          absolute z-10
          text-2xl font-bold text-center
          w-[80%] 
          ${disabled ? 'text-gray-100' : textColor}
          pointer-events-none
        `}>
          {title}
        </h3>

      {/* Background Note */}
      <div className={`
        absolute top-2 left-2
        w-full h-full 
        rounded-2xl
        transition-all duration-300 ease-in-out
        group-hover:shadow-lg
        group-hover:translate-x-3
        group-hover:translate-y-3
        ${disabled ? 'bg-gray-300' : secondaryBgColor}
        rotate-[-12deg]
      `} />

      {/* Main Note */}
      <div 
        onClick={handleClick}
        className={`
          absolute
          w-full h-full
          rounded-2xl
          transition-all duration-300 ease-in-out
          group-hover:shadow-lg
          group-hover:-translate-x-1
          group-hover:-translate-y-1
          ${disabled ? 'bg-gray-400' : bgColor} 
          ${className}
          -rotate-[-8deg]
          overflow-hidden
        `}
      >
        {/* Hover Overlay */}
        <div className={`
          absolute inset-0 rounded-2xl
          bg-black opacity-0 group-hover:opacity-10
          transition-opacity duration-300
        `} />
      </div>
      </div>
    </>
  );
};

export default Note;
