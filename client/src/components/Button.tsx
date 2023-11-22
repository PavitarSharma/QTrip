interface ButtonProp {
  label: string;
  onClick: (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void | Promise<void>;
  type?: "submit" | "button" | "reset";
  isLoading?: boolean;
}

const Button = ({
  label,
  onClick,
  type = "button",
  isLoading = false,
}: ButtonProp) => {
  return (
    <button
      type={type}
      disabled={isLoading}
      onClick={onClick}
      className={`w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
        isLoading ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {isLoading ? <span>Loading...</span> : label}
    </button>
  );
};

export default Button;
