import "@fortawesome/fontawesome-free/css/all.css";
import React from "react";
import { useRecoilState } from "recoil";
import { USER_ATOM } from "./atoms/userAtom";
import Routes from "./routes";
import "./scss/index.scss";
import jscookie from "js-cookie";
import { TOKEN_NAME } from "./apollo";
import { useQuery } from "@apollo/client";
import { GET_AUTH } from "./apollo/queries/UserQuery";

const App = () => {
  const [user, setUser] = useRecoilState(USER_ATOM);
  const token = jscookie.get(TOKEN_NAME);

  useQuery(GET_AUTH, {
    onCompleted: (data) => {
      setUser(data.auth);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return <Routes isAuth={!user} />;
};

export default App;
