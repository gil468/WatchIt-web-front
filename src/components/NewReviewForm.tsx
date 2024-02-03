import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";
import "./auth/shake.css";
import FormInput, { FormInputProps } from "./auth/FormInput";
import { uploadPhoto } from "../services/file-service";
import { IReview, createReview } from "../services/review-service";
import EditReviewImage from "../components/EditReviewImage";

interface NewReviewProps {
  movieId: number;
  movieTitle: string;
}

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
      return values.score;
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

const NewReviewForm: React.FC<NewReviewProps> = ({
  movieId,
  movieTitle,
}) => {
  const navigate = useNavigate();

  const [shake, setShake] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const initialImageUrl = "../../public/images/addImage.png";
  // const initialImageUrl = "https://image.tmdb.org/t/p/w500" + {poster_path};
  // console.log(initialImageUrl)
  // console.log({poster_path})

  const onSubmit = async ({ description, score, reviewPicture, movieTitle }: FormData) => {
    const imgUrl = await uploadPhoto(reviewPicture[0]);

    const review: IReview = {
      movieTitle,
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
          <h1>Create New Review</h1>
          <p className="text-muted mt-3">
            Please edit the fields below in order to upload new review
          </p>

          <EditReviewImage imageUrl={initialImageUrl} />
        </div>

        <p className="h6">Title: {movieTitle}</p>

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
                  Upload
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default NewReviewForm;
