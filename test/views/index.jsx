import React,{useEffect, useState} from 'react'
import Layout from './indexLayout'
import io from 'socket.io'
import socketIOClient from 'socket.io-client'

var Message = {name:"",message:""}
function app() {
  const [messageList,setMessageList] = useState([Message])
  const [nameState, setName] =useState({name:""});
  const {name} = nameState
  const [valueState,setValue] = useState({value:""})
  const value  = valueState
  const socket = io()

  const onChangeName = e => {
    e.preventDefault()
    setName({
      name:e.target.value
    })
  }
  const onChangeValue = e => {
    e.preventDefault(
      setValue({
        value:e.target.value
      })
    )
  }
  const onsubmit =(e)=> {
    e.preventDefault()
    socket.emit('send message',{name:name,message:value})
  }

  useEffect(()=> {
    socket.on('receive message',Message => {
      setMessageList(messageList=> messageList.concat(message))
    })
  },[])
  return (

    <>
      <Layout>
        <div className="App">
          {name}
          <section className="chat-list">
            {messageList.map((Message,i)=> {
               <div key={i} className="message">
                  <p className="username">{Message.name}</p>
                  <p className="message-text">{Message.message}</p>
                </div>
            })
            
            }
               
          </section>
          <form className="chat-form" 
           onSubmit={(e)=> onsubmit(e)}
            >
            <div className="chat-inputs">
              <input
                type="text"
                autoComplete="off"
                onChange={e => onChangeName(e)}
                value={name}
                placeholder="유저이름"
              />
              <input
                type="text"
                autoComplete="off"
                onChange={e => 
                  
                  onChangeValue(e)}
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