import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "../../lib/validation";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useToast } from "../../components/ui/Toast";
import { User, Lock } from "lucide-react";
import { useSignInAccount } from "../../lib/react_query/queriesAndMutations";
import { useUserContext } from "../../context/AuthContext";

const SigninForm = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRouting, setIsRouting] = useState(false);

  const { checkAuthUser, isPending: isUserLoading } = useUserContext();

  const { mutateAsync: signInAccount, isPending: isSigningIn } =
    useSignInAccount();

  const {
    register,
    handleSubmit,
    formState: { errors, isPending },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  useEffect(() => {
    const checkAndRedirect = async () => {
      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        navigate("/");
      } else {
        const isLoggedIn = await checkAuthUser();
        if (isLoggedIn) {
          navigate("/");
        }
      }
    };

    checkAndRedirect();
  }, [checkAuthUser, navigate]);

  async function onSubmit(data) {
    setIsSubmitting(true);
    const session = await signInAccount({
      username: data.username,
      password: data.password,
    });
    if (!session) {
      setIsSubmitting(false);
      return toast({
        title: "Sign in failed.",
        description:
          "There was an error in Signing in your account. Please try again.",
      });
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      navigate("/");
    } else {
      toast({
        title: "Sign in failed.",
        description:
          "There was an error in Signing in your account. Please try again.",
      });
    }
  }

  return (
    <div className={`mx-auto ${isRouting ? "slide-out-right" : ""}`}>
      <img
        src="/assets/images/nanogram_logo-bg-primary.svg"
        alt="Logo"
        className="w-16 rounded-full mx-auto"
      />
      <h1 className="text-2xl font-bold text-primary text-center nanogram mb-5">
        NANOGRAM
      </h1>
      <h2 className="text-2xl font-bold text-primary mb-6 text-center">
        Sign In
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div>
          <Input
            icon={<User size={20} />}
            placeholder="Username"
            {...register("username")}
            className={errors.username ? "border-red-800" : ""}
          />
          {errors.username && (
            <p className="text-red-800 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        <div>
          <Input
            type="password"
            icon={<Lock size={20} />}
            placeholder="Password"
            {...register("password")}
            className={errors.password ? "border-red-800" : ""}
          />
          {errors.password && (
            <p className="text-red-800 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
        </Button>
      </form>

      <div className="mt-4">
        <div className="border-t border-gray-300 my-4"></div>

        <div className="flex justify-between items-center">
          <a href="#" className="text-primary hover:underline">
            Forgot Password?
          </a>
          <Button
            type="button"
            variant="link"
            onClick={() => {
              setIsRouting(true);
              setTimeout(() => {
                navigate("/sign-up");
              }, 500);
            }}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;
