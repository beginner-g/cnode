import React from 'react';
import {Button , Modal , Input ,message ,Menu, Dropdown,Avatar } from 'antd'
import axios from 'axios';
import {url} from '../config'
class Header extends React.Component{
    constructor(){
        super()
        this.state={
            isLogin:false,
            visible:false,
            confirmLoading: false,
            input:'e72e1c20-f0c7-46d7-b795-c3346f3c4d0b',
            user:null
        }
    }
    handleOk(){
      this.setState({
        confirmLoading: true
      })
      let accesstoken =this.state.input
      axios.post(`${url}/accesstoken`,{accesstoken})
      .then(res=>{
        message.success('登录成功')
        console.log(res)
        this.setState({
          isLogin:true,
          visible:false,
          confirmLoading: false,
          user:res.data,
          sessionStorage.accesstoken=accesstoken
        })
      })
      .catch(err=>message.error('登录失败，请重试'))
    }
    render(){
        let {isLogin,visible,confirmLoading,input,user} =this.state
        return(
            <header className='header'>
              <h1>cnode</h1>
              {
                isLogin?
                <div>
                  <Dropdown overlay={menu}>
                    <Avatar size="" icon="user" />
                  </Dropdown>
                </div>
                :
                <div>
                    <Button type="primary" onClick={()=>this.setState({visible:true})}>登录</Button>
                    <Modal
                      title="登录"
                      visible={visible}
                      onOk={this.handleOk.bind(this)}
                      onCancel={()=>this.setState({visible:false})}
                      confirmLoading={confirmLoading}
                      okText='登录'
                      cancelText='取消'
                    >
                    <Input placeholder="请输入" value={input} onChange={e=>this.setState({input:e.target.value})}/>
                    </Modal>
                </div>

              }
            </header>
            )
    }
}
export default Header