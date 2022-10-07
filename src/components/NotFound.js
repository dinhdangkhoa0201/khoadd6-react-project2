import React from "react";
import {Alert, Container} from "react-bootstrap";
import {Link} from "react-router-dom";

export function NotFound() {
    return (
        <Container>
            <Alert variant={"danger"}>
                <h1>404 - Page Not Found.</h1>
                <Link to={"/"}>Click here</Link> to go Home
            </Alert>
        </Container>
    )
}
