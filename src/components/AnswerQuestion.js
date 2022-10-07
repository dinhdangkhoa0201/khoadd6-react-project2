import React, {useState} from "react";
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

const OPTION_0NE = "optionOne";
const OPTION_TWO = "optionTwo";

const VIEW_RESULT = "VIEW_RESULT";
const ANSWER_QUESTION = "ANSWER_QUESTION";

function AnswerQuestion(props) {

    console.log("AnswerQuestion props", props);
    const history = useHistory();
    const {author, question, type, answers, questionId} = props;
    const [option, setOption] = useState();

    const handleCancel = () => {
        history.push("/");
    }

    const handleChangeRadio = (event) => {
        setOption(event.target.value);
    }

    const renderResult = () => {
        const countOptionOne = Object.keys(
            _.filter(answers, [questionId, 'optionOne'])).length * 20;
        const countOptionTwo = Object.keys(
            _.filter(answers, [questionId, 'optionTwo'])).length * 20;

        return (
            <>
                <ProgressBar now={countOptionOne} className={"mb-5"}
                             label={countOptionOne} visuallyHidden/>
                <ProgressBar now={countOptionTwo} label={countOptionTwo}
                             visuallyHidden/>
            </>
        )
    }

    return (
        <Container>
            <Card className={"w-50"}>
                <Card.Header>
                    <Card.Title>{author.name} asks:</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col className={"col-sm-4"}>
                            <Image src={author.avatarURL}/>
                        </Col>
                        <Col className={"col-sm-8"}>
                            {
                                type === ANSWER_QUESTION ?
                                    (
                                        <>
                                            <Card.Text>Would you
                                                rather...</Card.Text>
                                            <Form>
                                                <Form.Check type={"radio"}
                                                            name={"optionOne"}
                                                            checked={option
                                                            === OPTION_0NE}
                                                            value={OPTION_0NE}
                                                            label={question.optionOne.text}
                                                            onChange={event => handleChangeRadio(
                                                                event)}/>
                                                <Form.Check type={"radio"}
                                                            name={"optionOne"}
                                                            checked={option
                                                            === OPTION_TWO}
                                                            value={OPTION_TWO}
                                                            label={question.optionTwo.text}
                                                            onChange={event => handleChangeRadio(
                                                                event)}/>
                                            </Form>
                                        </>
                                    ) : (
                                        <>
                                            <Card.Text>Would you
                                                rather...</Card.Text>
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
                    <Button type={"button"}
                            className={"btn btn-success"}>Submit</Button>
                    {' '}
                    <Button type={"reset"} className={"btn btn-warning"}
                            onClick={() => handleCancel()}>
                        Cancel
                    </Button>
                </Card.Footer>
            </Card>
        </Container>
    )
}

function mapStateToProps({authedUser, users, questions}, {match}) {
    const questionId = match.params.id;
    const question = questions[questionId];
    const user = users[authedUser];
    const author = users[question.author];
    const answers = Object.values(users).map(e => e.answers)
    return {
        questionId,
        author,
        question,
        answers,
        type: Object.keys(user.answers).find(e => e === questionId)
        === undefined ? ANSWER_QUESTION : VIEW_RESULT
    }
}

export default connect(mapStateToProps)(AnswerQuestion);
