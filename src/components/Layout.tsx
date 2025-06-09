import { useEffect, useState } from 'react';
import useWindowDimensions from '../utils/useWindowsDimensions';
import { Outlet, useNavigate } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';
import NavigationBar from './NavigationBar';
import { useAuth } from '../hooks/useAuth';
import { AUTH_STATUS } from '../utils/auth';
import { User } from '../objects/User';
import ROUTES from '../constants/routes';
// import { useResetKey } from '../hooks/useResetKey';

const Layout = () => {
    const { width } = useWindowDimensions();
    const { status } = useAuth();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    // const { resetKey } = useResetKey();

    useEffect(() => {
        if (status !== AUTH_STATUS.AUTH || !User.getInstance().username || User.getInstance().username.length < 1) {
            navigate(ROUTES.WELCOME);
        }
    }, [status]);

    useEffect(() => {
        if (width < 1280) {
            document.querySelector('body')?.classList.add('collapsed');
            setCollapsed(true);
        } else {
            document.querySelector('body')?.classList.remove('collapsed');
            setCollapsed(false);
        }
    }, [width]);



    return (
        <div className='w-full h-full min-h-screen flex flex-col sm:flex-row sm:justify-start sm:items-start items-center justify-start'>
            <NavigationBar
                collapsed={collapsed}
            />
            <Outlet />
        </div>
    );
};

export default Layout;
