import { useTranslation } from "react-i18next";
import ThemedText from "../../../../components/ThemedText";
import ThemedTouchable from "../../../../components/ThemedTouchable";
import { clearStorage } from "../../../../lib/mmkv/storage";
import SettingsRow from "../SettingsRow";
import { useConfirmDialog } from "../../../../components/ConfirmDialog";

const ResetSettings = () => {
    const { t } = useTranslation();
    const confirmDialog = useConfirmDialog();

    const handleRestore = () => {
        confirmDialog(t("resetSettings.confirm"), () => {
            clearStorage();
        });
    };

    return (
        <SettingsRow label={t("resetSettings.title")}>
            <ThemedTouchable onPress={handleRestore}>
                <ThemedText>{t("resetSettings.reset")}</ThemedText>
            </ThemedTouchable>
        </SettingsRow>
    );
};

export default ResetSettings;
