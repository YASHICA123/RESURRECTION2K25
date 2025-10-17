import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold neon-text">404</h1>
        <p className="mt-2 text-foreground/70">Oops! Page not found.</p>
        <a href="/" className="mt-6 inline-flex items-center rounded-full px-5 py-2 font-semibold text-background bg-gradient-to-r from-primary via-secondary to-accent hover:from-accent hover:via-secondary hover:to-primary">Return Home</a>
      </div>
    </div>
  );
};

export default NotFound;
