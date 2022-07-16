import { NextPage } from "next";
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "@modules/auth/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";

const auth = getAuth(firebaseApp);

const Tokens: NextPage = () => {
  const [user, loading, error] = useAuthState(auth);
  return <h1>tokens</h1>;
};

export default Tokens;
