import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="font-display text-sm font-semibold uppercase tracking-wide text-ifood-mediumBlue">404</p>
      <h1 className="mt-2 font-display text-3xl font-bold text-ifood-darkBlue">Page not found</h1>
      <p className="mt-3 max-w-md font-body text-base text-ifood-gray">
        The page you are looking for does not exist or may have been moved.
      </p>
      <Button href="/" className="mt-6">
        Back to homepage
      </Button>
      <p className="mt-4">
        <Link href="/#inquiry" className="font-body text-sm text-ifood-mediumBlue hover:underline">
          Or request a storage quote
        </Link>
      </p>
    </Container>
  );
}
