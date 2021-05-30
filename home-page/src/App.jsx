import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from 'shards-react';
import { Chat } from 'chat/Chat';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'shards-ui/dist/css/shards.min.css';

const App = () => (
  <Container>
    <h1>This is the home page</h1>
    <p>Lorm ipsum dolor sit amet--</p>
    <Chat />
  </Container>
);

ReactDOM.render(<App />, document.getElementById('app'));
