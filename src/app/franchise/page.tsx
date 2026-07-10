import { notFound } from "next/navigation";

/**
 * Franchise page is temporarily disabled.
 * The route returns a 404 keeping the source files in place so we can
 * reactivate it later by simply removing this notFound() call.
 */
export default function FranchisePage() {
  notFound();
}
