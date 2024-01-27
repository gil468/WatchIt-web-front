export default function SuccessAlert() {
  return (
    <div
      className="alert alert-success alert-dismissible fade show"
      role="alert"
    >
      You should check in on some of those fields below.
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
}
