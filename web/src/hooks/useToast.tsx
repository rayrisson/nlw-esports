import { CheckCircle, XCircle } from "phosphor-react";
import { useState } from "react";

const messages = {
  successful: {
    icon: <CheckCircle size={24} color="#34D399" weight="bold" />,
    title: "Anúncio publicado",
    subtitle: "Anúncio criado com éxito!",
  },
  fail: {
    icon: <XCircle size={24} color="#F87171" weight="bold" />,
    title: "Anúncio não publicado",
    subtitle: "Falha ao publicar anúncio!",
  },
};

export interface useToastReturn {
  open: boolean;
  sendMessage: (type: "successful" | "fail") => void;
  toggleOpened: (toggle: boolean) => void;
  message: {
    icon: JSX.Element;
    title: string;
    subtitle: string;
  };
  type: "successful" | "fail";
}

export const useToast = (): useToastReturn => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(messages.successful);
  const [type, setType] = useState<"successful" | "fail">("successful");

  const toggleOpened = (toggle: boolean) => {
    setOpen(toggle);
  };
  const sendMessage = (type: "successful" | "fail") => {
    setMessage(type == "successful" ? messages.successful : messages.fail);
    setType(type);
    setOpen(true);
  };

  return { open, sendMessage, toggleOpened, message, type };
};
