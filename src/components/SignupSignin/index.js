import React, { useState } from "react";
import "./style.css";
import Input from "../Input";
import Button from "../Button";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, doc, provider, setDoc } from "../../firebase";
import { toast } from "react-toastify";
import { getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function SignupSignin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const naviagate = useNavigate();
  

  function signupWithEmail(e) {
    //  console.log("signupWithEmail");
    e.preventDefault();
    setLoading(true);
    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log("User>>>", user);
            toast.success("User created!");
            setLoading(false);
            setConfirmPassword("");
            setEmail("");
            setName("");
            setPassword("");
            createDoc(user);
            naviagate("/dashboard");
            //..
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
            // ..
          });
      } else {
        toast.error("Password and Confirm Password Should match!");
        setLoading(false);
      }
    } else {
      toast.error("all fields are mandatory!");
      setLoading(false);
    }
  }
  function googleAuth() {
    // console.log("signupWithGoogle");
    setLoading(true);
    // try{
      signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("user>>>", user);
        setLoading(false);
        createDoc(user);
        toast.success("User Authenticated");
        naviagate("/dashboard");
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);   
             // The email of the user's account used.
        const email = error.customData.email;
        setLoading(false);
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
    // }catch(e){
    //   toast.error(e.message)
    //   setLoading(false);
    // }
    
  }
  function loginWithEmail(e) {
    // console.log("loginWithEmail");
    e.preventDefault();
    setLoading(true);
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          toast.success("Logged in successfully");
          console.log(user);
          naviagate("/dashboard");
          setLoading(false);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
        });
    } else {
      toast.error("All fields are mandatory");
      setLoading(false);
    }
  }
  async function createDoc(user) {
    if (!user) return;
    setLoading(true);

    const userRef = doc(db, "user", user.uid);
    const userData = await getDoc(userRef);
    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "user", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        setLoading(false)
        toast.success("Doc Created");
      } catch (e) {
        toast.error(e.message);
        setLoading(false)

      }
    } else {
      toast.error("Doc Already Exists");
      setLoading(false)

    }
  }
  
  return (
    <>
      {loginForm ? (
        <div className="signup">
          <h2 className="title">
            Login <span style={{ color: "var(--theme)" }}>Financely.</span>
          </h2>
          <form>
            <Input
              type={"email"}
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"johndoe@gmail.com"}
            />
            <Input
              type={"password"}
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Example@123"}
            />

            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Login using Email and Password"}
              onClick={loginWithEmail}
            />
            <p className="or">or</p>
            <Button
              text={loading ? "Loading..." : "Login using Google"}
              onClick={googleAuth}
              blue={true}
            />
            <p className="login-signup-toggle">
              or Don't have an account ?{" "}
              <span className="click-here" onClick={() => setLoginForm(false)}>
                Click Here
              </span>{" "}
            </p>
          </form>
        </div>
      ) : (
        <div className="signup">
          <h2 className="title">
            Sign Up <span style={{ color: "var(--theme)" }}>Financely.</span>
          </h2>
          <form>
            <Input
              type={"text"}
              label={"Full Name"}
              state={name}
              setState={setName}
              placeholder={"John Doe"}
            />
            <Input
              type={"email"}
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"johndoe@gmail.com"}
            />
            <Input
              type={"password"}
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Example@123"}
            />
            <Input
              type={"password"}
              label={"Confirm Password"}
              state={confirmPassword}
              setState={setConfirmPassword}
              placeholder={"Example@123"}
            />
            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Sign Up using Email and Password"}
              onClick={signupWithEmail}
            />
            <p className="or">or</p>
            <Button
              text={loading ? "Loading..." : "Sigup using Google"}
              onClick={googleAuth}
              blue={true}
            />
            <p className="login-signup-toggle">
              or Have an Account Already?{" "}
              <span className="click-here" onClick={() => setLoginForm(true)}>
                Click Here
              </span>{" "}
            </p>
          </form>
        </div>
      )}
    </>
  );
}

export default SignupSignin;
