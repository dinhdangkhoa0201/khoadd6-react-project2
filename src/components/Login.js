import React, {useState} from "react";
import {connect} from "react-redux";
import {Button, Card, Container, Form, Image} from "react-bootstrap";
import {login} from "../actions/authedUser";
import {LoadingBar} from "react-redux-loading-bar";

const DEFAULT_IMAGE = "https://i.pravatar.cc/100?img=1";

function Login(props) {
    const {users, dispatch} = props;
    const [avatar, setAvatar] = useState();
    const [userId, setUserId] = useState();

    const renderOption = (list) => {
        return Object.values(list).map((e, idx) => {
            return (
                <option key={e.id} value={e.id}>{e.name}</option>
            )
        })
    }

    const handleChooseUser = (event) => {
        const user = users[event.target.value];
        setAvatar(user.avatarURL);
        setUserId(user.id);
    }

    const handleLogin = () => {
        dispatch(login(userId));
    }

    return (
        <Container className={"mt-5 mb-1 w-25"}>
            <LoadingBar/>
            <Card>
                <Card.Header>
                    <Card.Title>Welcome to, Would You Rather</Card.Title>
                </Card.Header>
                <Card.Body>
                    <div className={"mb-5"} style={{textAlign: "center"}}>
                        <Image roundedCircle={true}
                               src={avatar || DEFAULT_IMAGE}/>
                    </div>
                    <Form>
                        <Form.Group>
                            <Form.Select onChange={event => {
                                handleChooseUser(event)
                            }}>
                                <option value={""}/>
                                {
                                    renderOption(users)
                                }
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Card.Body>
                <Card.Footer style={{textAlign: "end"}}>
                    <Button className={"btn btn-success"}
                            disabled={!userId}
                            onClick={() => handleLogin()}>Login</Button>
                </Card.Footer>
            </Card>
        </Container>
    )
}

function mapStateToProps({users}) {
    return {
        users
    }
}

export default  connect(mapStateToProps)(Login);
