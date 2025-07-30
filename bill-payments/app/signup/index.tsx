import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Pressable,
  ToastAndroid,
} from "react-native";
import React from "react";
import { useFormik } from "formik";
import { useSignupUser } from "@/hooks/users/mutation";
import useAppTranslation from "@/hooks/useTranslation";

const SignUp = () => {
  const { t } = useAppTranslation();
  const signup: any = useSignupUser();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      signup
        .mutateAsync({ body: values })
        .then((res: any) => {
          formik.resetForm();
        })
        .catch((err: { message: string }) => {
          console.error(err.message);
          formik.resetForm();
        });
    },
  });
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
        }}
        style={styles.logo}
      />
      <Text style={styles.title}>{t('acc')}</Text>
      <TextInput
        style={styles.input}
        placeholder="firstName "
        value={formik.values.firstName}
        onChangeText={formik.handleChange("firstName")}
        autoCapitalize="none"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder={t("bill")}
        value={formik.values.lastName}
        onChangeText={formik.handleChange("lastName")}
        autoCapitalize="none"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder={t("email")}
        value={formik.values.email}
        onChangeText={formik.handleChange("email")}
        autoCapitalize="none"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder={t("password")}
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        secureTextEntry
        placeholderTextColor="#aaa"
      />
      <Pressable
        style={styles.button}
        onPress={() => formik.handleSubmit()}
        onLongPress={() => ToastAndroid.show(t("signup"), ToastAndroid.SHORT)}
      >
        <Text style={styles.buttonText}>{t("signup")}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#0d1117",
  },
  logo: {
    width: 64,
    height: 64,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#c9d1d9",
    marginBottom: 24,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#30363d",
    borderRadius: 6,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#161b22",
    color: "#c9d1d9",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#238636",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerText: {
    color: "#8b949e",
    fontSize: 14,
    marginTop: 16,
  },
  link: {
    color: "#58a6ff",
    textDecorationLine: "underline",
  },
});
export default SignUp;
