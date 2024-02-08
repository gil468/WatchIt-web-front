import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import z from "zod";
import FormInput, { FormInputProps } from "../form/FormInput";
import { uploadPhoto } from "../../services/file-service";
import { ReviewSubmition, createReview } from "../../services/review-service";
import { Movie, getMovieById } from "../../services/movie-service";
import FormTextArea from "../form/FormTextArea";
import FormInputImage from "../form/FormInputFile";
import placeholderImgUrl from "/src/images/placeholder.jpg";

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
    name: "score",
    label: "Score",
    type: "number",
    placeholder: "4",
  },
  {
    name: "description",
    label: "Description",
    type: "textArea",
    placeholder: "Write your review here...",
  },
];

const NewReviewForm: React.FC = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();
  if (!movieId) {
    navigate("/");
  }

  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movie = await getMovieById(parseInt(movieId!));
        setMovie(movie);
      } catch (error) {
        navigate("/");
      }
    };
    fetchMovie();
  }, []);

  const [shake, setShake] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async ({ description, score, reviewPicture }: FormData) => {
    const imgUrl = await uploadPhoto(reviewPicture[0]);

    const review: ReviewSubmition = {
      movieTitle: movie!.title,
      description,
      score,
      reviewImgUrl: imgUrl,
    };

    await createReview(review);
    navigate("/");
  };

  const onErrorSubmit = () => {
    setShake(true);
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-center py-2">
        <div
          className={`border border-2 p-4 rounded ${shake && "shake"}`}
          onAnimationEnd={() => setShake(false)}
          style={{
            width: "35rem",
          }}
        >
          <div className="text-center">
            <p className="h2">Add Review</p>
            <p className="h5 my-2 text-muted">{movie?.title}</p>

            {/* <img
              src={`https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`}
              className="w-100 mb-2 rounded"
              height="200"
              style={{ backgroundColor: "#e3f2fd" }}
            /> */}
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
                  name={"reviewPicture"}
                  label={"Review Picture"}
                  fullWidth
                  defaultImage={placeholderImgUrl}
                />
                {inputFields.map((field) =>
                  field.type === "textArea" ? (
                    <FormTextArea
                      key={field.name}
                      {...field}
                      showValidFeedback
                    />
                  ) : (
                    <FormInput key={field.name} {...field} showValidFeedback />
                  )
                )}

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
    </>
  );
};

export default NewReviewForm;
