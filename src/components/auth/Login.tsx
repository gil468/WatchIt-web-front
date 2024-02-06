import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput, { FormInputProps } from "./FormInput";
import { googleSignin, login } from "../../services/user-service";
import { CodeResponse, useGoogleLogin } from "@react-oauth/google";

const schema = z.object({
  email: z.string().email("Email is invalid"),
  password: z.string().min(5, "Password must contain at least 5 characters"),
});

type FormData = z.infer<typeof schema>;

const inputFields: FormInputProps[] = [
  {
    name: "email",
    label: "Email",
    type: "text",
    placeholder: "a@example.com",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "your secret password",
  },
];

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [shake, setShake] = useState(false);
  const [submittedUnauthorized, setSubmittedUnauthorized] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onErrorSubmit = () => {
    setSubmittedUnauthorized(false);
    setShake(true);
  };

  const onSubmit = async ({ email, password }: FormData) => {
    setSubmittedUnauthorized(false);
    try {
      await login({
        email,
        password,
      });
      navigate("/");
    } catch (err) {
      setShake(true);
      setSubmittedUnauthorized(true);
    }
  };

  const onGoogleLoginSuccess = async (credentialResponse: CodeResponse) => {
    await googleSignin(credentialResponse);
    navigate("/");
  };

  const googleLogin = useGoogleLogin({
    onSuccess: onGoogleLoginSuccess,
    flow: "auth-code",
  });

  return (
    <div className="d-flex min-vh-100 align-items-center justify-content-center">
      <div
        className={`border border-2 p-4 rounded ${shake && "shake"}`}
        onAnimationEnd={() => setShake(false)}
        style={{
          maxWidth: "30rem",
        }}
      >
        <div className="text-center">
          <h1>Login</h1>
          <p className="text-muted mt-3">
            Enter your email and password to login to your account
          </p>
        </div>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onErrorSubmit)}>
            <div className="mb-4">
              {inputFields.map((field) => (
                <FormInput key={field.name} {...field} />
              ))}
            </div>
            <div className={`text-center`}>
              {submittedUnauthorized && (
                <span className="text-danger">
                  Email or password are incrorect
                </span>
              )}
              <button type="submit" className="btn btn-dark w-100 mt-1 mx-auto">
                Login
              </button>
            </div>
          </form>
        </FormProvider>

        <div className="d-flex justify-content-center mt-2">
          <button
            type="submit"
            className="btn btn-outline-dark w-100 mx-auto"
            onClick={() => googleLogin()}
          >
            <i className="bi bi-google me-2" />
            Login With Google
          </button>
        </div>

        <hr className="mb-2" />

        <div className="text-center">
          <a className="text-black" href="/register">
            Don't have an account? Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
