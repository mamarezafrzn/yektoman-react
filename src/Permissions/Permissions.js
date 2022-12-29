import { useCookies } from "react-cookie";
import useAxiosFunction from "../axiosFetch/useAxiosFunction";
import baseUrlWithAuthFunc from "../apis/axiosBaseWithAuth";
import { useEffect, useState } from "react";

const Permissions = () => {
  const [permission, setPermission] = useState(false);
  const [cookies, setCookies] = useCookies(["user"]);
  const [userPosts, userError, userLoading, userAxiosFetch] =
    useAxiosFunction();

//   useEffect(() => {
//     fetchUserData();
//   }, []);

  const userData = () => {
    userAxiosFetch({
      axiosInstance: baseUrlWithAuthFunc(cookies.Token),
      method: "get",
      url: "/info",
    });
  };

  //   const checkPermission = () => {
  //     userPosts?.data?.user?.roles.map((item) => {
  //         item.name == "admin" ? setPermission(true) : setPermission(false);
  //       });
  //   };

//   console.log(userPosts?.data?.user)

  return [userPosts?.data?.user,userData];
};

export default Permissions;
