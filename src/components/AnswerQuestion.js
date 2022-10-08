import React, {useEffect, useState} from "react";
import {
    Button,
    Card,
    Col,
    Container,
    Form,
    Image,
    ProgressBar,
    Row
} from "react-bootstrap";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom/cjs/react-router-dom";
import _ from "lodash";
import {handleAddAnswerToUser} from "../actions/users";

const OPTION_0NE = "optionOne";
const OPTION_TWO = "optionTwo";

const VIEW_RESULT = "VIEW_RESULT";
const ANSWER_QUESTION = "ANSWER_QUESTION";

function AnswerQuestion(props) {

    const history = useHistory();
    const {
        authedUser,
        author,
        question,
        type,
        answers,
        questionId,
        handleAddAnswerToUser
    } = props;
    const [option, setOption] = useState();
    const [viewMode, setViewMode] = useState(type);

    useEffect(() => {
        if (question === undefined) {
            history.push("/404");
        }
    })

    const handleCancel = () => {
        history.push("/");
    }

    const handleChangeRadio = (event) => {
        setOption(event.target.value);
    }

    const handleSubmit = () => {
        handleAddAnswerToUser(authedUser, questionId, option);
        setViewMode(VIEW_RESULT);
    }

    const renderResult = () => {
        const countOptionOne = Object.keys(
            _.filter(answers, [questionId, 'optionOne'])).length;
        const countOptionTwo = Object.keys(
            _.filter(answers, [questionId, 'optionTwo'])).length;
        const sum = countOptionOne + countOptionTwo;
        const optionOnePercent = countOptionOne/(sum) * 100;
        const optionTwoPercent = countOptionTwo/(sum) * 100;

        return (
            <>
                <Card className={"mb-1"}>
                    <Card.Header>
                        <Card.Title>
                            {question.optionOne.text}: {countOptionOne} in {sum}
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <ProgressBar now={optionOnePercent}
                                     label={`${optionOnePercent}%`}/>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Header>
                        <Card.Title>
                            {question.optionTwo.text}: {countOptionTwo} in {sum}
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <ProgressBar now={optionTwoPercent}
                                     label={`${optionTwoPercent}%`}/>
                    </Card.Body>
                </Card>
            </>
        )
    }

    return (
        <Container>
            <Card className={"w-50"}>
                <Card.Header>
                    {
                        author !== null ?
                            <Card.Title>{author.name} asks:</Card.Title> : null
                    }
                </Card.Header>
                <Card.Body>
                    <Row>
                        {
                            author !== null ?
                                <Col className={"col-sm-4"}>
                                    <Image src={author.avatarURL}/>
                                </Col> : null
                        }
                        <Col className={"col-sm-8"}>
                            {
                                viewMode === ANSWER_QUESTION ?
                                    (
                                        <>
                                            <Card.Title>Would you
                                                rather...</Card.Title>
                                            <Form>
                                                <Form.Check type={"radio"}
                                                            name={"optionOne"}
                                                            checked={option
                                                            === OPTION_0NE}
                                                            value={OPTION_0NE}
                                                            label={question
                                                            === undefined ? ""
                                                                : question.optionOne.text}
                                                            onChange={event => handleChangeRadio(
                                                                event)}/>
                                                <Form.Check type={"radio"}
                                                            name={"optionOne"}
                                                            checked={option
                                                            === OPTION_TWO}
                                                            value={OPTION_TWO}
                                                            label={question
                                                            === undefined ? ""
                                                                : question.optionTwo.text}
                                                            onChange={event => handleChangeRadio(
                                                                event)}/>
                                            </Form>
                                        </>
                                    ) : (
                                        <>
                                            <Card.Title>Would you
                                                rather...</Card.Title>
                                            {
                                                renderResult()
                                            }
                                        </>
                                    )
                            }
                        </Col>
                    </Row>
                </Card.Body>
                <Card.Footer>
                    {
                        viewMode === ANSWER_QUESTION ?
                            (
                                <>
                                    <Button type={"button"}
                                            disabled={!option}
                                            onClick={() => handleSubmit()}
                                            className={"btn btn-success"}>Submit</Button>
                                    {' '}
                                    <Button type={"reset"}
                                            className={"btn btn-warning"}
                                            onClick={() => handleCancel()}>
                                        Cancel
                                    </Button>
                                </>
                            ) : (
                                <><Button type={"button"}
                                          onClick={() => history.push("/")}
                                          className={"btn btn-secondary"}>Cancel</Button>

                                </>
                            )
                    }
                </Card.Footer>
            </Card>
        </Container>
    )
}

function mapStateToProps({authedUser, users, questions}, {match}) {
    const questionId = match.params.id;
    const question = questions[questionId];
    const user = users[authedUser];
    const author = question ? users[question.author] : null;
    const answers = Object.values(users).map(e => e.answers)
    return {
        authedUser,
        questionId,
        author,
        question,
        answers,
        type: Object.keys(user.answers).find(e => e === questionId)
        === undefined ? ANSWER_QUESTION : VIEW_RESULT
    }
}

export default connect(mapStateToProps, {handleAddAnswerToUser})(
    AnswerQuestion);
