type MaxSizeProps = {
    value: string;
    size: number;
    className?: string;
};


const MaxSize: React.FC<MaxSizeProps> = ({ value, size, className = '' }) => {
    let hasBeenTruncated = false;
    const maxSize = (value: string, size: number): string => {
        const dots = '...';

        if (size < dots.length) size = dots.length;

        if (value.length > size) {
            hasBeenTruncated = true;
        }

        return value.length > size ? `${value.slice(0, size - dots.length)}${dots}` : value;
    }

    const truncated = maxSize(value, size);


    return (
        <span className={`flex justify-center items-center w-max max-w-full relative text-center group ${hasBeenTruncated && 'cursor-pointer'}  ${className}`}>
            <span className="w-max max-w-full text-center break-all">{truncated}</span>
            <span className={`select-text font-normal pointer-events-auto cursor-default absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max max-w-96 h-max whitespace-pre-wrap text-center break-all px-2 py-0.5 rounded-[1px] bg-gray-200 shadow-md text-black text-sm opacity-0  ${hasBeenTruncated && 'group-hover:opacity-100'} transitions delay-500 z-20`}>
                {value}
            </span>
        </span >
    );
};

export default MaxSize;
