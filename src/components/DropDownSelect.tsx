import { clsx } from "clsx";
import { useState } from "react";
import {
  Modal,
  TouchableOpacity,
  FlatList,
} from "react-native";
import ThemedText from "./ThemedText";
import ThemedTouchable from "./ThemedTouchable";
import ThemedView from "./ThemedView";

type NavOption = {
    label: string;
    value: string;
}

type DropDownSelectProps = {
  options: NavOption[];
  selected: string | null;
  onSelect: (value: string) => void;
  placeholder?: string;
};

const DropDownSelect = ({
  options,
  selected,
  onSelect,
  placeholder,
}: DropDownSelectProps) => {
  const [visible, setVisible] = useState(false);

  const toggleDropDown = () => setVisible(!visible);

  const handleSelect = (value: string) => {
    onSelect(value);
    setVisible(false);
  };

  const selectedLabel = options.find((opt) => opt.value === selected)?.label;

  return (
    <ThemedView className="items-start">
      <ThemedTouchable
        onPress={toggleDropDown}
        className={clsx(
          "border px-4 py-2 rounded-xl shadow-md shadow-ink/30 max-w-[500] w-auto"
        )}
      >
        <ThemedText className="text-ink text-xl">
          {selectedLabel || placeholder}
        </ThemedText>
      </ThemedTouchable>

      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          className="flex-1 justify-center items-center bg-black/40"
          onPress={toggleDropDown}
          activeOpacity={1}
        >
          <ThemedView
            className="rounded-xl p-4 w-64 border"
          >
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <ThemedTouchable
                  className="py-2 px-3 rounded"
                  onPress={() => handleSelect(item.value)}
                >
                  <ThemedText>{item.label}</ThemedText>
                </ThemedTouchable>
              )}
            />
          </ThemedView>
        </TouchableOpacity>
      </Modal>
    </ThemedView>
  );
};

export default DropDownSelect;
