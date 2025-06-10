import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import { DateTime } from "luxon";
import { useToasts } from "../hooks/useToasts";
import { User } from "../objects/User";
import { ACHIEVEMENTS } from "../constants/achievements";
import { STATUS } from "../constants/status";
import { playSound } from "../utils/sound";
import { useAuth } from "../hooks/useAuth";

export default function LanguageSelector() {
    const { i18n } = useTranslation();
    const [selected, setSelected] = useState(i18n.language.split('-')[0] || DateTime.local().locale);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const { toast } = useToasts();
    const { assets } = useAuth();
    const listRef = useRef<HTMLUListElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        i18n.changeLanguage(selected);
    }, [])


    useEffect(() => {
        i18n.changeLanguage(selected);
        (async () => {
            if (i18n.language == 'en') {
                if (!User.getInstance().hasAchievement(ACHIEVEMENTS.SETTINGS_SWITCH_TO_ENGLISH)) {
                    const donationsAmount = Math.floor(Math.random() * 18) + 1;
                    toast({
                        status: STATUS.ACHIEVEMENT,
                        message: ACHIEVEMENTS.SETTINGS_SWITCH_TO_ENGLISH,
                        donationsAmount: donationsAmount,
                    });
                    User.getInstance().addDonation(donationsAmount);
                    User.getInstance().addAchievement(ACHIEVEMENTS.SETTINGS_SWITCH_TO_ENGLISH);

                }
            }
        })();
    }, [selected]);

    const toggleList = () => {
        if (listRef.current && buttonRef.current) {
            const isHidden = listRef.current.classList.contains('hidden');
            listRef.current.classList.toggle('hidden');

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }

            if (!isHidden) return;

            timeoutRef.current = setTimeout(() => {
                if (listRef.current && buttonRef.current && !listRef.current.classList.contains('hidden')) {
                    listRef.current.classList.add('hidden');
                    buttonRef.current.classList.remove('bg-tertiary-600');
                }
            }, 5000);
        }
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const languages = [
        { value: "fr", label: "Français", icon: "twemoji:flag-france" },
        { value: "en", label: "English", icon: "twemoji:flag-united-kingdom" },
    ];

    return (
        <div className={`relative w-full max-w-[250px] flex justify-center items-center`}>
            <button ref={buttonRef} className={`flex cursor-pointer h-10 justify-center w-full px-2 py-0.5 gap-3 bg-gray-200 font-semibold text-black sm:rounded-sm hover:bg-gray-300 hover:text-black mb-1 items-center transitions active:scale-95 focus:outline-black`} onClick={() => {
                playSound(assets?.sounds.click)
                toggleList();
            }}>
                <Icon icon={languages.find((lang) => lang.value === selected)?.icon || 'twemoji:flag-france'} className={`object-cover h-6 w-8`} />
                {languages && (
                    languages.find((lang) => lang.value === selected)?.label || 'Français'
                )}
            </button>
            <ul ref={listRef} className={`absolute top-[110%] w-full sm:rounded-sm justify-center flex-col items-center gap-1 left-1/2 -translate-x-1/2`}>
                {languages.map((lang) => (
                    lang.value !== selected && (
                        <li
                            key={lang.value}
                            data-lang={lang.value}
                            onClick={() => {
                                playSound(assets?.sounds.click)
                                toggleList();
                                setSelected(lang.value);
                            }}
                            className={`transitions cursor-pointer flex justify-center px-2 py-0.5 gap-3 text-white font-semibold sm:rounded-sm hover:text-black w-full items-center hover:bg-gray-300 active:scale-90 transitions`}
                        >
                            <Icon icon={lang.icon} className="object-cover h-10 py-2 w-6" />
                            {
                                lang.label
                            }
                        </li>
                    )
                ))}
            </ul>
        </div>
    );
}