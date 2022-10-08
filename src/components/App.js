import {connect} from "react-redux";
import React, {Fragment, useEffect} from "react";
import {handleInitialData} from "../actions/shared";
import {Route, Switch, withRouter} from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import LeaderBoard from "./LeaderBoard";
import NewQuestion from "./NewQuestion";
import Navigation from "./Navigation";
import {LoadingBar} from 'react-redux-loading-bar'
import AnswerQuestion from "./AnswerQuestion";
import {NotFound} from "./NotFound";

function App(props) {

    const {authedUser, dispatch, loading} = props;

    useEffect(() => {
        dispatch(handleInitialData());

    }, [])

    return (
        <div>
            <LoadingBar/>
            {
                loading === true ? null :
                    (
                        authedUser === null ?
                            (
                                <Route render={() => (
                                    <Login/>
                                )}/>
                            ) :
                            (
                                <Fragment>
                                    <Navigation/>
                                    <Switch>
                                        <Route exact path={"/"}
                                               component={Home}/>
                                        <Route path={"/add"}
                                               component={NewQuestion}/>
                                        <Route path={"/leaderboard"}
                                               component={LeaderBoard}/>
                                        <Route path={"/questions/:id"}
                                               component={AnswerQuestion}/>
                                        <Route component={NotFound}/>
                                    </Switch>
                                </Fragment>
                            )
                    )
            }
        </div>
    );
}

function mapStateToProps({authedUser}) {
    return {
        authedUser,
    }
}

export default withRouter(connect(mapStateToProps)(App));
