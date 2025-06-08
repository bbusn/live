import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import ROUTES from './constants/routes';
import RequireAuth from './components/RequireAuth';
import WelcomePage from './pages/WelcomePage';
// <h1 className="font-secondary uppercase text-8xl">LIVE</h1>

export const AppRoutes = () => {
    // const { status } = useAuth();

    return (
        <BrowserRouter>
            <Routes>
                {/* <Route element={<Layout />}> */}
                <Route
                    path={ROUTES.WELCOME}
                    Component={WelcomePage}
                />
                <Route element={<RequireAuth />}>
                    <Route
                        path={ROUTES.NOT_FOUND}
                        Component={NotFoundPage}
                    />
                </Route>
                <Route
                    path={ROUTES.NOT_FOUND}
                    element={<Navigate to={ROUTES.WELCOME} replace={true} />}
                />
            </Routes>
        </BrowserRouter >
    );
};
