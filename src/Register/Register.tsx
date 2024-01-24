import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";
import "./register.css";

const schema = z
  .object({
    firstName: z
      .string()
      .min(1, "First Name must not be empty")
      .max(20, "First Name must be less then 20 charecters"),
    lastName: z
      .string()
      .min(1, "Last Name must not be empty")
      .max(20, "Last Name must be less then 20 charecters"),
    email: z.string().email("Email is invalid"),
    password: z.string().min(5, "Password must contain at least 5 characters"),
    confirmPassword: z
      .string()
      .min(5, "Password must contain at least 5 characters"),
    profilePicture: z
      .any()
      .refine((val) => val.length > 0, "Profile picture is required"),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );

type FormData = z.infer<typeof schema>;
export type FormField = keyof FormData;

function Register() {
  const navigate = useNavigate();

  const [shake, setShake] = useState(false);

  const {
    register,
    handleSubmit,

    formState: { errors, dirtyFields },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onChange" });

  const onSubmit = (data: FieldValues) => {
    console.log("on submit");
    console.log(data);
    navigate("/");
  };

  const onErrorSubmit = () => {
    setShake(true);
    setTimeout(() => {
      setShake(false);
    }, 750);
  };

  const formProperty = (
    field: FormField,
    displayName: string,
    type: string
  ) => {
    return (
      <div className={`mb-3`}>
        <label htmlFor={field}>{displayName}:</label>
        <input
          {...register(field)}
          type={type}
          id={field}
          accept={type === "file" ? "image/png, image/jpeg" : undefined}
          className="form-control"
        />
        {(errors[field] && (
          <p className="text-danger">{errors[field]?.message?.toString()}</p>
        )) ||
          (dirtyFields[field] && <p className="text-success">Looks Good!</p>)}
      </div>
    );
  };

  return (
    <div
      className={`container mt-5 ${shake && "shake"}`}
      style={{
        backgroundColor: "#e0e0e0",
        padding: "20px",
      }}
    >
      <div className="text-center">
        <h1>Register</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit, onErrorSubmit)}>
        {formProperty("firstName", "First Name", "text")}
        {formProperty("lastName", "Last Name", "text")}
        {formProperty("email", "Email", "text")}
        {formProperty("password", "Password", "password")}
        {formProperty("confirmPassword", "Confirm Password", "password")}
        {formProperty("profilePicture", "Profile Picture", "file")}

        <div className="text-center">
          <button type="submit" className="btn btn-primary mx-auto">
            Sign Up
          </button>
        </div>
      </form>

      <hr></hr>

      <div className="text-center">
        <button type="button" className="btn btn-primary" onClick={() => {}}>
          <img
            src="../images/apple.png"
            className="me-2"
            width="40"
            height="40"
          />
          Sign up with Apple
        </button>
      </div>

      <hr></hr>

      <div className="text-center">
        <a href="#">Already have an account?</a>
      </div>
    </div>
  );
}

export default Register;
