import { Link, useLocation } from "react-router-dom";

const AllIssues = () => {
  const { pathname } = useLocation();
  return (
    <div className="h-full w-full space-y-4 pb-24">
      <div className="flex flex-row items-center justify-between w-full">
        <header className="flex flex-col gap-3">
          <h5 className="text-xs uppercase text-slate-500">
            {pathname.substring(1).split("/").join(" / ")}
          </h5>
        </header>
        <Link
          to="/issues/create"
          className="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          Create Issue
        </Link>
      </div>
    </div>
  );
};

export default AllIssues;
