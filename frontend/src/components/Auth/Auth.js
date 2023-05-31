import React, { useState } from "react";

import RegisterComponent from "./Register";
import LoginComponent from "./Login";
import AuthContext from "../../context/auth-context";
const SignUpAndLogin = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSwitchComponent = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      {isLogin ? (
        <LoginComponent onSwitchComponent={handleSwitchComponent} />
      ) : (
        <RegisterComponent onSwitchComponent={handleSwitchComponent} />
      )}
    </div>
  );
};

export default SignUpAndLogin;
