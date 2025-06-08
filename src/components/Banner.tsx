import { useTranslation } from "react-i18next";
import Live from '../assets/images/Live.svg';
import Face from '../assets/images/faces/Face-1.png';

const Banner = () => {
    const { t } = useTranslation();
    return (
        <div className="relative flex flex-col justify-center items-center rounded-lg h-[175px] sm:h-[240px] bg-primary-500 drop-shadow-classic w-[250px] sm:w-[375px] gap-1.5 sm:gap-2">
            <img src={Live} alt="Live" className="w-36 sm:w-48 mt-2" />
            <img src={Face} alt="Face" className="z-10 absolute -top-[75px] sm:-top-[85px] left-1/2 -translate-x-1/2 w-20 sm:w-24" />
            <div className="absolute -top-[15px] rounded-md h-[40px] sm:h-[50px] w-[95px] sm:w-[125px] bg-primary-300"></div>
            <h1 className="text-center font-primary uppercase text-md sm:text-xl gap-2 flex justify-center items-center"><span className="font-light">{t('banner.1')}</span><span className="font-black">{t('banner.2')}</span></h1>
        </div>
    )
};

export default Banner;