import React from "react";
import {connect} from "react-redux";
import {Card, Container, Image, Table} from "react-bootstrap";

function LeaderBoard(props) {

    const {leaderBoard} = props;

    const render = (list) => {

        return list.map((e, idx) => (
            <tr key={e.id}>
                <td>{idx + 1}</td>
                <td>
                    <Image roundedCircle={true}
                           src={e.avatar}/>
                    <span className={"mx-5"}>{e.name}</span>
                </td>
                <td>{e.answersCount}</td>
                <td>{e.questionsCount}</td>
                <td>{e.total}</td>
            </tr>
        ))
    }

    return (
        <Container>
            <Card>
                <Card.Header>
                    <Card.Title>Leader Board</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Table size={"sm"}>
                        <thead>
                        <tr>
                            <th>Rank</th>
                            <th>User</th>
                            <th>Answered Questions</th>
                            <th>Create Question</th>
                            <th>Score</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            render(leaderBoard)
                        }
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>
    )
}

function mapStateToProps({users}) {
    const leaderBoard = Object.values(users).map((e) => ({
        id: e.id,
        name: e.name,
        avatar: e.avatarURL,
        answersCount: Object.values(e.answers).length,
        questionsCount: e.questions.length,
        total: Object.values(e.answers).length + e.questions.length
    })).sort((a, b) => a.total - b.total)
    .reverse();
    return {
        leaderBoard
    }
}

export default connect(mapStateToProps)(LeaderBoard);
