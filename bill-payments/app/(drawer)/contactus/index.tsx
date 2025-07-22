import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { I18nManager } from "react-native";

const ContactUs = () => {
  const { t, i18n } = useTranslation();
  const isRTL = ["ur", "ar"].includes(i18n.language);
  I18nManager.forceRTL(isRTL);

  const textStyle: any = {
    fontSize: 16,
    color: "white",
    marginBottom: 15,
    lineHeight: 24,
    textAlign: isRTL ? "right" : "left",
    writingDirection: isRTL ? "rtl" : "ltr",
  };

  return (
    <View style={[styles.container, isRTL && styles.rtlContainer]}>
      <Text style={[styles.title, isRTL && styles.rtlText]}>
        {t("contact.title")}
      </Text>

      <Text style={textStyle}>{t("contact.name")}</Text>

      <Text style={textStyle}>{t("contact.email")}</Text>

      <Text style={textStyle}>{t("contact.phone")}</Text>

      <Text style={textStyle}>{t("contact.address")}</Text>

      <Text style={textStyle}>{t("contact.social")}</Text>

      <Text style={textStyle}>{t("contact.version")}</Text>

      <Text style={[styles.copyright, isRTL && styles.rtlText]}>
        {t("contact.copyright")}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(75,75,75)",
    padding: 20,
  },
  rtlContainer: {
    alignItems: "flex-end",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    textAlign: "left",
  },
  copyright: {
    fontSize: 16,
    color: "white",
    textAlign: "left",
  },
  rtlText: {
    textAlign: "right",
    writingDirection: "rtl",
  },
});

export default ContactUs;
