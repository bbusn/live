import { Icon } from "@iconify/react";

type ToolProps = {
    name: string;
};

export const Tool = ({ name }: ToolProps) => {
    return (
        <div className="transitions cursor-help relative group hover:bg-gray-100/20 hover:opacity-100 opacity-50 rounded-full p-2 bg-gray-100/10">
            <Icon icon={`cib:${name.toLocaleLowerCase()}`} className="text-gray-300 w-4 h-4" />
            <span className="absolute transitions delay-400 shadow-lg opacity-0 top-[40px] text-sm w-max left-1/2 -translate-x-1/2 group-hover:pointer-events-auto group-hover:opacity-100 px-1 bg-primary-900 pointer-events-none text-white">{name}</span>
        </div>
    );
}