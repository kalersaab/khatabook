import {
  View,
  Text,
  StyleSheet,
  Linking,
  Alert,
  TouchableOpacity,
} from "react-native";
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
    const phoneNumber = "918437038748";
  const message = "Hello, I’m reaching out from the app.";
  const encodedMessage = encodeURIComponent(message);
   const openWhatsApp = async () => {

    const appUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`;
    const webUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

    try {
      const canOpen = await Linking.canOpenURL(appUrl);
      if (canOpen) {
        await Linking.openURL(appUrl);
      } else {
        await Linking.openURL(webUrl);
      }
    } catch (err) {
      console.error("Error opening WhatsApp", err);
    }
  };
  return (
    <View style={[styles.container, isRTL && styles.rtlContainer]}>
      <Text style={[styles.title, isRTL && styles.rtlText]}>
        {t("contact.title")}
      </Text>
      <Text style={textStyle}>{t("contact.name")}</Text>
      <Text style={textStyle}>{t("contact.email")}</Text>
      <TouchableOpacity onPress={openWhatsApp}>
        <Text style={textStyle}>{t("contact.phone")}</Text>
      </TouchableOpacity>
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
