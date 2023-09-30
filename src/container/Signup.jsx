import React, { useState } from "react";
import { Logo } from "../assets";
import { UserAuthInput } from "../components";
import { FaEnvelope, FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { MdPassword } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { signInWithGitHub, signInWithGoogle } from "../utils/helpers";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase.config";
import { fadeInOut } from "../animations";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [getEmailValidationStatus, setGetEmailValidationStatus] =
    useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const createNewUser = async () => {
    if (getEmailValidationStatus === true) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
          if (userCred) {
            console.log(userCred);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const loginWithEmailPassword = async () => {
    if (getEmailValidationStatus) {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
          if (userCred) {
            console.log(userCred);
          }
        })
        .catch((err) => {
          console.log(err.message);
          if (err.message.includes("invalid-email")) {
            setAlert(true);
            setAlertMsg("Invalid ID: User not found.");
          } else if (err.message.includes("invalid-login-credentials")) {
            setAlert(true);
            setAlertMsg("Password incorrect. Please try again.");
          } else {
            setAlert(true);
            setAlertMsg(
              "Temporarily disabled due to many failed log in attempts."
            );
          }
          setInterval(() => {
            setAlert(false);
          }, 4000);
        });
    }
  };

  return (
    <div className="w-full py-6">
      <img
        src={Logo}
        alt="Logo"
        className=" object-contain w-32 h-auto text-white"
      />
      <div className="w-full flex flex-col items-center justify-center py-8">
        <p className="text-primaryText py-12 text-2xl">Join us!</p>
        <div className="px-8 w-full md:w-auto py-4 rounded-xl bg-secondary shadow-md flex flex-col items-center justify-center gap-6">
          {/* email */}
          <UserAuthInput
            label="Email"
            placeholder="Email"
            isPass={false}
            key="Email"
            setStateFunction={setEmail}
            Icon={FaEnvelope}
            setGetEmailValidationStatus={setGetEmailValidationStatus}
          />

          {/* password */}
          <UserAuthInput
            label="Password"
            placeholder="Password"
            isPass={true}
            key="Password"
            setStateFunction={setPassword}
            Icon={MdPassword}
          />

          {/* alert section */}

          <AnimatePresence>
            {alert && (
              <motion.p
                key={"Alert Message"}
                {...fadeInOut}
                className="text-red-500 "
              >
                {alertMsg}
              </motion.p>
            )}
          </AnimatePresence>

          {/* login button */}
          {!isLogin ? (
            <motion.div
              onClick={createNewUser}
              whileTap={{ scale: 0.9 }}
              className="bg-emerald-500 py-3 rounded-xl justify-center items-center  cursor-pointer hover:bg-emerald-400 flex w-full"
            >
              <p className="text-xl text-white">Sign up</p>
            </motion.div>
          ) : (
            <motion.div
              onClick={loginWithEmailPassword}
              whileTap={{ scale: 0.9 }}
              className="bg-emerald-500 py-3 rounded-xl justify-center items-center  cursor-pointer hover:bg-emerald-400 flex w-full"
            >
              <p className="text-xl text-white">Log in</p>
            </motion.div>
          )}

          {/* text section */}

          {!isLogin ? (
            <p className="text-sm text-primaryText flex items-center justify-center gap-1">
              Have an account?{" "}
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="text-emerald-500 cursor-pointer"
              >
                Log in
              </span>{" "}
            </p>
          ) : (
            <p className="text-sm text-primaryText flex items-center justify-center gap-1">
              Don't have an account?{" "}
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="text-emerald-500 cursor-pointer"
              >
                Sign up
              </span>{" "}
            </p>
          )}

          {/* or section */}

          <div className="flex items-center justify-center gap-12">
            <div className="h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
            <p className="text-sm text-[rgba(256,256,256,0.2)] ">OR</p>
            <div className="h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
          </div>

          {/* sign in with google */}
          <motion.div
            onClick={signInWithGoogle}
            className="flex items-center justify-center gap-3 bg-[rgba(256,256,256,0.2)] backdrop-blur-md w-full py-3 rounded-xl hover:bg-[rgba(256,256,256,0.4)] cursor-pointer "
            whileTap={{ scale: 0.9 }}
          >
            <FcGoogle className="text-3xl" />
            <p className="text-xl text-white">Sign in with Google</p>
          </motion.div>

          {/* or section */}
          <div className="flex items-center justify-center gap-12">
            <div className="h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
            <p className="text-sm text-[rgba(256,256,256,0.2)] ">OR</p>
            <div className="h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
          </div>

          {/* sign in with github */}
          <motion.div
            onClick={signInWithGitHub}
            className="flex items-center justify-center gap-3 bg-[rgba(256,256,256,0.2)] backdrop-blur-md w-full py-3 rounded-xl hover:bg-[rgba(256,256,256,0.4)] cursor-pointer "
            whileTap={{ scale: 0.9 }}
          >
            <FaGithub className="text-3xl text-white" />
            <p className="text-xl text-white">Sign in with GitHub</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
