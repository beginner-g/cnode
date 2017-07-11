import React from 'react';
import {message ,Card ,BackTop ,Avatar ,Input ,Button} from 'antd';
import {url} from '../config'
import axios from 'axios';
import moment from 'moment';
class Topic extends React.Component{
    constructor(){

        super()
        this.state={
            data:null,
            comment:''
        }
    }
    componentDidMount(){
        let id=this.props.match.params.id
        axios.get(`${url}/topic/${id}`)
        .then(res=>this.setState({data:res.data.data}))
        .catch(err=>message.error('数据请求失败'))
    }
    handleComment(){
        if(sessionStorage.accesstoken){
            var accesstoken=sessionStorage.accesstoken
        }else{
            alert('请先登录')
            return
        }
        let comments= this.state.comment
        let id =this.state.data.id
        axios.post(`${url}/topic/${id}/replies`,{accesstoken,content:comments})
        .then(res=>res.data.data)
        .catch(err=>message.error('评论失败'))
    }
    render(){
        let {data,comment}=this.state
        console.log(data)
        return(
            <div>
               <Card loading={!data}>
               {
                data?(
                    <div>
                        <h1 style={{textAlign:'center'}}>{data.title}</h1>
                        <div className='topic-con'>
                            <Avatar src={data.author.avatar_url} />
                            <span>回复量：{data.reply_count}</span>
                            <span>阅读量：{data.visit_count}</span>
                        </div>
                        <div className='content' dangerouslySetInnerHTML={{__html:data.content}}/>
                        <h1>发表评论</h1>
                        <Input type='textarea' rows={4} value={comment}onChange={e=>this.setState({comment:e.target.value})} placeholder='留下评论...'></Input>
                        <Button type='primary' onClick={this.handleComment.bind(this)}>提交</Button>
                        <h1>全部回复</h1>
                        {
                            data.replies.map(item=>(
                                <div className='comment' key={item.id}>
                                    <Avatar src={item.author.avatar_url} />
                                    <div>
                                        <span>{item.author.loginname}</span>
                                        <div dangerouslySetInnerHTML={{__html:item.content}}></div>
                                    </div>
                                </div>
                                ))
                        }

                    </div>
                ):null
               }
               <BackTop />
               </Card>
            </div>
            )
    }
}
export default Topic