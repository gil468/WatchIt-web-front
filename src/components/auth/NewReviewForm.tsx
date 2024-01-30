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
import { IReview, createReview } from "../../services/review-service";
// import { IUser, googleSignin, register } from "../../services/user-service";
// import { CodeResponse, useGoogleLogin } from "@react-oauth/google";

const schema = z
  .object({
    description: z.string().min(1, "Description can't be empty"),
    score: z.number().min(1).max(5),
    reviewPicture: z
      .any()
      .refine((val) => val.length > 0, "Review picture is required"),
  })
  .refine(
    (values) => {
      return !values.score;
    },
    {
      message: "Score can't be empty",
      path: ["score"],
    }
  );

type FormData = z.infer<typeof schema>;

const inputFields: FormInputProps[] = [
  {
    name: "reviewPicture",
    label: "Review Picture",
    type: "file",
  },
  {
    name: "score",
    label: "Score",
    type: "number",
    placeholder: "4",
  },
  {
    name: "description",
    label: "Description",
    type: "text",
    placeholder: "Write your review here...",
  },
];

const EditProfile: React.FC = () => {
  const navigate = useNavigate();

  const [shake, setShake] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  // const initialImageUrl = "src/assets/react.svg";
  const initialImageUrl = "public/images/apple.png";

  const onSubmit = async ({ description, score, reviewPicture }: FormData) => {
    const imgUrl = await uploadPhoto(reviewPicture[0]);

    const review: IReview = {
      description,
      score,
      imgUrl,
    };

    await createReview(review);
    navigate("/home");
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

          {/* <div className="d-flex justify-content-center mt-2">
            <button
              type="submit"
              className="btn btn-outline-dark w-100 mx-auto"
              onClick={() => googleLogin()}
            >
              <i className="bi bi-google me-2" />
              Sign Up With Google
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
