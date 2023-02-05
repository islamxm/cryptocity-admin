import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const CheckAuth = ({children}) => {
    const loc = useLocation();
    const {token} = useSelector(state => state);

    if(!token && loc.pathname !== '/auth') {
        return <Navigate to={'/auth'}/>
    }

    return (
        <>
            {children}
        </>
    )
}   


export default CheckAuth