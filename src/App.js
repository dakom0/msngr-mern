import React, { useEffect, useState } from 'react';
import './App.css';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core'
import Message from './Message';
import FlipMove from 'react-flip-move'
import SendIcon from '@material-ui/icons/Send'
import IconButton from '@material-ui/core/IconButton'
import axios from './axios'
import Pusher from 'pusher-js';

const pusher = new Pusher('b7fcde096976d3f8df9e', {
  cluster: 'mt1'
});

function App() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [username, setUsername] = useState('')

  const sync = async () => {
    await axios.get('/save/conversation')
    .then((res) => {
      setMessages(res.data)
    })
  }
  
    const channel = pusher.subscribe('messages');
    channel.bind('newMessages', function(data) {
      sync();
    });

  useEffect(() => {
    sync()
  }, [])

   

  useEffect(() => {
    setUsername(prompt('Please enter your name'))
  }, [])

  const sendMessage = (e) => {
    e.preventDefault()

    axios.post('/save/message', {
        message: input,
        username: username,
        timestamp: new Date()
    })

    setInput('')
  }

  return (
    <div className="App">
      <img src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100" alt="messenger logo" />
      <h2>Welcome {username}</h2>

      <form className='app__form' >
        <FormControl className='app__formControl' >
          <Input className='app__input' placeholder='Enter a message...' value={input} onChange={(e) => setInput(e.target.value)} />
          <IconButton className='app__iconButton' variant='text' color='primary' disabled={!input} onClick={sendMessage} type="submit" >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

      <FlipMove style={{position: "relative" , overflowY: "auto", height: "65vh"}}>
        {
          messages.map(((message) => (
            <Message key={message._id} message={message} username={username} timestamp={message.timestamp}/>
          )))
        }
      </FlipMove>
    </div>
  );
}

export default App;
