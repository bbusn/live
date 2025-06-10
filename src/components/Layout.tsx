import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';
import NavigationBar from './NavigationBar';
import { useAuth } from '../hooks/useAuth';
import { AUTH_STATUS } from '../utils/auth';
import { User } from '../objects/User';
import ROUTES from '../constants/routes';
import Statistics from './Statistics';
// import { useResetKey } from '../hooks/useResetKey';

const Layout = () => {
    const { status } = useAuth();
    const navigate = useNavigate();
    // const { resetKey } = useResetKey();

    useEffect(() => {
        if (status !== AUTH_STATUS.AUTH || !User.getInstance().username || User.getInstance().username.length < 1) {
            navigate(ROUTES.WELCOME);
        }
    }, [status]);


    return (
        <div className='w-full h-full min-h-[50vh] flex flex-col sm:flex-row sm:justify-around sm:items-start items-center justify-start 2xl:max-w-[1800px]'>
            <NavigationBar />
            <Statistics />
            <Outlet />
        </div>
    );
};

export default Layout;
