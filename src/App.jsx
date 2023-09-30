import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Home } from "./container";
import { useEffect } from "react";
import { auth, db } from "./config/firebase.config";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Spinner } from "./components";
import { useDispatch } from "react-redux";
import { SET_USER } from "./context/actions/userActions";

const App = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        setDoc(doc(db, "users", userCred?.uid), userCred?.providerData[0]).then(
          () => {
            //dispatch the action to store
            dispatch(SET_USER(userCred?.providerData[0]));
            navigate("/home/projects", {replace:true})
          }
        );
      } else {
        navigate("/home/auth", { replace: true });
      }

      setInterval(() => {
        setIsLoading(false);
      }, 2000);
    });

    //clean up the listener event
    return () => unsubscribe();
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
          <Spinner />
        </div>
      ) : (
        <div className="w-screen h-screen flex items-start justify-start overflow-hidden">
          <Routes>
            <Route path="/home/*" element={<Home />} />
            <Route path="*" element={<Navigate to={"/home"} />} />
          </Routes>
        </div>
      )}
    </>
  );
};

export default App;
