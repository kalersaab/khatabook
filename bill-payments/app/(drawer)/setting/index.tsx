import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
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

      {languages.map((lang) => (
        <TouchableOpacity
          key={lang.code}
          style={[
            styles.languageButton,
            i18n.language === lang.code && styles.selectedLanguage,
          ]}
          onPress={() => i18n.changeLanguage(lang.code)}
        >
          <Text style={styles.languageText}>{lang.name}</Text>
          {i18n.language === lang.code && (
            <Text style={styles.selectedIcon}>✓</Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  languageButton: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedLanguage: {
    backgroundColor: "#f5f5f5",
  },
  languageText: {
    fontSize: 16,
  },
  selectedIcon: {
    color: "green",
    fontWeight: "bold",
  },
});

export default LanguageScreen;
