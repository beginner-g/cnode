import React from 'react';
import {Button , Modal , Input , message , Menu , Dropdown , Avatar} from 'antd'
import axios from 'axios';
import {Link} from 'react-router-dom'
import {url} from '../config'
class Header extends React.Component{
    constructor(){
        super()
        this.state={
            isLogin:false,//登录
            visible:false,//模态框
            confirmLoading: false,//加载
            input:'e72e1c20-f0c7-46d7-b795-c3346f3c4d0b',//密码
            user:null//用户信息
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
        this.setState({
          isLogin:true,
          visible:false,
          confirmLoading: false,
          user:res.data
        })
          sessionStorage.accesstoken=accesstoken
      })
      .catch(err=>{
        message.error('登录失败，请重试')
        this.setState({
           confirmLoading: false
        })
      })
    }
    handleLogout(){
      this.setState({
        isLogin:false,
        user:null
      })
    sessionStorage.removeItem('accesstoken')
    }
    render(){
        let {isLogin,visible,confirmLoading,input,user} =this.state
        // console.log(user)
        const menu = !isLogin ?<p>11</p>
        :(
        <Menu>
          <Menu.Item>
            <h3>{user.loginname}</h3>
          </Menu.Item>
          <Menu.Item>
            <a href="#">个人中心</a>
          </Menu.Item>
          <Menu.Item>
             <Button type="danger" onClick={this.handleLogout.bind(this)}>退出</Button>
          </Menu.Item>
        </Menu>
      )
        return(
            <header className='header'>
              <h1><Link to='/'>cnode</Link></h1>
              {
                isLogin?
                <div>
                  <Dropdown overlay={menu}>
                    <Avatar src={user.avatar_url} alt="avatar_url" />
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