import Banner from "./Banner";

interface LoadingProps {
    progress: number;
}

const Loading: React.FC<LoadingProps> = ({
    progress,
}) => {
    const clampedProgress = Math.min(100, Math.max(0, progress));

    return (
        <div className="-mt-4 flex flex-col justify-center items-center h-full w-full gap-10 sm:gap-12">
            <Banner />
            <div className="w-[250px] sm:w-[375px] bg-primary-400 rounded overflow-hidden h-2">
                <div
                    className={`bg-secondary-500 transition-all duration-100 h-2`}
                    style={{ width: `${clampedProgress}%`, }}
                />
            </div>
        </div>

    );
};

export default Loading;
