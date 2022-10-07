import React, {useState} from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {connect} from "react-redux";
import {handleAddQuestion} from "../actions/questions";
import {useHistory} from "react-router-dom/cjs/react-router-dom";



function Question(props) {

    const {authedUser, handleAddQuestion, type} = props;
    const [optionOne, setOptionOne] = useState("");
    const [optionTwo, setOptionTwo] = useState("");
    const history = useHistory();

    const handleSubmitNewQuestion = () => {
        handleAddQuestion(optionOne, optionTwo, authedUser);
        history.push("/");
    }

    return (
        <Container>
            <Card>
                <Card.Header>
                    <Card.Title>Add Question</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Row>
                            <Col className={"col-6"}>
                                <Form.Control type={"text"}
                                              value={optionOne}
                                              onChange={event => setOptionOne(
                                                  event.target.value)}
                                              placeholder={"Option one"}/>
                            </Col>
                            <Col className={"col-6"}>
                                <Form.Control type={"text"}
                                              value={optionTwo}
                                              onChange={event => setOptionTwo(
                                                  event.target.value)}
                                              placeholder={"Option two"}/>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
                <Card.Footer>
                    <Button type={"button"}
                            onClick={() => handleSubmitNewQuestion()}
                            className={"btn btn-success"}>Save</Button>
                </Card.Footer>
            </Card>
        </Container>
    )
}

function mapStateToProps({authedUser}, {type}) {
    return {
        authedUser,
        type
    }
}

export default connect(mapStateToProps, {handleAddQuestion})(
    Question);
