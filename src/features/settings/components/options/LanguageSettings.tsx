import { useTranslation } from "react-i18next";
import DropDownSelect from "../../../../components/DropDownSelect";
import i18n, { Languages } from "../../../../lib/i18n";
import { saveString } from "../../../../lib/mmkv/storage";
import SettingsRow from "../SettingsRow";

const LANGUAGE_STORAGE_KEY = "language";

const changeLanguage = (lang: Languages) => {
    i18n.changeLanguage(lang);
    saveString(LANGUAGE_STORAGE_KEY, lang);
};

const LanguageSettings = () => {
    const { t } = useTranslation();

    return (
        <SettingsRow label={t('language.title')}>
            <DropDownSelect
                onSelect={(value: string) => changeLanguage(value as Languages)}
                placeholder={t(`language.list.${i18n.language}`) || t('language.select')}
                options={Object.values(Languages).map((lang) => ({
                    value: lang,
                    label: t(`language.list.${lang}`),
                }))}
                selected={t(`language.list.${i18n.language}`)}
            />
        </SettingsRow>
    );
};

export default LanguageSettings;