import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";
import FormInput, { FormInputProps } from "../form/FormInput";
import { uploadPhoto } from "../../services/file-service";
import { User, googleSignin, register } from "../../services/user-service";
import { CodeResponse, useGoogleLogin } from "@react-oauth/google";
import FormInputImage from "../form/FormInputFile";
import profilePicPlaceholder from "/public/images/profile_pic_placeholder.png";

const schema = z
  .object({
    fullName: z
      .string()
      .regex(
        /^[a-zA-Z]{2,}(?: [a-zA-Z]{2,}){1,3}$/,
        "Please provide a vaild full name"
      )
      .min(1, "Full Name must not be empty")
      .max(20, "Full Name must be less then 30 charecters"),
    email: z.string().email("Email is invalid"),
    password: z.string().min(5, "Password must contain at least 5 characters"),
    confirmPassword: z
      .string()
      .min(5, "Password must contain at least 5 characters"),
    profilePicture: z.any().refine((val) => {
      console.log("Hellppp", val);
      return val.length > 0;
    }, "Profile picture is required"),
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

const inputFields: FormInputProps[] = [
  {
    name: "fullName",
    label: "Full Name",
    type: "text",
    placeholder: "John Doe",
  },
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
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
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
    fullName,
    email,
    password,
    profilePicture,
  }: FormData) => {
    const imgUrl = await uploadPhoto(profilePicture[0]);

    const user: User = {
      fullName,
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

  const onGoogleLoginSuccess = async (credentialResponse: CodeResponse) => {
    await googleSignin(credentialResponse);
    navigate("/");
  };

  const googleLogin = useGoogleLogin({
    onSuccess: onGoogleLoginSuccess,
    flow: "auth-code",
  });

  return (
    <div className="d-flex min-vh-100 align-items-center justify-content-center py-2">
      <div
        className={`border border-2 p-4 rounded ${shake && "shake"}`}
        onAnimationEnd={() => setShake(false)}
        style={{
          width: "35rem",
        }}
      >
        <div className="text-center">
          <h1>Register</h1>
          <p className="text-muted mt-3">
            Please provide your information below to sign up for our website
          </p>
        </div>
        <div
          className="overflow-auto"
          style={{
            maxHeight: "calc(100vh - 11rem)",
          }}
        >
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onErrorSubmit)}>
              <FormInputImage
                name={"profilePicture"}
                label={"Profile Picture"}
                defaultImage={profilePicPlaceholder}
              />
              {inputFields.map((field) => (
                <FormInput key={field.name} {...field} showValidFeedback />
              ))}

              <div className="text-center mt-4">
                <button type="submit" className="btn btn-dark w-100 mx-auto">
                  Sign Up
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
              Sign Up With Google
            </button>
          </div>

          <hr className="mb-2" />

          <div className="text-center">
            <a className="text-black text-center" href="/login">
              Already have an account? Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
