import { useAuth } from "../context/AuthContext";
import Homepage from "./Homepage";
import Mascot from "./Mascot";

export default function HomeGuard() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Homepage /> : <Mascot />;
}
