import {
  Modal,
  ModalProps,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { styles } from "./styles";
import { THEME } from "../../theme";
import { Check, CheckCircle } from "phosphor-react-native";
import { Heading } from "../Heading";

import * as Clipboard from "expo-clipboard";
import { useState } from "react";

interface Props extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
  const [isCopping, setIsCopping] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyDiscordToClipboard = async () => {
    setIsCopping(true);
    await Clipboard.setStringAsync(discord);

    setIsCopping(false);
    setIsCopied(true);

    setTimeout(() => setIsCopied(false), 2000);
  };

  const getDiscordText = () => {
    if (isCopping) {
      return <ActivityIndicator color={THEME.COLORS.PRIMARY} />;
    } else if (isCopied) {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Check
            size={20}
            color={THEME.COLORS.SUCCESS}
            weight="bold"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.discord}>Copiado com êxito</Text>
        </View>
      );
    }

    return discord;
  };

  return (
    <Modal transparent statusBarTranslucent animationType="fade" {...rest}>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeIcon}>
            <MaterialIcons
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500}
              onPress={onClose}
            />
          </TouchableOpacity>
          <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight="bold" />
          <Heading
            title="Let’s play!"
            subtitle="Agora é só começar a jogar!"
            style={{ alignItems: "center", marginTop: 24 }}
          />

          <Text style={styles.label}>Adicione no Discord</Text>

          <TouchableOpacity
            style={styles.discordButton}
            onPress={handleCopyDiscordToClipboard}
            disabled={isCopping || isCopied}
          >
            <Text style={styles.discord}>{getDiscordText()}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
