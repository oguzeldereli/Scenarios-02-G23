import { useEffect, useState } from "react"
import AuthLoader from "../../components/auth/AuthLoader";
import { isAuthorized } from "../../common/auth/Auth";


export default function RestrictedLayout()
{
    const [isAuth, setIsAuth] = useState(true);

    useEffect(() => {
        setIsAuth(isAuthorized());

        /// TODO: add authentication if not authenticated
    }, []);

    return (    
        <>
        {isAuthenticated ? <Outlet /> : <AuthLoader />}
        </>
    )
}