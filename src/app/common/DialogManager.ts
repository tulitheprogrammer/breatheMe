import { Alert } from 'react-native';

export interface DialogConfig {
  title: string;
  message: string;
  yesText: string;
  noText: string;
  yesCallBack: () => void;
  noCallBack: () => void;
  neutralText?: string;
  neutralCallback?: () => void;
}

export class DialogManager {
  public showDialogWithConfigs(config: DialogConfig) {
    Alert.alert(
      config.title,
      config.message,
      [
        {
          text: config.noText,
          onPress: () => config.noCallBack,
        },
        {
          text: config.yesText,
          onPress: () => config.yesCallBack,
        },
        config.neutralText
          ? {
              text: config.neutralText,
              onPress: () => config.neutralCallback,
            }
          : {},
      ],
      {
        cancelable: false,
      },
    );
  }

  public buildSimpleAlert(message: string) {
    alert(message);
  }
}
