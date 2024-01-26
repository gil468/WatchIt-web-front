import { useFormContext } from "react-hook-form";

interface RegisterFormInputProps {
  name: string;
  label: string;
  type: string;
  validFeedback?: boolean;
}

const FormInput: React.FC<RegisterFormInputProps> = ({
  name,
  label,
  type,
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
        accept={type === "file" ? "image/png, image/jpeg" : undefined}
        className="form-control"
      />
      {(errors[name] && (
        <p className="text-danger">{errors[name]?.message?.toString()}</p>
      )) ||
        (validFeedback && dirtyFields[name] && (
          <p className="text-success">Looks Good!</p>
        ))}
    </div>
  );
};

export default FormInput;
