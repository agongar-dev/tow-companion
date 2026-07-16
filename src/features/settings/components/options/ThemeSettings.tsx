import { t } from "i18next";
import DropDownSelect from "../../../../components/DropDownSelect";
import { useTheme } from "../../../../lib/theme/context/ThemeContext";
import { ThemeMode } from "../../../../lib/theme/types";
import SettingsRow from "../SettingsRow";

const ThemeSettings = () => {
  const { mode, toggleTheme } = useTheme();

  const changeTheme = (targetMode: ThemeMode) => {
    if (targetMode !== mode) {
      toggleTheme();
    }
  };

  return (
    <SettingsRow label={t("theme.title")}>
      <DropDownSelect
        onSelect={(value: string) => changeTheme(value as ThemeMode)}
        placeholder={t("theme.select")}
        options={Object.values(ThemeMode).map((themeOption) => ({
          value: themeOption,
          label: t(`theme.${themeOption}`),
        }))}
        selected={mode}
      />
    </SettingsRow>
  );
};

export default ThemeSettings;
