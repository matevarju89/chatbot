import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useMutation,
  gql,
} from '@apollo/client';
import { Container, Row, Col, FormInput, Button, Form } from 'shards-react';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

const GET_MESSAGES = gql`
  query {
    messages {
      id
      content
      user
    }
  }
`;

const POST_MESSAGE = gql`
  mutation ($user: String!, $content: String!) {
    postMessage(user: $user, content: $content)
  }
`;

const Messages = ({ user }) => {
  const { data } = useQuery(GET_MESSAGES, {
    pollInterval: 500,
  });
  if (!data) {
    return null;
  } else {
    return (
      <>
        {data.messages.map(({ id, user: messageUser, content }) => (
          <div
            style={{
              display: 'flex',
              justifyContent: user === messageUser ? 'flex-end' : 'flex-start',
              paddingBottom: '1em',
            }}
            key={id}
          >
            {user !== messageUser && (
              <div
                style={{
                  height: 50,
                  width: 50,
                  marginRight: '0.5em',
                  border: '2px solid #e5e6ea',
                  borderRadius: 25,
                  textAlign: 'center',
                  fontSize: '18pt',
                  paddingTop: 5,
                }}
              >
                {messageUser.slice(0, 2).toUpperCase()}
              </div>
            )}
            <div
              style={{
                background: user === messageUser ? '#58bf56' : '#e5e6ea',
                padding: '1em',
                color: user === messageUser ? 'white' : 'black',
                borderRadius: '1em',
                maxWidth: '60%',
              }}
            >
              {content}
            </div>
          </div>
        ))}
      </>
    );
  }
};

const ChatContent = () => {
  const [state, setState] = React.useState({
    user: 'mateka',
    content: '',
  });
  const [postMessage] = useMutation(POST_MESSAGE);
  const onSend = () => {
    if (state.content.length > 0) {
      postMessage({
        variables: state,
      });
    }
    setState({
      ...state,
      content: '',
    });
  };
  return (
    <Container>
      <Messages user={state.user} />
      <Row>
        <Col xs={2} style={{ padding: 0 }}>
          <FormInput
            label='user'
            value={state.user}
            onChange={(evt) =>
              setState({
                ...state,
                user: evt.target.value,
              })
            }
          />
        </Col>
        <Col xs={8}>
          <FormInput
            label='Content'
            value={state.content}
            onChange={(evt) =>
              setState({
                ...state,
                content: evt.target.value,
              })
            }
            onKeyUp={(evt) => {
              if (evt.keyCode === 13) {
                onSend();
              }
            }}
          />
        </Col>
        <Col xs={2} style={{ padding: 0 }}>
          <Button onClick={() => onSend()}>Send</Button>
        </Col>
      </Row>
    </Container>
  );
};

export const Chat = () => (
  <ApolloProvider client={client}>
    <ChatContent />
  </ApolloProvider>
);
