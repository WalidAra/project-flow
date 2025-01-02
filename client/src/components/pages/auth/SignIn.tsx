import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import GoogleAuthButton from "@/components/atoms/GoogleAuthButton";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { fetchData } from "@/lib";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { AccessToken } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import useAuth from "@/hooks/useAuth";
import { Spinner } from "@nextui-org/react";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const SignIn = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
    const { toast } = useToast();
    const { setToken } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

    const { isPending, mutate } = useMutation({
      mutationFn: (values: object) =>
        fetchData<AccessToken>({
          endpoint: "signin",
          feature: "auth",
          method: "POST",
          data: values as unknown as object,
        }),
      onSuccess: (res) => {
        const { accessToken } = res.data;
        setToken(accessToken);
      },
      onError: (error: unknown) => {
        if (error instanceof AxiosError) {
          console.error("API Error:");
          toast({
            title: "Uh oh! Something went wrong.",
            description: error.response?.data.message,
            variant: "destructive",
          });
        }
      },
    });

  function onSubmit(values: z.infer<typeof formSchema>) {
    return mutate(values);
  }

  return (
    <Form {...form}>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription>Login with your Google account</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                  <GoogleAuthButton />
                </div>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="grid gap-6"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="m@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter your password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    {isPending ? (
                      <Spinner color="default" size="sm" />
                    ) : (
                      "Sign in"
                    )}
                  </Button>
                </form>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link to={"/auth/signup"}>
                    <div className="underline inline underline-offset-4">
                      Sign up
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </Form>
  );
};

export default SignIn;
