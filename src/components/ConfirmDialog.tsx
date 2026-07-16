import { useTranslation } from "react-i18next";
import { Alert } from "react-native";

export const useConfirmDialog = () => {
    const { t } = useTranslation();

    return (message?: string, onConfirm?: () => void) => {
        Alert.alert(
            t("confirmDialog.title"),
            message ?? "",
            [
                { text: t("confirmDialog.yes"), onPress: onConfirm },
                { text: "No", style: "cancel" },
            ],
            { cancelable: true }
        );
    };
};