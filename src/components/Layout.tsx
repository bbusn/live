import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';
import NavigationBar from './NavigationBar';
import { useAuth } from '../hooks/useAuth';
import { AUTH_STATUS } from '../utils/auth';
import { User } from '../objects/User';
import ROUTES from '../constants/routes';
import Statistics from './Statistics';
import { useTranslation } from 'react-i18next';
import Chat from './Chat';
// import { useResetKey } from '../hooks/useResetKey';

const Layout = () => {
    const { status } = useAuth();
    const navigate = useNavigate();
    const { t } = useTranslation();
    // const { resetKey } = useResetKey();

    useEffect(() => {
        if (status !== AUTH_STATUS.AUTH || !User.getInstance().username || User.getInstance().username.length < 1) {
            navigate(ROUTES.WELCOME);
        }
    }, [status]);


    return (
        <div className='w-full h-full min-h-[50vh] flex flex-col sm:flex-row sm:justify-around sm:items-start items-center justify-start 2xl:max-w-[1800px]'>
            <NavigationBar />
            <Chat />
            <Statistics />
            <div className='w-max fixed top-[25px] sm:top-[50px] left-[82.5%] sm:left-[90%] -translate-x-1/2 flex-1 flex justify-center items-center'>
                <div className='w-3.5 h-3.5 rounded-full animate-pulse bg-[#E43F3F] group-hover transitions active:scale-95 hover:brightness-125'></div>
                <span className='text-base text-white ml-2'>{t('navigation.live')}</span>
            </div>
            <Outlet />
        </div>
    );
};

export default Layout;
