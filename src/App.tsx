import { I18nextProvider, useTranslation } from 'react-i18next';
import { AppRoutes } from "./AppRoutes";
import AuthProvider from './providers/AuthProvider';
import ToastProvider from './providers/ToastsProvider';
import SettingsProvider from './providers/SettingsProvider';
import TasksProvider from './providers/TasksProvider';

function App() {

    const { i18n } = useTranslation();

    return (
        <I18nextProvider i18n={i18n}>
            <main className="relative bg-primary-900 text-white min-h-screen h-full overflow-x-hidden overflow-y-auto flex flex-col justify-center pt-16 pb-6 items-center">
                <AuthProvider>
                    <ToastProvider>
                        <SettingsProvider>
                            <TasksProvider>
                                <AppRoutes />
                            </TasksProvider>
                        </SettingsProvider>
                    </ToastProvider>
                </AuthProvider>
            </main>
        </I18nextProvider >
    );
}

export default App;
