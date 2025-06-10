import { Icon } from "@iconify/react";

type ToolProps = {
    name: string;
    description?: string;
};

export const Tool = ({ name, description }: ToolProps) => {
    const isCE = name.split('.')[0] === 'CE';
    const major = name.split('.')[1] as unknown as number;

    let highlightClass = '';

    if (isCE) {
        if (major > 4) {
            highlightClass = 'bg-blue-400/20';
        } else {
            highlightClass = 'bg-secondary-500/20';
        }
    } else {
        if (major > 34) {
            highlightClass = 'bg-orange-300/20';
        } else {
            highlightClass = 'bg-green-300/20';
        }
    }

    return (
        !description ? (
            <div className={`mb-4 sm:mb-0 tool transitions cursor-help relative group hover:bg-gray-100/20 hover:opacity-100 opacity-50 rounded-full p-2 bg-gray-100/10`}>
                <Icon icon={`cib:${name.toLocaleLowerCase()}`} className="text-gray-300 w-4 h-4" />
                <span className="text-xs sm:text-base absolute transitions delay-400 shadow-lg sm:opacity-0 top-[40px] w-max left-1/2 -translate-x-1/2 group-hover:pointer-events-auto group-hover:opacity-100  px-1 bg-primary-900 pointer-events-none text-white">{name}</span>
            </div>
        ) : (
            <div className={`tool h-24 flex flex-col justify-center items-center transitions relative max-w-[200px] rounded-sm p-2 opacity-75 hover:brightness-125 hover:opacity-100 gap-1`}>
                <span className={`text-white ${highlightClass} text-center  px-1`}>{name}</span>
                <span className="text-xs transitions delay-400 text-center px-1 text-white">{description}</span>
            </div>
        )

    );
}