/** @type {import('tailwindcss').Config} */
export default {
    plugins: [
        function ({ addVariant }) {
            addVariant('not-collapsed', ({ modifySelectors }) => {
                return modifySelectors(({ className }) => {
                    return `body:not(.collapsed) .not-collapsed\\:${className}`;
                });
            });
        },
    ],
};
