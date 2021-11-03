import React, { useState, useCallback } from 'react';
import { useAsyncOp } from 'use-async-ops'
import * as asyncOpNames from '../../constants/asyncOpNames'
import { useHistory } from "react-router-dom";
import { FormGroup, Label, Input, Button, } from 'reactstrap';

import './index.scss';

export default function Login() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  let history = useHistory();

  const { call } = useAsyncOp({ name: asyncOpNames.GET_TOKEN })


  const getToken = useCallback((username, password) => {
    const usernamePass = { username, password }
    call(usernamePass)
      .then((response) => {
        if (response.status !== 200) {
          alert(response.msg)
        } else {
          localStorage.setItem('token', response.token)
          history.push('/info')
        }
      })
  }, [call]);


  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <FormGroup>
        <Label>Username</Label>
        <Input type="text" onChange={e => setUserName(e.target.value)} />
        <Label>Password</Label>
        <Input type="password" onChange={e => setPassword(e.target.value)} />
        <Button onClick={() => getToken(username, password)}>Submit</Button>
      </FormGroup>
    </div>
  )
}