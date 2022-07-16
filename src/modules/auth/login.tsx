import { NextComponentType, NextPage, NextPageContext } from "next";
import { Spinner } from "@components/index";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { EyeIcon, EyeOffIcon, UserIcon } from "@heroicons/react/solid";
import Router from "next/router";
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "./firebase/clientApp";
const auth = getAuth(firebaseApp);
type Tab = {
  heading: string;
};

const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
const validatePassword = (password: string) => {
  return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(
    password
  );
};

const Login: NextPage = () => {
  const [login, setLogin] = useState(true);
  return (
    <div className="bg-black h-screen flex justify-center items-center w-screen">
      {login ? <LoginCard setLogin={setLogin} /> : <SignUpCard setLogin={setLogin} />}
    </div>
  );
};
interface PasswordPageProps {
  setPassword: Dispatch<SetStateAction<string>>;
  setEmailValidated: Dispatch<SetStateAction<boolean>>;
  setAuthenticated: Dispatch<SetStateAction<boolean>>;
  email: string;
  password: string;
}
const PasswordPage: NextComponentType<
  NextPageContext,
  {},
  PasswordPageProps
> = ({ password, email, setPassword, setEmailValidated }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const submitLogin = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e: any) {
      setError(e.message);
    }

    setLoading(false);
  };
  return (
    <form
      action="#"
      onSubmit={(e) => {
        e.preventDefault();
        if (!validatePassword(password)) {
          setError("Please enter a valid password");
        } else {
          submitLogin(email, password);
        }
      }}
      className="flex flex-col space-y-6"
    >
      <h1 className="text-gray-100 text-3xl font-bold">Enter password</h1>
      <button
        type="button"
        onClick={() => setEmailValidated(false)}
        className="p-4 font-bold rounded-lg focus:outline-none  active:scale-[.98] hover:brightness-150 active:bg-zinc-900  border-gray-800 border flex items-center space-x-3 text-white "
      >
        <UserIcon className="h-7 border-2 rounded-full p-0.5 text-gray-400" />
        <p className="truncate">{email}</p>
      </button>
      <div className="flex flex-col space-y-1 pb-5">
        <label htmlFor="email" className="text-gray-100 font-medium text-sm">
          Password
        </label>
        <div className="w-full relative">
          <input
            value={password}
            onChange={(e) => {
              setError("");
              setPassword(e.target.value);
            }}
            placeholder="Your password"
            name="password"
            id="password"
            spellCheck={false}
            type={showPassword ? "text" : "password"}
            className={
              "pr-10 pl-4 py-4 w-full font-medium rounded-lg focus:outline-none bg-black text-gray-400 border-gray-800 border " +
              (error ? "border-red-500" : "focus:border-blue-500")
            }
          ></input>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="cursor-pointer absolute inset-y-0 right-0 pr-4 flex items-center"
          >
            {showPassword ? (
              <EyeIcon className="h-5 text-gray-400" />
            ) : (
              <EyeOffIcon className="h-5 text-gray-400" />
            )}
          </button>
        </div>
        <p className="text-red-500 font-medium text-sm">{error}</p>
      </div>
      <p className="font-medium text-blue-600">Forgot password?</p>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-400 w-full border border-blue-900 p-4 rounded-lg font-medium tracking-wide text-gray-900 flex items-center justify-center"
      >
        {loading ? <Spinner color="text-gray-800" /> : "Continue"}
      </button>
    </form>
  );
};
interface EmailPageProps {
  setEmail: Dispatch<SetStateAction<string>>;
  setEmailValidated: Dispatch<SetStateAction<boolean>>;
  email: string;
}
const EmailPage: NextComponentType<NextPageContext, {}, EmailPageProps> = ({
  email,
  setEmailValidated,
  setEmail,
  setLogin,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  return (
    <>
      <form
        action="#"
        onSubmit={(e) => {
          e.preventDefault();
          if (!validateEmail(email)) {
            setError("Please enter a valid email address");
          } else {
            setEmailValidated(true);
          }
        }}
        className="flex flex-col space-y-4"
      >
        <h1 className="text-gray-100 text-3xl font-bold">Sign in</h1>
        <div className="flex flex-col space-y-1 pb-5">
          <label htmlFor="email" className="text-gray-100 font-medium text-sm">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => {
              setError("");
              setEmail(e.target.value);
            }}
            placeholder="Your email address"
            name="email"
            id="email"
            className={
              "p-4 font-medium rounded-lg focus:outline-none bg-black text-gray-400 border-gray-800 border " +
              (error ? "border-red-500" : "focus:border-blue-500")
            }
          ></input>
          <p className="text-red-500 font-medium text-sm">{error}</p>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-400 w-full border border-blue-900 p-4 rounded-lg font-medium tracking-wide text-gray-900 flex items-center justify-center"
        >
          {loading ? <Spinner color="text-gray-800" /> : "Continue"}
        </button>
        <button
          onClick={() => setLogin(false)}
          type="button"
          className=" hover:bg-gray-900 hover:bg-opacity-30 w-full border border-gray-800 p-4 rounded-lg font-medium tracking-wide text-gray-100"
        >
          Create account
        </button>
      </form>
      <div className="flex flex-col items-center space-y-3">
        <p className="font-medium text-sm text-blue-600">
          Sign into a business account
        </p>
        <p className="font-medium text-sm text-blue-600">Privacy policy</p>
      </div>
    </>
  );
};
interface LoginCardProps {}
const LoginCard: NextComponentType<NextPageContext, {}, LoginCardProps> = ({
  setLogin,
}) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailValidated, setEmailValidated] = useState(false);

  return (
    <div className="border border-gray-800 rounded-2xl p-10 max-w-lg w-full space-y-5">
      <h1 className="text-gray-100 text-3xl font-medium mb-12">
        screenshotify
      </h1>
      {emailValidated ? (
        <PasswordPage
          email={email}
          password={password}
          setPassword={setPassword}
          setEmailValidated={setEmailValidated}
        />
      ) : (
        <EmailPage
          setLogin={setLogin}
          setEmail={setEmail}
          setEmailValidated={setEmailValidated}
          email={email}
        />
      )}
    </div>
  );
};

