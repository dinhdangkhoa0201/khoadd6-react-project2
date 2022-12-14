import {Redirect, Route} from "react-router-dom";

const PrivateRoute = ({component: Component, isLoggedIn, ...rest}) => (
    <Route {...rest} render={(props) => (
        isLoggedIn === true ?
            <Component {...props}/> :
            <Redirect to={{
                pathname: "/login",
                state: {
                    from: props.location
                }
            }}/>
    )}/>
)

export default PrivateRoute;
