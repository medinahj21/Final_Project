import { useAuth } from "../../client/src/context/authContext";

const { getAllInfoUser } = useAuth();

getAllInfoUser().then( users => console.log(users));    