interface SignUpPageProps {
  setEmail: Dispatch<SetStateAction<string>>;
  setEmailValidated: Dispatch<SetStateAction<boolean>>;
  email: string;
}
const SignUpPage: NextComponentType<
  NextPageContext,
  {},
  SignUpPageProps
> = ({setLogin}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const submitSignUp = () => {
    
    setTimeout(() => {
      // createUserWithEmailAndPassword(auth, email, password)
      // .then(userCredential => {
      //       firestore.collection('users').doc(userCredential.user.uid).set({
      //         name, lastName
      //       })
      setLoading(false)
    }, 1000);
  };
  return (
    <>
      <form
        action="#"
        onSubmit={(e) => {
          e.preventDefault();
          if (passwordError || emailError) {
            setLoading(false)
          } else {
            setLoading(true);
            submitSignUp();
          }
        }}
        className="flex flex-col space-y-4"
      >
        <h1 className="text-gray-100 text-3xl font-bold">Sign up</h1>
        <div className="flex flex-col space-y-1">
          <label htmlFor="email" className="text-gray-100 font-medium text-sm">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => {
              setEmailError("");
              setEmail(e.target.value);
            }}
            onBlur={() => {
              if (!validateEmail(email) && email !== '') {
                setEmailError("Please enter a valid email address");
              }
            }}
            placeholder="Your email address"
            name="email"
            id="email"
            className={
              "p-4 font-medium rounded-lg focus:outline-none bg-black text-gray-400 border-gray-800 border " +
              (emailError ? "border-red-500" : "focus:border-blue-500")
            }
          ></input>
          <p className="text-red-500 font-medium text-sm">{emailError}</p>
        </div>
        <div className="flex flex-col space-y-1 pb-5">
          <label htmlFor="email" className="text-gray-100 font-medium text-sm">
            Password
          </label>
          <div className="w-full relative">
            <input
              value={password}
              onChange={(e) => {
                setPasswordError("");
                setPassword(e.target.value);
              }}
              onBlur={() => {
                if (!validatePassword(password) && password !== '') {
                  setPasswordError("Please enter a valid password");
                }
              }}
              placeholder="Your password"
              name="password"
              id="password"
              spellCheck={false}
              type={showPassword ? "text" : "password"}
              className={
                "pr-10 pl-4 py-4 w-full font-medium rounded-lg focus:outline-none bg-black text-gray-400 border-gray-800 border " +
                (error ? "border-red-500" : "focus:border-blue-500")
              }
            ></input>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer absolute inset-y-0 right-0 pr-4 flex items-center"
            >
              {showPassword ? (
                <EyeIcon className="h-5 text-gray-400" />
              ) : (
                <EyeOffIcon className="h-5 text-gray-400" />
              )}
            </button>
          </div>
          <p className="text-red-500 font-medium text-sm">{passwordError}</p>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-400 w-full border border-blue-900 p-4 rounded-lg font-medium tracking-wide text-gray-900 flex items-center justify-center"
        >
          {loading ? <Spinner color="text-gray-800" /> : "Continue"}
        </button>
        <button
          type="button"
          onClick={() => setLogin(true)}
          className=" hover:bg-gray-900 hover:bg-opacity-30 w-full border border-gray-800 p-4 rounded-lg font-medium tracking-wide text-gray-100"
        >
          Already have an account?
        </button>
      </form>
      <div className="flex flex-col items-center space-y-3">
        <p className="font-medium text-sm text-blue-600">Privacy policy</p>
      </div>
    </>
  );
};

export default Login;

const SignUpCard: NextComponentType<
  NextPageContext,
  {},
  LoginCardProps
> = ({setLogin}) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="border border-gray-800 rounded-2xl p-10 max-w-lg w-full space-y-5">
      <h1 className="text-gray-100 text-3xl font-medium mb-12">
        screenshotify
      </h1>
      <SignUpPage
      setLogin={setLogin}
        setEmail={setEmail}
        email={email}
        password={password}
        setPassword={setPassword}
      />
    </div>
  );
};
