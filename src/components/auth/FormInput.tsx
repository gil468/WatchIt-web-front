import { useFormContext } from "react-hook-form";

interface RegisterFormInputProps {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  validFeedback?: boolean;
}

const FormInput: React.FC<RegisterFormInputProps> = ({
  name,
  label,
  type,
  placeholder = "",
  validFeedback = false,
}: RegisterFormInputProps) => {
  const {
    register,
    formState: { errors, dirtyFields },
  } = useFormContext();

  return (
    <div className={`mb-3`}>
      <label htmlFor={name}>{label}:</label>
      <input
        {...register(name)}
        type={type}
        id={name}
        placeholder={placeholder}
        accept={type === "file" ? "image/png, image/jpeg" : undefined}
        className="form-control"
      />
      {(errors[name] && (
        <p className="text-danger ms-1">{errors[name]?.message?.toString()}</p>
      )) ||
        (validFeedback && dirtyFields[name] && (
          <p className="text-success ms-1">Looks Good!</p>
        ))}
    </div>
  );
};

export default FormInput;
