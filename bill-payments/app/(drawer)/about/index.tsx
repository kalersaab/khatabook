import { View, Text, StyleSheet, I18nManager } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t, i18n } = useTranslation();
  
  // Check if current language is RTL
  const isRTL = I18nManager.isRTL || ['ur', 'ar', 'fa'].includes(i18n.language);

  return (
    <View style={[
      styles.container,
      isRTL && styles.rtlContainer
    ]}>
      <Text style={[
        styles.title,
        isRTL && styles.rtlText
      ]}>
        {t('about.title')}
      </Text>
      
      <Text style={[
        styles.paragraph,
        isRTL && styles.rtlText
      ]}>
        {t('about.description')}
      </Text>
      
      <Text style={[
        styles.subtitle,
        isRTL && styles.rtlText
      ]}>
        {t('about.features_title')}
      </Text>
      
      <View style={isRTL && styles.rtlFeatureList}>
        <Text style={styles.featureItem}>
          • {t('about.feature1')}
        </Text>
        
        <Text style={styles.featureItem}>
          • {t('about.feature2')}
        </Text>
        
        <Text style={styles.featureItem}>
          • {t('about.feature3')}
        </Text>
      </View>
      
      <Text style={[
        styles.paragraph,
        isRTL && styles.rtlText
      ]}>
        {t('about.version')}
      </Text>
      
      <Text style={[
        styles.copyright,
        isRTL && styles.rtlText
      ]}>
        {t('about.copyright')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(75,75,75)',
    padding: 20,
  },
  rtlContainer: {
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    marginBottom: 15,
    textAlign: 'left',
  },
  paragraph: {
    fontSize: 16,
    color: 'white',
    marginBottom: 15,
    textAlign: 'left',
    lineHeight: 24,
  },
  featureItem: {
    fontSize: 16,
    color: 'white',
    marginLeft: 10,
    marginBottom: 5,
    textAlign: 'left',
  },
  copyright: {
    fontSize: 16,
    color: 'white',
    textAlign: 'left',
  },
  rtlText: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  rtlFeatureList: {
    alignItems: 'flex-end',
  },
});

export default About;