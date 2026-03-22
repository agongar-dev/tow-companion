import { t } from "i18next";

import SettingsRow from "../SettingsRow";
import { useAudio } from "../../../../lib/audio/context/AudioContext";
import { AudioMode } from "../../../../lib/audio/types";
import DropDownSelect from "../../../../components/DropDownSelect";

const ThemeSettings = () => {
    const { mode, toggleAudio } = useAudio();

    const setAudioMode = (targetMode: AudioMode) => {
        if (targetMode !== mode) {
            toggleAudio();
        }
    };

    return (
        <SettingsRow label={t('language.title')}>
            <DropDownSelect
                onSelect={(value: string) => setAudioMode(value as AudioMode)}
                placeholder={t('audio.select')}
                options={Object.values(AudioMode).map((mode) => ({
                    value: mode,
                    label: t(`audio.list.${mode}`),
                }))}
                selected={t(`audio.list.${mode}`)}
            />
        </SettingsRow>
    );
};

export default ThemeSettings;