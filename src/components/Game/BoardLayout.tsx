
interface BoardLayoutProps {
    children: React.ReactNode;
    boardRef: React.RefObject<HTMLDivElement>;
    className?: string;
}

function BoardLayout({children, boardRef, className=""}: BoardLayoutProps) {
    return (
        <div className='relative w-full h-full rounded-lg p-4 lg:p-8 shadow-2xl bg-orange-400 border border-orange-500' ref={boardRef}>
            <div className={`items-center h-full bg-emerald-600 overflow-hidden rounded-sm border border-green-700 ${className}`}>
                {children}
            </div>
        </div>
    );
}

export default BoardLayout;
