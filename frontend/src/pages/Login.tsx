import { LoginForm } from "@/components/auth/LoginForm";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "../components/mode-toggle";
export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10 relative">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="absolute top-4 right-4 z-50">
          <ModeToggle />
        </div>
      </ThemeProvider>
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  );
}
