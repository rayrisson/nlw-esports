import { useToast, useToastReturn } from "../../hooks/useToast";
import * as Toast from "@radix-ui/react-toast";

interface ToastProps {
  state: useToastReturn;
}

const ToastForm = ({ state }: ToastProps) => {
  return (
    <Toast.Provider duration={3000}>
      <Toast.Root
        open={state.open}
        onOpenChange={state.toggleOpened}
        className={`bg-[#2A2634] rounded-md p-3 w-72 flex items-center gap-4 border data-state-open:animate-slide-in data-state-closed:animate-slide-out ${
          state.type === "successful" ? "border-[#34D399]" : "border-[#F87171]"
        }`}
      >
        {state.message.icon}
        <div>
          <Toast.Title className="text-white font-semibold">
            {state.message.title}
          </Toast.Title>
          <Toast.Description className="text-zinc-500 text-sm">
            {state.message.subtitle}
          </Toast.Description>
        </div>
      </Toast.Root>
      <Toast.Viewport className="fixed bottom-8 right-8 z-50" />
    </Toast.Provider>
  );
};

export default ToastForm;
