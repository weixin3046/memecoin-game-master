import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import Header from "@/components/LoginForm/header";
import Social from "@/components/LoginForm/social";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel?: string;
  backButtonLabel: string;
  backButtonHref?: string;
  showSocial?: boolean;
}

export default function CardWrapper({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) {
  return (
    <Card className="shadow-md w-max-[400px] max-w-[400px]">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardBody>{children}</CardBody>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <div className="text-center">{backButtonLabel}</div>
        {/* <BackButton label={backButtonLabel} href={backButtonHref} /> */}
      </CardFooter>
    </Card>
  );
}
