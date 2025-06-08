// import { AppRoutes } from './AppRoutes';
// import { useTranslation } from 'react-i18next';
// import { AuthProvider } from './hooks/useAuth';
// import { ResetKeyContext } from './hooks/useResetKey';
// import { useState } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { AppRoutes } from "./AppRoutes";
// import { useState } from 'react';
import { AuthProvider } from './hooks/useAuth';

function App() {
    const { i18n } = useTranslation();
    // const [resetKey, setResetKey] = useState(0);

    return (
        <I18nextProvider i18n={i18n}>
            <main className="bg-primary-900 text-white h-screen flex flex-col justify-center items-center">
                <AuthProvider>
                    <AppRoutes />
                </AuthProvider>
            </main>
        </I18nextProvider>
    );
}

export default App;
