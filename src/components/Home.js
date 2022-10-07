import React, {useState} from "react";
import {connect} from "react-redux";
import {Button, Card, Container, Tab, Tabs} from "react-bootstrap";
import {Link} from "react-router-dom";

const UNANSWERED = "Unanswered";
const ANSWERED = "Answered";

function Home(props) {
    const {
        answeredQuestion,
        unAnsweredQuestion
    } = props;

    const [type, setType] = useState(UNANSWERED);

    const renderPanel = (list) => {
        return list.map((e) => (
            <Card key={e.id} className={"mb-5"}>
                <Card.Header>
                    <Card.Title>Author: {e.author}</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Container>
                        <Card.Text>Question 1: {e.optionOne.text}</Card.Text>
                        <Card.Text>Question 2: {e.optionTwo.text}</Card.Text>
                    </Container>
                </Card.Body>
                <Card.Footer>
                    <Link to={`/questions/${e.id}`}>
                        <Button type={"button"} className={"btn btn-success"}>
                            Answer Question
                        </Button>
                    </Link>
                </Card.Footer>
            </Card>
        ))
    }

    return (
        <Container>
            <Card>
                <Tabs fill activeKey={type}
                      onSelect={eventKey => setType(eventKey)}>
                    <Tab title={UNANSWERED} eventKey={UNANSWERED}
                         className={"p-5"}>
                        {
                            renderPanel(unAnsweredQuestion)
                        }
                    </Tab>
                    <Tab title={ANSWERED} eventKey={ANSWERED} className={"p-5"}>
                        {
                            renderPanel(answeredQuestion)
                        }
                    </Tab>
                </Tabs>
            </Card>
        </Container>
    )
}

function mapStateToProps({authedUser, questions, users}) {
    const user = users[authedUser];
    const answerKeys = Object.keys(user.answers);

    const answeredQuestion = Object.values(questions).filter(
        (question) => answerKeys.includes(question.id)).sort(
        (a, b) => b.timestamp - a.timestamp);
    const unAnsweredQuestion = Object.values(questions).filter(
        (question) => !answerKeys.includes(question.id)).sort(
        (a, b) => b.timestamp - a.timestamp);
    return {
        answeredQuestion,
        unAnsweredQuestion
    }
}

export default connect(mapStateToProps)(Home);
