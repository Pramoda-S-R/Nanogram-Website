import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../../lib/validation";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useToast } from "../../components/ui/Toast";
import { User, Mail, Lock, Type } from "lucide-react";
import {
  useCreateUserAccount,
  useSignInAccount,
} from "../../lib/react_query/queriesAndMutations";
import { useUserContext } from "../../context/AuthContext";

const SignupForm = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const { checkAuthUser, isPending: isUserLoading } = useUserContext();

  const { mutateAsync: createUserAccount, isPending: isCreatingUser } =
    useCreateUserAccount();

  const { mutateAsync: signInAccount, isPending: isSigningIn } =
    useSignInAccount();

  const {
    register,
    handleSubmit,
    formState: { errors, isPending },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  useEffect(() => {
    const checkAndRedirect = async () => {
      const isLoggedIn = localStorage.getItem("isAuthenticated");

      if (isLoggedIn) {
        localStorage.setItem("isAuthenticated", "true");
        navigate("/");
      } else {
        const isLoggedIn = await checkAuthUser();
        if (isLoggedIn) {
          localStorage.setItem("isAuthenticated", "true");
          navigate("/");
        }
      }
    };

    checkAndRedirect();
  }, [checkAuthUser, navigate]);

  async function onSubmit(data) {
    const newUser = await createUserAccount(data);

    if (!newUser) {
      return toast({
        title: "Sign up failed.",
        description:
          "There was an error in Signing up your account. Please try again.",
      });
    }

    const session = await signInAccount({
      email: data.email,
      password: data.password,
    });
    if (!session) {
      return toast({
        title: "Sign up failed.",
        description:
          "There was an error in Signing up your account. Please try again.",
      });
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      navigate("/"); // Redirect to home on successful login
    } else {
      toast({
        title: "Sign up failed.",
        description:
          "There was an error in Signing up your account. Please try again.",
      });
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#0D2DA2] mb-6 text-center">
        Sign Up
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            icon={<User size={20} />}
            placeholder="Username"
            {...register("username")}
            className={errors.username ? "border-red-500" : ""}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        <div>
          <Input
            icon={<Type size={20} />}
            placeholder="Display Name"
            {...register("name")}
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Input
            icon={<Mail size={20} />}
            type="email"
            placeholder="Email"
            {...register("email")}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Input
            type="password"
            icon={<Lock size={20} />}
            placeholder="Password"
            {...register("password")}
            className={errors.password ? "border-red-500" : ""}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={isCreatingUser}
        >
          {isCreatingUser ? "Signing Up..." : "Sign Up"}
        </Button>
      </form>

      <div className="mt-4">
        <div className="border-t border-gray-300 my-4"></div>

        <Button
          variant="link"
          className="w-full"
          onClick={() => navigate("/sign-in")}
        >
          Already have an account? Sign In
        </Button>
      </div>
    </div>
  );
};

export default SignupForm;
