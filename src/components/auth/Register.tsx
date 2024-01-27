import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";
import "./shake.css";
import FormInput from "./FormInput";
import { uploadPhoto } from "../../services/file-service";
import { IUser, googleSignin, register } from "../../services/user-service";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

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

const inputFields: { name: keyof FormData; label: string; type: string }[] = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    type: "text",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
  },
  {
    name: "profilePicture",
    label: "Profile Picture",
    type: "file",
  },
];

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [shake, setShake] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async ({
    firstName,
    lastName,
    email,
    password,
    profilePicture,
  }: FieldValues) => {
    const imgUrl = await uploadPhoto(profilePicture[0]);

    const user: IUser = {
      firstName,
      lastName,
      email,
      password,
      imgUrl,
    };

    await register(user);
    navigate("/");
  };

  const onErrorSubmit = () => {
    setShake(true);
  };

  const onGoogleLoginSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    await googleSignin(credentialResponse);
    navigate("/");
  };

  return (
    <div
      className={`container rounded mt-5 ${shake && "shake"}`}
      onAnimationEnd={() => setShake(false)}
      style={{
        backgroundColor: "#e0e0e0",
        padding: "20px",
      }}
    >
      <div className="text-center">
        <h1>Register</h1>
      </div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onErrorSubmit)}>
          {inputFields.map((field) => (
            <FormInput key={field.name} {...field} validFeedback />
          ))}

          <div className="text-center">
            <button type="submit" className="btn btn-dark mx-auto">
              Sign Up
            </button>
          </div>
        </form>
      </FormProvider>

      <hr></hr>

      <div className="d-flex justify-content-center">
        <GoogleLogin
          onSuccess={onGoogleLoginSuccess}
          text="signup_with"
          locale="en_US"
          theme="filled_black"
        />
      </div>

      <hr></hr>

      <div className="text-center">
        <a className="text-black" href="/login">
          Already have an account?
        </a>
      </div>
    </div>
  );
};

export default Register;
