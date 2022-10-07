import React from "react";
import {Container} from "react-bootstrap";
import Home from "./Home";
import LeaderBoard from "./LeaderBoard";
import NewQuestion from "./NewQuestion";
import AnswerQuestion from "./AnswerQuestion";
import {connect} from "react-redux";
import {Route, Switch} from "react-router-dom";
import Navigation from "./Navigation";

function Dashboard() {
    return (
        <Container>
            <Navigation/>
            <Switch>

            </Switch>
        </Container>
    )
}

export default connect()(Dashboard);
