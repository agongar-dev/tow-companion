import { useTranslation } from "react-i18next";
import DropDownSelect from "../../../../components/DropDownSelect";
import { useSettings } from "../../../../lib/settings/context/SettingsContext";
import { ArmiesOrPlayers } from "../../../../lib/settings/types";
import SettingsRow from "../SettingsRow";

const NavSettings = () => {
    const { armiesOrPlayers, setNavShowArmiesOrPlayers } = useSettings();

    const { t } = useTranslation();

    const changeNavSettings = (targetMode: ArmiesOrPlayers) => {
        if (targetMode !== armiesOrPlayers) {
            setNavShowArmiesOrPlayers(targetMode);
        }
    };

    return (
        <SettingsRow label={t("navSettings.title")}>
            <DropDownSelect
                onSelect={(value: string) => changeNavSettings(value as ArmiesOrPlayers)}
                placeholder={t(`navSettings.list.${armiesOrPlayers}`) || t('navSettings.select')}
                options={Object.values(ArmiesOrPlayers).map((navShowOption) => ({
                    value: navShowOption,
                    label: t(`navSettings.list.${navShowOption}`),
                }))}
                selected={t(`navSettings.list.${armiesOrPlayers}`)}
            />
        </SettingsRow>
    );
};

export default NavSettings;
