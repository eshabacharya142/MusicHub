import { Navigate } from "react-router";
import { useSelector } from "react-redux";

const ProtectedEventCreate = ({ children }) => {
  const { currentUser } = useSelector((state) => state.users);
  if (currentUser) {
    if (currentUser.role === "MUSIC-CREATOR" || currentUser.role === "ADMIN") {
      return children;
    } else {
      return <Navigate to={"/"} />;
    }
  } else {
    return <Navigate to={"/login"} />;
  }
};
export default ProtectedEventCreate;
