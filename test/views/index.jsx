import React,{useState} from 'react'
import Layout from './indexLayout'
const io = require('socket.io')
function app() {
  const [messageList,setMessageList] = useState([])
  const [value,setValue] = useState("")
  const socket = socketIOClient('localhost:3000')
  const submit = (e) => {
    e.preventDefault()
    socket.emit('send message',)
  }
  return (

    <>
      <Layout>
        <div className="App">
          <section className="chat-list">
                <div className="message">
                  <p className="username">username</p>
                  <p className="message-text">message</p>
                </div>
          </section>
          <form className="chat-form" 
            onSubmit={e=>onsubmit(e)}
            >
            <div className="chat-inputs">
              <input
                type="text"
                autoComplete="off"
                onChange={e => setName(e.target.value)}
                value={value}
                placeholder="유저이름"
              />
              <input
                type="text"
                autoComplete="off"
                onChange={e => setValue(e.target.value)}
                value={value}
                placeholder="메세지입력하기"
              />
            </div>
            <button type="submit">입력하기</button>
          </form>
        </div>
      </Layout>
     
    </>
    
  );
}
export default app