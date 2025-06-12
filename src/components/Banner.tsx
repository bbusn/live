import { useTranslation } from "react-i18next";
import title from '../assets/images/title.svg';
import banner from '../assets/images/banner.png';

const Banner = () => {
    const { t } = useTranslation();
    return (
        <div className="mt-mixed border border-transparent hover:border-secondary-400 transitions relative flex flex-col justify-center items-center rounded-lg h-[150px] sm:h-[225px] bg-primary-500 shadow-lg custom-width gap-1.5 sm:gap-2">
            <img src={title} alt="Live" className="w-32 sm:w-44 mt-2" />
            <img src={banner} alt="Face" className="z-10 absolute -top-[80px] sm:-top-[85px] left-1/2 -translate-x-1/2 w-20 sm:w-24" />
            <div className="absolute -top-[20px] sm:-top-[15px] rounded-md h-[40px] sm:h-[50px] w-[95px] sm:w-[125px] bg-primary-300"></div>
            <h1 className="text-center font-primary uppercase text-sm sm:text-lg gap-2 flex justify-center items-center"><span className="font-light">{t('banner.1')}</span><span className="font-black">{t('banner.2')}</span></h1>
        </div>
    )
};

export default Banner;