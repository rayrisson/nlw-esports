import * as Notifications from "expo-notifications";

export const getPushNotificationToken = async () => {
  const { granted } = await Notifications.getPermissionsAsync();

  if (!granted) {
    Notifications.requestPermissionsAsync();
  } else {
    const { data: pushToken } = await Notifications.getExpoPushTokenAsync();
    console.log("NOTIFICATION TOKEN =>", pushToken);

    return pushToken;
  }
};
