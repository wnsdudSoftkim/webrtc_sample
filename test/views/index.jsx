import React,{useEffect, useState} from 'react'
import Layout from './indexLayout'
import io from 'socket.io-client'
const socket = io()


function app() {
  const [Message,setMessage] = useState("")
  //name을 위한 useState
  const [nameState, setName] =useState({name:""});
  const {name} = nameState
  //message를 위한 useState
  const [valueState,setValue] = useState({value:""})
  const value  = valueState


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
  const send =()=> {
    
    socket.emit('send message',{
      name:name,
      message:value
    })
    console.log(""+name,value)
    
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
          
          <form className="chat-form" 
          
            >
            <div className="chat-inputs">
              <input
                className="input"
                type="text"
                autoComplete="off"
                onChange={e => onChangeName(e)}
                value={name}
                placeholder="유저이름"
              />
              <input
              className="input"
                type="text"
                autoComplete="off"
                onChange={e => 
                  
                  onChangeValue(e)}
                value={value}
                placeholder="메세지입력하기"
              />
            </div>
            <input className="btn" onClick={onSubmit}/>
          </form>
          <textarea className="chat_log" readOnly></textarea>
        </div>
      </Layout>
     
    </>
    
  );
}
export default app