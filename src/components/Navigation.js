import React from "react";
import {Button, Container, Nav, Navbar, NavItem} from "react-bootstrap";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../actions/authedUser";
import {useHistory} from "react-router-dom/cjs/react-router-dom";

const navLink = [
    {
        path: "/",
        label: "Home",
    }, {
        path: "/new",
        label: "New Question",
    }, {
        path: "/leaderboard",
        label: "Leader Board",
    },
]

function Navigation(props) {

    const {location, authedUser, logout} = props;
    const history = useHistory();

    const renderNavLink = (list) => {
        return list.map((e, idx) => (
            <NavItem key={idx}>
                <Link
                    className={e.path === location.pathname ? "nav-link active"
                        : "nav-link"} to={e.path}>
                    {e.label}
                </Link>
            </NavItem>
        ))
    }

    const handleLogOut = () => {
        console.log("log out");
        logout();
        history.push("/");
    }

    return (
        <Navbar className={"mb-3"}>
            <Container>
                <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
                <Nav className={"navbar-collapse"} fill variant="tabs"
                     activeKey={location.pathname}>
                    {
                        renderNavLink(navLink)
                    }
                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    <Button onClick={() => handleLogOut()}>
                        {authedUser} Log out
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

function mapStateToProps({authedUser}) {
    return {
        authedUser
    }
}

export default withRouter(connect(mapStateToProps, {logout})(Navigation));
