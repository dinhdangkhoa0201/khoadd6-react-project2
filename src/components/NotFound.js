import React from "react";
import {Alert, Button, Container} from "react-bootstrap";
import {useHistory} from "react-router-dom/cjs/react-router-dom";

export function NotFound() {

    const history = useHistory();

    return (
        <Container>
            <Alert variant={"danger"}>
                <Alert.Heading>404 - Page Not Found</Alert.Heading>
                <hr/>
                <div className="d-flex justify-content-end">
                    <Button variant="danger" onClick={() => history.push("/")}>
                        Click here to go Home
                    </Button>
                </div>
            </Alert>
        </Container>
    )
}
