import React from 'react'
import {url} from '../config'
import axios from 'axios'
import {message,Avatar,Spin,Card } from 'antd'
import moment from 'moment'
import {Link,NavLink} from 'react-router-dom'
class PeopleCenter extends React.Component{
  constructor(){
    super()
    this.state={
      data:null
    }
  }
  componentDidMount(){
    let loginname=this.props.location.state
    axios.get(`${url}/user/${loginname}`)
        .then(res=>this.setState({data:res.data.data}))
        .catch(err=>message.error('用户信息请求失败'))
  }
    render(){
        let {data} =this.state
        console.log(data)
        return(
            <div>
              {
                data?
                  (
                    <Card className='home'>
                      <Link to='/'><h1>主页</h1></Link>
                      <img src={data.avatar_url} alt="avatar_url"/>
                      <span>{data.loginname}</span>
                      <p>积分 {data.score}</p>
                      <h1>最近创建的话题</h1>
                      {
                        data.recent_topics.map(item=>(
                          <p key={item.id}>
                            <Link to={`/user/${item.author.loginname}`}>
                              <Avatar shape="square" src={item.author.avatar_url} />
                            </Link>
                            <Link to={`/uesr/${item.author.loginname}`}>{item.author.loginname}
                            </Link>
                            <Link to={`/topic/${item.id}`}>{item.title}
                            </Link>
                          </p>
                        ))
                      }
                      <h1>最近参与的话题</h1>
                      {
                        data.recent_replies.map(item=>(
                            <p key={item.id}>
                              <Link to={`/user/${item.author.loginname}`}>
                                <Avatar shape="square" src={item.author.avatar_url} />
                              </Link>
                              <Link to={`/uesr/${item.author.loginname}`}>{item.author.loginname}
                              </Link>
                              <Link to={`/topic/${item.id}`}>{item.title}</Link>
                            </p>
                          ))
                      }
                    </Card>
                  )
                :
                <div style={{textAlign:'center'}}><Spin size="large" /></div>
              }

            </div>
            )
    }
}
export default PeopleCenter