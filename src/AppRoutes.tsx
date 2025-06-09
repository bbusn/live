import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import ROUTES from './constants/routes';
import RequireAuth from './components/RequireAuth';
import WelcomePage from './pages/WelcomePage';
import DashboardPage from './pages/DashboardPage';
import Layout from './components/Layout';

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* =========== NEEDS TO BE AUTH =========== */}
                <Route element={<RequireAuth />}>
                    <Route element={<Layout />}>
                        {/* =========== DASHBOARD =========== */}
                        <Route
                            path={ROUTES.DASHBOARD}
                            Component={DashboardPage}
                        />
                        <Route
                            path={ROUTES.DEFAULT}
                            element={<Navigate to={ROUTES.DASHBOARD} replace={true} />}
                        />
                        {/* =========== NOT FOUND =========== */}
                        <Route
                            path={ROUTES.NOT_FOUND}
                            Component={NotFoundPage}
                        />
                    </Route>

                </Route>
                {/* =========== WELCOME =========== */}
                <Route
                    path={ROUTES.WELCOME}
                    Component={WelcomePage}
                />
                <Route
                    path={ROUTES.NOT_FOUND}
                    element={<Navigate to={ROUTES.WELCOME} replace={true} />}
                />
            </Routes>
        </BrowserRouter >
    );
};
