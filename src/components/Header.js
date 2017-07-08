import React from 'react';
import {Button , Modal , Input } from 'antd'
import axios from 'axios';
class Header extends React.Component{
    constructor(){
        super()
        this.state={
            isLogin:false,
            visible:false,
            confirmLoading: false,
            input:''
        }
    }
    render(){
        let {isLogin,visible,confirmLoading,input} =this.state
        return(
            <header className='header'>
              <h1>cnode</h1>
              {
                isLogin?
                <div>user</div>
                :
                <div>
                    <Button type="primary" onClick={()=>this.setState({visible:true})}>登录</Button>
                    <Modal
                      title="登录"
                      visible={visible}
                      onOk={()=>console.log(12)}
                      onCancel={()=>this.setState({visible:false})}
                      confirmLoading={confirmLoading}
                    >
                    <Input placeholder="Basic usage" value={input} onChange={e=>this.setState({input:e.target.value})}/>
                    </Modal>
                </div>

              }
            </header>
            )
    }
}
export default Header