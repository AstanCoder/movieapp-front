import { useEffect } from "react";
import PropTypes from "prop-types";

import { useNavigate } from "react-router-dom";
import { useAuth } from "./Provider";
import { Spinner } from "@chakra-ui/react";

const Authenticated = ({
  children,
  homePath,
  loginPath,
  firstTime,
  
}) => {
  const navigate  = useNavigate()
  const { isValidating, user: authenticatedUser, currentPass } = useAuth();

  const isAuthenticated = !!authenticatedUser;
  console.log(authenticatedUser)
  

  useEffect(() => {
    // Redirects to login if user is not authenticated and the route is protected
    if (!isAuthenticated) {
      navigate(loginPath)
      console.log("NO AUTH")
    }

    // Redirects to home path if user is authenticated and the route is not protected
    if (isAuthenticated) {
      console.log("AUTH")
      navigate(homePath);
    }
  }, [isValidating, isAuthenticated]);

  if (isValidating) {
    return <Spinner />;
  }

  return children;
};

Authenticated.propTypes = {
  children: PropTypes.any.isRequired,
  homePath: PropTypes.string.isRequired,
  loginPath: PropTypes.string.isRequired,
};

Authenticated.defaultProps = {
  homePath: "/",
  loginPath: "/login",
};

export default Authenticated;
