import { PermissionsAndroid, Platform } from "react-native";

type PermissionResult = {
  [key: string]: PermissionsAndroid.PermissionStatus;
};

export const handleAndroidPermissions = async (): Promise<boolean> => {
  try {
    if (Platform.OS !== 'android') {
      console.debug('[handleAndroidPermissions] Not Android, permissions not required');
      return true;
    }

    // Android 12+ (API 31+)
    if (Platform.Version >= 31) {
      const result: PermissionResult = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, // Still recommended for backward compatibility
      ]);

      const permissionsGranted = (
        result['android.permission.BLUETOOTH_SCAN'] === PermissionsAndroid.RESULTS.GRANTED &&
        result['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED
      );

      if (permissionsGranted) {
        console.debug('[handleAndroidPermissions] Android 12+ permissions granted');
        return true;
      } else {
        console.error('[handleAndroidPermissions] Android 12+ permissions denied', result);
        return false;
      }
    }
    // Android 6-11 (API 23-30)
    else if (Platform.Version >= 23) {
      const checkResult = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );

      if (checkResult) {
        console.debug('[handleAndroidPermissions] Location permission already granted');
        return true;
      }

      const requestResult = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );

      if (requestResult === PermissionsAndroid.RESULTS.GRANTED) {
        console.debug('[handleAndroidPermissions] Location permission granted');
        return true;
      } else {
        console.error('[handleAndroidPermissions] Location permission denied');
        return false;
      }
    }
    // Android <6 (API <23) - No runtime permissions needed
    else {
      console.debug('[handleAndroidPermissions] No runtime permissions needed for Android <6');
      return true;
    }
  } catch (error) {
    console.error('[handleAndroidPermissions] Error checking/requesting permissions:', error);
    return false;
  }
};