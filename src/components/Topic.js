import React from 'react';
import {message ,Card ,BackTop ,Avatar ,Input ,Button ,Icon ,Modal} from 'antd';
import {url} from '../config'
import axios from 'axios';
import moment from 'moment';
class Topic extends React.Component{
  constructor(){
      super()
      this.state={
          data:null,
          comment:'',
          visible:false,
          reply:'',
          replyInfo:null
      }
  }
  getData(){
      let id=this.props.match.params.id
      console.log(id)
      axios.get(`${url}/topic/${id}`)
      .then(res=>{
        this.setState({data:res.data.data})
      })
      .catch(err=>{
        message.error('数据请求失败')
      })
  }
  componentDidMount(){
      this.getData()
  }
  handleComment(type){
      if(sessionStorage.accesstoken){
          var accesstoken=sessionStorage.accesstoken
      }else{
          alert('请先登录')
          return
      }
      if(type==='comment'){
        var comments= this.state.comment
      }else{
        var comments= this.state.reply
      }
      if(type==='type') data.reply_id=this.state.replyInfo.id
      let id =this.state.data.id

      axios.post(`${url}/topic/${id}/replies`,{accesstoken,content:comments})
      .then(res=>{
        this.setState({comment:''})
        this.getData()
        if(type==='reply') this.setState({visible:false})
      })
      .catch(err=>message.error('评论失败'))
  }
  handleReply(){
    console.log(1)
    this.setState({visible:true})
  }
  showReply(reply){
    console.log(reply)
    this.setState({
      visible:true,
      // 回复个人
      replyInfo:reply,
      // 内容显示@当前人
      reply:`@${reply.author.loginname} `
    })
  }
  // 点赞
  handleLike(reply_id){
   if(sessionStorage.accesstoken){
        var accesstoken=sessionStorage.accesstoken
    }else{
        alert('请先登录')
        return
    }
    axios.post(`${url}/reply/${reply_id}/ups`,{accesstoken})
    .then(res=>this.getData())
    .catch(err=>message.error('点赞失败'))
  }
  render(){
    let {data,comment,visible,reply,replyInfo}=this.state
    // console.log(data)
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
                  <Button type='primary' onClick={this.handleComment.bind(this,'comment')}>提交</Button>
                  <h1>全部回复</h1>
                  {
                      data.replies.map(item=>(
                          <div className='comment' key={item.id}>
                              <Avatar src={item.author.avatar_url} />
                              <div className='comment-right'>
                                  <div className='comment-icon'>
                                    <span>{item.author.loginname}·{moment(item.create_at).fromNow()}</span>
                                    <span>
                                      <Icon type="like-o" onClick={this.handleLike.bind(this,item.id)}/>{item.ups.length}&nbsp;&nbsp;

                                      <Icon type="message" onClick={this.showReply.bind(this,item)} />
                                    </span>
                                  </div>
                                  <div dangerouslySetInnerHTML={{__html:item.content}} className='content-down'></div>
                              </div>
                          </div>
                        ))
                  }

              </div>
            ):null
           }
           </Card>
           <Modal
              title={replyInfo ? `回复：${replyInfo.author.loginname}` :
              '回复：'}
              visible={visible}
              onOk={this.handleComment.bind(this,'reply')}
              onCancel={()=>this.setState({visible:false})}
            >
            <Input type='textarea' rows={4} value={reply} onChange={e=>this.setState({reply:e.target.value})}/>
          </Modal>
          <BackTop />
        </div>
        )
  }
}
export default Topic