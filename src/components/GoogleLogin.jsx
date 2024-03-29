/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../services/api";
import { Button, Image } from "@chakra-ui/react";
import googlelogo from "../images/googlelogo.jpg";

export default (props) => {
  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        alert(authResult.code);
        const result = await googleAuth(authResult.code);
        props.setUser(result.data.data.user);
        alert("successfuly logged in");
      } else {
        alert(authResult);
        throw new Error(authResult);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <Button
      mb="10px"
      align="center"
      w="270px"
      padding="10px 20px"
      onClick={googleLogin}
      colorScheme="blue"
      leftIcon={<Image src={googlelogo} alt="Google Logo" boxSize="20px" />}
    >
      Sign in with Google
    </Button>
  );
};
