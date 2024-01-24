import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import z from "zod";

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
    password: z.string().min(5),
    confirmPassword: z.string().min(5),
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

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onChange" });

  const onSubmit = (data: FieldValues) => {
    console.log("on submit");
    console.log(data);
  };

  return (
    <div
      className="container mt-5"
      style={{
        backgroundColor: "#e0e0e0",
        padding: "20px",
      }}
    >
      <center>
        <h1>Register</h1>
      </center>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="firstName">First Name:</label>
          <input
            {...register("firstName")}
            type="text"
            id="firstNname"
            placeholder="First Name"
            className="form-control"
          />
          {dirtyFields.firstName &&
            ((errors.firstName && (
              <p className="text-danger">{errors.firstName.message}</p>
            )) || <p className="text-success">Looks Good!</p>)}
        </div>
        <div className="mb-3">
          <label htmlFor="lastName">Last Name:</label>
          <input
            {...register("lastName")}
            type="text"
            id="lastName"
            placeholder="Last Name"
            className="form-control"
          />
          {dirtyFields.lastName &&
            ((errors.lastName && (
              <p className="text-danger">{errors.lastName.message}</p>
            )) || <p className="text-success">Looks Good!</p>)}
        </div>
        <div className="mb-3">
          <label htmlFor="email">Email: </label>
          <input
            {...register("email")}
            type="text"
            id="email"
            placeholder="Email"
            className="form-control"
          />
          {dirtyFields.email &&
            ((errors.email && (
              <p className="text-danger">{errors.email.message}</p>
            )) || <p className="text-success">Looks Good!</p>)}
        </div>
        <div className="mb-3">
          <label htmlFor="password">Password:</label>
          <input
            {...register("password")}
            type="password"
            id="password"
            placeholder="Password"
            className="form-control"
          />
          {dirtyFields.password &&
            ((errors.password && (
              <p className="text-danger">{errors.password.message}</p>
            )) || <p className="text-success">Looks Good!</p>)}
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            {...register("confirmPassword")}
            type="password"
            id="confirmPassword"
            placeholder="confirmPassword"
            className="form-control"
          />
          {dirtyFields.confirmPassword &&
            ((errors.confirmPassword && (
              <p className="text-danger">{errors.confirmPassword.message}</p>
            )) || <p className="text-success">Looks Good!</p>)}
        </div>

        <div className="mb-3">
          <label htmlFor="profilePicture">Profile Picture:</label>
          <input
            {...register("profilePicture")}
            type="file"
            accept="image/png, image/jpeg"
            id="profilePicture"
            placeholder="profilePicture"
            className="form-control"
          />
          {dirtyFields.profilePicture &&
            ((errors.profilePicture && (
              <p className="text-danger">
                {errors.profilePicture?.message?.toString()}
              </p>
            )) || <p className="text-success">Looks Good!</p>)}
        </div>

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

      <center>
        <a href="#">Already have an account?</a>
      </center>
    </div>
  );
}

export default Register;
