// import { useTranslation } from 'react-i18next';
// import { useEffect, useState } from 'react';
// import useWindowDimensions from '../utils/useWindowsDimensions';
// import { Outlet, useNavigate } from 'react-router-dom';
// // import { useAuth } from '../hooks/useAuth';
// import NavigationBreadCrumb from './Navigation/NavigationBreadCrumb';
// import NavigationBar from './Navigation/NavigationBar';
// import { useResetKey } from '../hooks/useResetKey';

// const Layout = () => {
//     const { t, i18n } = useTranslation();
//     const { width } = useWindowDimensions();
//     const { status } = useAuth();
//     const navigate = useNavigate();
//     const [collapsed, setCollapsed] = useState(false);
//     const { resetKey } = useResetKey();

//     useEffect(() => {
//         if (status !== AUTH_STATUSES.AUTH || !(User._instance.isAllowed(PERMISSIONS.LOGIN))) {
//             navigate(ROUTES.APP.LOGIN);
//         }
//     }, [status, User]);

//     useEffect(() => {
//         if (width < 1280) {
//             document.querySelector('body')?.classList.add('collapsed');
//             setCollapsed(true);
//         } else {
//             document.querySelector('body')?.classList.remove('collapsed');
//             setCollapsed(false);
//         }
//     }, [width]);

//     return (
//         <TranslationProvider
//             t={t}
//             i18n={i18n}
//         >
//             <Div className='w-full bg-white flex flex-col overflow-hidden'>
//                 <Div className='flex flex-row justify-start items-center bg-white overflow-hidden max-h-screen w-screen'>
//                     <NavigationBar
//                         key={resetKey}
//                         collapsed={collapsed}
//                         setCollapsed={setCollapsed}
//                     />
//                     <Main className={`flex flex-col justify-start items-center w-full h-screen px-6 py-20 overflow-y-auto overflow-x-auto gap-4`}>
//                         <NavigationBreadCrumb />
//                         <Outlet />
//                     </Main>
//                 </Div>
//             </Div>
//         </TranslationProvider>
//     );
// };

// export default Layout;
