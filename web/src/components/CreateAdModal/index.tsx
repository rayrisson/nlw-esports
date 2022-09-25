import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import * as Select from "@radix-ui/react-select";
import {
  CaretDown,
  Check,
  CircleNotch,
  GameController,
  X,
} from "phosphor-react";
import Input from "../Input";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "../../hooks/useToast";
import ToastForm from "../ToastForm";
import { useForm, Controller } from "react-hook-form";
import ErrorText from "../ErrorText";
import ToggleGroupItem from "../ToggleGroupItem";

interface Game {
  id: string;
  title: string;
}

interface CreateAdModalProps {
  children: React.ReactNode;
}

interface FormValues {
  game: string;
  name: string;
  discord: string;
  yearsPlaying: string;
  hourStart: string;
  hourEnd: string;
  useVoiceChannel: boolean;
  weekDays: string[];
}

const CreateAdModal = ({ children }: CreateAdModalProps) => {
  const [games, setGames] = useState<Game[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSendingPost, setIsSendingPost] = useState(false);

  const toastState = useToast();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      name: "",
      yearsPlaying: "",
      discord: "",
      useVoiceChannel: true,
      weekDays: [],
    },
  });

  useEffect(() => {
    axios("http://localhost:3000/games").then((response) =>
      setGames(response.data)
    );
  }, []);

  const handleCreateAd = async (formData: FormValues) => {
    const { game, yearsPlaying, weekDays, ...data } = formData;

    setIsSendingPost(true);

    try {
      await axios.post(`http://localhost:3000/games/${game}/ads`, {
        ...data,
        weekDays: weekDays.map(Number),
        yearsPlaying: Number(yearsPlaying),
      });

      setIsModalOpen(false);
      toastState.sendMessage("successful");
    } catch (e) {
      console.error(e);
      toastState.sendMessage("fail");
    }

    setIsSendingPost(false);
  };

  return (
    <>
      <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
        {children}
        <Dialog.Portal>
          <Dialog.Overlay
            className={`bg-black/60 inset-0 fixed data-state-open:animate-fade-in data-state-closed:animate-fade-out`}
          />

          <Dialog.Content
            onCloseAutoFocus={() => reset()}
            className={`data-state-open:animate-bottom-to-top data-state-closed:animate-top-to-bottom fixed bg-[#2A2634] py-8 px-10 rounded-lg text-white shadow-lg shadow-black/25 w-screen sm:w-[30rem] h-screen sm:h-auto overflow-y-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
          >
            <Dialog.Title className="text-3xl text-white font-black mb-8">
              Publique um anúncio
            </Dialog.Title>

            <form
              onSubmit={handleSubmit(handleCreateAd)}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="game" className="font-semibold">
                  Qual o game?
                </label>
                <Controller
                  name="game"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <div className="flex flex-col gap-1 overflow-visible">
                      <Select.Root value={value} onValueChange={onChange}>
                        <Select.Trigger
                          className={`flex items-center justify-between px-4 py-3 rounded text-sm bg-zinc-900 text-zinc-500 ${
                            errors.game &&
                            "border border-red-500 focus:border-red-500 outline-none"
                          }`}
                        >
                          <Select.Value placeholder="Selecione o game que deseja jogar" />
                          <Select.Icon>
                            <CaretDown weight="bold" />
                          </Select.Icon>
                        </Select.Trigger>

                        <Select.Portal>
                          <Select.Content className="bg-zinc-900 rounded select-none">
                            <Select.Viewport className="py-2 px-2">
                              {games.map((game) => (
                                <Select.Item
                                  value={game.id}
                                  key={game.id}
                                  className="flex items-center justify-between gap-2 py-2 px-2 text-white text-sm rounded hover:bg-violet-600"
                                >
                                  <Select.ItemText>
                                    {game.title}
                                  </Select.ItemText>
                                  <Select.ItemIndicator>
                                    <Check weight="bold" />
                                  </Select.ItemIndicator>
                                </Select.Item>
                              ))}
                            </Select.Viewport>
                          </Select.Content>
                        </Select.Portal>
                      </Select.Root>
                      {errors.game && (
                        <ErrorText>Esse campo é obrigatório!</ErrorText>
                      )}
                    </div>
                  )}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="name">Seu nome (ou nickname)</label>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { ref, ...rest } }) => (
                    <div className="flex flex-col gap-1" ref={ref}>
                      <Input
                        id="name"
                        placeholder="Como te chamam dentro do game?"
                        error={!!errors.name}
                        {...rest}
                      />
                      {errors.name && (
                        <ErrorText>Esse campo é obrigatório!</ErrorText>
                      )}
                    </div>
                  )}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                  <Controller
                    name="yearsPlaying"
                    control={control}
                    rules={{ required: true, min: 0 }}
                    render={({ field: { ref, ...rest } }) => (
                      <div className="flex flex-col gap-1" ref={ref}>
                        <Input
                          id="yearsPlaying"
                          type="number"
                          placeholder="Tudo bem ser ZERO"
                          min={0}
                          error={!!errors.yearsPlaying}
                          {...rest}
                        />
                        {(errors.yearsPlaying?.type == "required" && (
                          <ErrorText>Esse campo é obrigatório!</ErrorText>
                        )) ||
                          (errors.yearsPlaying?.type == "min" && (
                            <ErrorText>Insira um valor positivo!</ErrorText>
                          ))}
                      </div>
                    )}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="discord">Qual seu Discord?</label>
                  <Controller
                    name="discord"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { ref, ...rest } }) => (
                      <div className="flex flex-col gap-1" ref={ref}>
                        <Input
                          id="discord"
                          placeholder="Usuario#0000"
                          error={!!errors.discord}
                          {...rest}
                        />
                        {errors.discord && (
                          <ErrorText>Esse campo é obrigatório!</ErrorText>
                        )}
                      </div>
                    )}
                  />
                </div>
              </div>

              <div className="flex gap-6 flex-wrap">
                <div className="flex flex-col gap-2">
                  <label htmlFor="weekDays">Quando costuma jogar?</label>

                  <Controller
                    name="weekDays"
                    control={control}
                    rules={{ validate: (value) => value.length !== 0 }}
                    render={({ field: { value, onChange, ...rest } }) => (
                      <>
                        <ToggleGroup.Root
                          type="multiple"
                          className="grid grid-cols-4 gap-2"
                          value={value}
                          onValueChange={onChange}
                          {...rest}
                        >
                          <ToggleGroupItem value="0" title="Domingo">
                            D
                          </ToggleGroupItem>
                          <ToggleGroupItem value="1" title="Segunda">
                            S
                          </ToggleGroupItem>
                          <ToggleGroupItem value="2" title="Terça">
                            T
                          </ToggleGroupItem>
                          <ToggleGroupItem value="3" title="Quarta">
                            Q
                          </ToggleGroupItem>
                          <ToggleGroupItem value="4" title="Quinta">
                            Q
                          </ToggleGroupItem>
                          <ToggleGroupItem value="5" title="Sexta">
                            S
                          </ToggleGroupItem>
                          <ToggleGroupItem value="6" title="Sábado">
                            S
                          </ToggleGroupItem>
                          <button
                            title="Remover todos"
                            type="button"
                            disabled={value.length === 0}
                            className={`w-8 h-8 rounded flex justify-center items-center ${
                              !value.length
                                ? "bg-zinc-600 opacity-50"
                                : "bg-[#F87171]"
                            } transition-colors duration-300`}
                            onClick={() => onChange([])}
                          >
                            <X weight="bold" />
                          </button>
                        </ToggleGroup.Root>
                        {errors.weekDays && (
                          <ErrorText>Selecione pelo menos um dia!</ErrorText>
                        )}
                      </>
                    )}
                  />
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="hourStart">Qual horário do dia?</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Controller
                      name="hourStart"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { ref, ...rest } }) => (
                        <div className="flex flex-col gap-1" ref={ref}>
                          <Input
                            id="hourStart"
                            type="time"
                            placeholder="De"
                            error={!!errors.hourStart}
                            {...rest}
                          />
                          {errors.hourStart && (
                            <ErrorText>Esse campo é obrigatório!</ErrorText>
                          )}
                        </div>
                      )}
                    />
                    <Controller
                      name="hourEnd"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { ref, ...rest } }) => (
                        <div className="flex flex-col gap-1" ref={ref}>
                          <Input
                            id="hourEnd"
                            type="time"
                            placeholder="Até"
                            error={!!errors.hourEnd}
                            {...rest}
                          />
                          {errors.hourEnd && (
                            <ErrorText>Esse campo é obrigatório!</ErrorText>
                          )}
                        </div>
                      )}
                    />
                  </div>
                </div>
              </div>

              <label className="mt-2 flex items-center gap-2 text-sm select-none">
                <Controller
                  name="useVoiceChannel"
                  control={control}
                  render={({ field: { value, onChange, ...rest } }) => (
                    <>
                      <Checkbox.Root
                        checked={value}
                        onCheckedChange={onChange}
                        className="w-6 h-6 p-1 rounded bg-zinc-900"
                        {...rest}
                      >
                        <Checkbox.Indicator>
                          <Check className="w-4 h-4 text-emerald-400" />
                        </Checkbox.Indicator>
                      </Checkbox.Root>
                      Costumo me conectar ao chat de voz
                    </>
                  )}
                />
              </label>

              <footer className="mt-4 flex justify-end gap-4 flex-wrap">
                <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 sm:w-auto w-screen">
                  Cancelar
                </Dialog.Close>
                <button
                  disabled={isSendingPost}
                  type="submit"
                  className={`flex items-center justify-center gap-3 bg-violet-500 px-5 h-12 rounded-md font-semibold hover:bg-violet-600 disabled:bg-violet-600 text-ellipsis whitespace-nowrap overflow-hidden sm:transition-flex sm:duration-500 ${
                    isSendingPost ? "sm:flex-[.10]" : "sm:flex-[.62]"
                  } flex-1`}
                >
                  {!isSendingPost ? (
                    <>
                      <div>
                        <GameController size={24} />
                      </div>{" "}
                      Encontrar duo
                    </>
                  ) : (
                    <CircleNotch size={24} className="animate-spin" />
                  )}
                </button>
              </footer>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <ToastForm state={toastState} />
    </>
  );
};

export default CreateAdModal;
