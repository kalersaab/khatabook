import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useTranslation } from "react-i18next";

const LanguageScreen = () => {
  const { t, i18n } = useTranslation();

  const languages = [
    { code: "pa", name: "ਪੰਜਾਬੀ" },
    { code: "en", name: "English" },
    { code: "fr", name: "Français" },
    { code: "ur", name: "اردو" },
    { code: "hi", name: "हिन्दी" },
    { code: "es", name: "Español" },
    { code: "ja", name: "日本語" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("settings.language")}</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={i18n.language}
          onValueChange={(value) => {
            if (typeof value === "string") {
              i18n.changeLanguage(value);
            }
          }}
          mode="dropdown"
          style={styles.picker}
          dropdownIconColor="#444"
          accessibilityLabel={'language'}
        >
          {languages.map((lang) => (
            <Picker.Item
              key={lang.code}
              label={lang.name}
              value={lang.code}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: "rgb(75,75,75)",
  },
  title: {
    fontSize: 20,
    marginBottom: 12,
    color:"rgb(238, 238, 238)",
    fontWeight: "600",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    color:"rgb(238, 238, 238)",
    overflow: "hidden",
  },
  picker: {
    height: 50,
    width: "100%",
    color:"rgb(238, 238, 238)",
  },
});

export default LanguageScreen;
