import { tv } from 'tailwind-variants';

const buttonVariants = tv({
    base: 'px-8 py-2 rounded-full text-white font-medium hover:bg-green-500 transition-colors',
    variants: {
        color: {
            green: 'bg-green-400 hover:bg-green-500',
            yellow: 'bg-yellow-400 hover:bg-yellow-500',
            red: 'bg-red-400 hover:bg-red-500',
            gray: 'bg-gray-400 hover:bg-gray-500'
        },
        circle: {
            true: 'w-12 h-12 p-0 rounded-full flex items-center justify-center'
        }
    }
})

function TestsPage() {

    return (
        <div className="container mx-auto px-4 pb-10 pt-12">
            <div className="flex justify-between items-center mb-16">
                <div className="flex justify-center gap-4">
                    <button className={buttonVariants({ color: 'green' })}>
                        Asan
                    </button>
                    <button className={buttonVariants({ color: 'yellow' })}>
                        Normal  
                    </button>
                    <button className={buttonVariants({ color: 'red' })}>
                        Çətin
                    </button>
                </div>
                <div>
                    <button className={buttonVariants({ color: 'gray' })}>
                        01:15:00
                    </button>
                </div>
            </div>
            <div className="flex gap-4 mb-5">
                <div className={buttonVariants({ color: 'green', circle: true, className: 'text-2xl font-bold' })}>
                    1
                </div>
                <div className={buttonVariants({ color: 'green', className: 'text-xl font-bold px-8 rounded-full' })}>
                    1R 3Ə (NF) 1*
                </div>
            </div>
            <div className="flex gap-1">
                {Array.from({ length: 10 }).map((_, index) => (
                    <TestColumn key={index} />
                ))}
            </div>
        </div>
    );
}

function TestColumn() {
    return (
        <div className="flex flex-col text-center bg-white/30">
            <div className="p-3 border-gray-300 bg-green-400 text-white rounded-t text-2xl">1</div>
            <div className="p-3 border border-t-0 border-gray-300">456</div>
            <div className="p-3 border border-gray-300">456</div>
            <div className="p-3 border border-b-0 border-gray-300">456</div>
            <div><input title="answer" type="text" className="w-full outline-none border-2 border-red-300 p-2 text-center rounded-b bg-white/70" /></div>
        </div>
    )
}

export default TestsPage;
