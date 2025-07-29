import {useEffect, useState} from "react";

const Loading = () => {
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setFadeIn(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className={`flex items-center justify-center h-screen bg-white transition-opacity duration-700 
                ${fadeIn ? 'opacity-100' : 'opacity-0'
            }`}
        >
            <div className="flex flex-col items-center space-y-4">
                <div
                    className="w-16 h-16 border-[6px] border-blue-500 border-t-transparent rounded-full animate-[spin_2s_linear_infinite]"
                />
                <p className="text-blue-500 font-medium text-lg">در حال بارگیری..</p>
            </div>
        </div>
    );
};

export default Loading;
