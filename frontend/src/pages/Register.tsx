import { RegisterForm } from "@/components/auth/RegisterForm";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "../components/mode-toggle";
export default function Register() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10 relative">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="absolute top-4">
          <h1 className="font-bold font-sans p-4 text-2xl">
            Website RoadMap Generator
          </h1>
        </div>
        <div className="absolute top-4 right-4 z-50">
          <ModeToggle />
        </div>
      </ThemeProvider>
      <div className="w-full max-w-sm md:max-w-3xl">
        <RegisterForm />
      </div>
    </div>
  );
}
