import { useContext } from "react";
import ToastsContext from "../contexts/ToastsContext";

const useToasts = () => useContext(ToastsContext);

export default useToasts;