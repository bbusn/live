import { t } from "i18next";
import Banner from "./Banner";
import { Icon } from "@iconify/react";
import ICONS from "../constants/icons";

type LoadingProps = {
    progress: number;
    error: boolean;
}

const Loading: React.FC<LoadingProps> = ({
    progress,
    error = false,
}) => {
    const clampedProgress = Math.min(100, Math.max(0, progress));

    return (
        <div className={`flex flex-col justify-center items-center h-full w-full ${!error ? 'gap-8 sm:gap-10' : 'gap-4 sm:gap-6'}`}>
            <Banner />
            {!error ? (
                <div className="flex flex-col items-center gap-8">
                    <div className="custom-width bg-primary-400 rounded overflow-hidden h-2">
                        <div
                            className={`bg-secondary-500 transition-all duration-100 h-2`}
                            style={{ width: `${clampedProgress}%`, }}
                        />
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Icon
                            icon={ICONS.VOLUME_UP}
                            className="text-2xl font-bold text-gray-200 cursor-pointer active:scale-90 hover:text-white transitions" />
                        <p className="select-none text-gray-200 font-primary text-lg max-w-[90%] 2xs:max-w-[300px] sm:max-w-[375px] text-center font-extralight italic">
                            {t('loading')}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="custom-width flex flex-col items-center gap-12 sm:gap-8">
                    <p className="text-gray-300 text-center font-primary text-base">
                        {t('preload.error.description')}
                    </p>
                    <button className="button-primary w-full transitions" onClick={() => {
                        window.location.reload();
                    }}>{t('preload.error.retry')}</button>
                </div>
            )
            }
        </div >

    );
};

export default Loading;
