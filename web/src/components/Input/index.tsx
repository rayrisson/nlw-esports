interface InputProps extends React.HTMLProps<HTMLInputElement> {
  error?: boolean;
}

const Input = ({ error = false, ...props }: InputProps) => {
  return (
    <input
      {...props}
      className={`bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 autofill:bg-zinc-500 ${
        error && "border border-red-500 focus:border-red-500 outline-none"
      }`}
    />
  );
};

export default Input;
