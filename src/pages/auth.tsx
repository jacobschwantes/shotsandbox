import firebase from "../modules/auth/firebase/clientApp";
import Login from "@modules/auth/login";
import { NextPage } from "next";
import firebaseApp from "../modules/auth/firebase/clientApp";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
const Auth: NextPage = () => {
const auth = getAuth(firebaseApp);
const [user, loading, error] = useAuthState(auth);
const router = useRouter();
    if (user) {
        router.replace('/')
    }
  return <Login />;
};

export default Auth;
