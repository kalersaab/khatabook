import { useTranslation } from "react-i18next";

const useAppTranslation = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  const currentLanguage = i18n.language;

  return { t, changeLanguage, currentLanguage };
};

export default useAppTranslation;
