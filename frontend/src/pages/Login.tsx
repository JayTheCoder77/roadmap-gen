import { LoginForm } from "@/components/auth/LoginForm";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";

export default function Login() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10 relative">
      
      {/* Mode Toggle - top left */}
      <div className="absolute top-4 left-4">
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <ModeToggle />
        </ThemeProvider>
      </div>

      {/* Page title - centered */}
      <h1 className="mb-8 text-center font-extrabold text-3xl font-serif">
        Website RoadMap Generator
      </h1>

      {/* Login Form */}
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  );
}
