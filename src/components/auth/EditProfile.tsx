import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";
import "./shake.css";
import FormInput, { FormInputProps } from "./FormInput";
import { uploadPhoto } from "../../services/file-service";
import { IUser, register } from "../../services/user-service";
import EditProfileImage from "../EditProfileImage";
// import { IUser, googleSignin, register } from "../../services/user-service";
// import { CodeResponse, useGoogleLogin } from "@react-oauth/google";

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

const inputFields: FormInputProps[] = [
  {
    name: "profilePicture",
    label: "Profile Picture",
    type: "file",
  },
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

const EditProfile: React.FC = () => {
  const navigate = useNavigate();

  const [shake, setShake] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const initialImageUrl = "public/images/addImage.png";

  const onSubmit = async ({
    fullName,
    email,
    password,
    profilePicture,
  }: FormData) => {
    const imgUrl = await uploadPhoto(profilePicture[0]);

    const user: IUser = {
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

  return (
    <div className="d-flex align-items-center justify-content-center py-2">
      <div
        className={`border border-2 p-4 rounded ${shake && "shake"}`}
        onAnimationEnd={() => setShake(false)}
        style={{
          width: "35rem",
        }}
      >
        <div className="text-center">
          <h1>Edit My Profile</h1>
          <p className="text-muted mt-3">
            Please edit your information below in order to update your profile
          </p>

          {/* <img src="src/assets/react.svg"  alt="..."
          style={{ maxWidth: '100%', width: '100px', height: '100px', maxHeight: '200px', marginBottom: '10px' }}></img> */}
          <EditProfileImage imageUrl={initialImageUrl} />
        </div>

        <div
          className="overflow-auto"
          style={{
            maxHeight: "calc(100vh - 11rem)",
          }}
        >
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onErrorSubmit)}>
              {inputFields.map((field) => (
                <FormInput key={field.name} {...field} showValidFeedback />
              ))}

              <div className="text-center mt-4">
                <button type="submit" className="btn btn-dark w-100 mx-auto">
                  Update
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
