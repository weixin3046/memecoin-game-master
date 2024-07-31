"use client";

import { Button } from "@chakra-ui/react";
import Link from "next/link";

interface BackButtonProps {
  href: string;
  label: string;
}

const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Button variant="link" className="font-normal w-full" size="sm">
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export default BackButton;
