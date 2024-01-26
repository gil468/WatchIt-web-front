import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import z from "zod";
import "./shake.css";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "./FormInput";
import { IUser, googleSignin, login } from "../../services/user-service";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

const schema = z.object({
  email: z.string().email("Email is invalid"),
  password: z.string().min(5, "Password must contain at least 5 characters"),
});

type FormData = z.infer<typeof schema>;

const inputFields: { name: keyof FormData; label: string; type: string }[] = [
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
];

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [shake, setShake] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async ({ email, password }: FieldValues) => {
    const user: IUser = {
      email,
      password,
    };
    const res = await login(user);
    console.log(res);

    navigate("/");
  };

  const onErrorSubmit = () => {
    setShake(true);
  };

  function onGoogleLoginSuccess(credentialResponse: CredentialResponse): void {
    googleSignin(credentialResponse);
  }

  function onGoogleLoginFailure(): void {
    throw new Error("Function not implemented.");
  }

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
        <h1>Log In</h1>
      </div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onErrorSubmit)}>
          {inputFields.map((field) => (
            <FormInput key={field.name} {...field} />
          ))}

          <div className="text-center">
            <button type="submit" className="btn btn-dark mx-auto">
              Log In
            </button>
          </div>
        </form>
      </FormProvider>

      <hr></hr>
      <div className="d-flex justify-content-center">
        <GoogleLogin
          onSuccess={onGoogleLoginSuccess}
          onError={onGoogleLoginFailure}
          theme="filled_black"
        />
      </div>

      <hr></hr>

      <div className="text-center">
        <a className="text-black" href="/register">
          Don't have an account yet?
        </a>
      </div>
    </div>
  );
};

export default Login;
