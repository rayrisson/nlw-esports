interface ErrorTextProps {
  children: React.ReactNode;
}

const ErrorText = ({ children }: ErrorTextProps) => {
  return <small className="text-red-500 text-xs">{children}</small>;
};

export default ErrorText;
