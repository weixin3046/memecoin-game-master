import CardWrapper from "@/components/LoginForm/card-wrapper";

const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="w-full flex items-center justify-center">
        {/* <ExclamationTriangleIcon className="text-destructive" /> */}
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;
