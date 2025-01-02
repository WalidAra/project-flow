import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Github,
  Linkedin,
  Mail,
  Star,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";

const Home = () => {
  const { token } = useAuth();

  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email to your server
    console.log("Submitted email:", email);
    setEmail("");
    alert("Thanks for subscribing!");
  };
  return (
    <div className="relative flex min-h-screen bg-background flex-col  pt-60">
      <header className="fixed backdrop-blur border-b top-0 z-50 w-full h-14 flex items-center justify-center p-4">
        <div className="container lg:max-w-[55%] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-primary p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary-foreground"
              >
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              </svg>
            </div>
            <span className="font-bold hidden sm:block">Sprint View</span>
          </div>

          <nav className=" hidden sm:flex flex-1 items-center justify-center space-x-6">
            <Link to="#" className="text-sm font-medium">
              Features
            </Link>
            <div className="flex items-center space-x-1">
              <Link to="#" className="text-sm font-medium">
                Documentation
              </Link>
              <ChevronDown className="h-4 w-4" />
            </div>
            <Link to="#" className="text-sm font-medium">
              Pricing
            </Link>
            <div className="flex items-center space-x-1">
              <Link to="#" className="text-sm font-medium">
                Resources
              </Link>
              <ChevronDown className="h-4 w-4" />
            </div>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 rounded-lg border px-3 py-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-yellow-400"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span className="text-sm font-medium">2.6K</span>
          </div>
          <Link to={token ? "/dashboard" : "/auth/signin"}>
            <Button className="hidden sm:block" variant="outline">
              {token ? "Dashboard" : "Get Started"}
            </Button>
          </Link>
        </div>
      </header>
      <main className="flex-1 relative overflow-hidden flex justify-center items-center ">
        <div className="flex z-40 flex-col items-center justify-center space-y-8 py-12 text-center">
          <Link
            to="#"
            className="inline-flex items-center border rounded-full bg-purple-100 px-4 py-1.5 text-sm font-medium text-purple-600 transition-colors hover:bg-purple-200"
          >
            Introducing Sprint View - Learn more
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter text-[#1B2559] sm:text-5xl md:text-6xl lg:text-7xl">
              Manage your projects
              <br />
              with ease
            </h1>
            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
              Start managing your tasks and projects with Sprint View, the
              ultimate tool for project management and task tracking!
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
            <Link to={token ? "/dashboard" : "/auth/signin"}>
              <Button
                size="lg"
                className="bg-[#422AFB] text-white hover:bg-[#422AFB]/90"
              >
                {token ? "Dashboard" : "Get Started"}
              </Button>
            </Link>

            <Button size="lg" variant="outline">
              See live preview
            </Button>
          </div>
        </div>
      </main>

      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)] bg-purple-400"
        )}
      />

      <section className="container border w-[95%] md:max-w-[68%] m-auto rounded-xl overflow-hidden shadow-2xl bg-background z-40">
        <img src="image.png" className="w-full h-auto" />
      </section>

      <footer className="bg-gradient-to-b from-background to-secondary mt-24">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* GitHub Star Section */}
            <div className="md:col-span-2">
              <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-lg p-6 shadow-lg transform transition-all duration-300  ">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Support Us on GitHub!
                </h2>
                <p className="text-white mb-4">
                  If you like our project, please give us a star on GitHub. It
                  helps us a lot!
                </p>
                <Link
                  to="https://github.com/yourusername/your-repo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-purple-600 bg-white hover:bg-purple-50 transition-colors duration-300"
                >
                  <Github className="mr-2 h-5 w-5" />
                  Star Us on GitHub
                  <Star className="ml-2 h-5 w-5 text-yellow-400 animate-pulse" />
                </Link>
              </div>
            </div>

            {/* Newsletter Section */}
            <div>
              <h3 className="text-lg font-semibold text-primary mb-4">
                Stay Updated
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
                <Button type="submit" className="w-full">
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>

          {/* Links and Social Media */}
          <div className="mt-12 border-t border-muted pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <nav className="flex flex-wrap justify-center md:justify-start space-x-6">
                <Link
                  to="/about"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  About
                </Link>
                <Link
                  to="/projects"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  Projects
                </Link>
                <Link
                  to="/blog"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  Blog
                </Link>
                <Link
                  to="/contact"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  Contact
                </Link>
              </nav>

              <p className="mt-8 text-center text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} Sprint View. All rights
                reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link
                  to="https://twitter.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  <span className="sr-only">Twitter</span>
                  <Twitter className="size-5" />
                </Link>
                <Link
                  to="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  <span className="sr-only">LinkedIn</span>
                  <Linkedin className="size-5" />
                </Link>
                <Link
                  to="mailto:your@email.com"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  <span className="sr-only">Email</span>
                  <Mail className="size-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
