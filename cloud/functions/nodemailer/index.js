// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
	env: 'timepostoffice-3w444',
	traceUser: true,
})

const db = cloud.database()
const _ = db.command

//更新数据库中的mail表
updateMail = async (mail) => {
  try {
    let updata = await db.collection('Mail').where({
      _id: mail._id
    }).update({
      data: {
        sendFlag: true
      }
    })
    return { code:'success', data:updata, mail:mail }
  } catch (error) {
    return { code:'error', msg:'updateMail 出现错误', mail:mail, error:error }
  }
}

//查询邮件列表,得到所有未发送的邮件
selectMail = async () => {
  let now = ~~((new Date()).getTime()/1000);
  try {
    let result = await db.collection('Mail').where({
      sendTime:_.lte(now),
      sendFlag: false,
    }).get()
    return result.data
  } catch (error) {
    return { code:'error', msg:'查询Mail表错误：', error:error }
  }

}

//发送邮件
sendMail = async (mail) => {
  let {toEmail, name, sendTime, createTime, content } = mail
  let nodemailer = require('nodemailer');
  //username替换为邮箱名，%40后面是邮件服务器的地址，比如163.com，password替换为邮箱密码（或独立密码，如果有设置的话），@后面填SMTP服务器地址，如163的smtp地址为smtp.163.com
  let transport = nodemailer.createTransport('smtps://username%40sina.cn:paseword@smtp.sina.cn');
  let mailOptions = {  
    from: '发件人邮箱',  //发件人
    to: toEmail,  //收件人，可以设置多个
    subject: `主题`,  //邮件主题
    // text: '测试一下',  //邮件文本
    html: `
    <p></p>
    <div>以下为邮件正文：</div>
    <hr>
    <div>${content}</div>
    `  //html格式文本
  };

  try {
    let send = await new Promise((resolve, reject)=>{
      transport.sendMail(mailOptions, (err, info) => {
        if(err){
          reject({code:'fail',mail:mail, msg:err})
        }
        resolve({code:'success',mail:mail, msg:info})
      });
    })
    return send
  } catch (error) {
    return { code:'error', msg:'发送邮件错误', mail:mail, error:error }
  }

}

//时间戳转日期
getDate = (nS) => { 
  let date=new Date(parseInt(nS)* 1000);
  let year=date.getFullYear();
  let mon = date.getMonth()+1;
  let day = date.getDate();
  return addZero(year)+'年'+addZero(mon)+'月'+addZero(day)+'日';
}

addZero = (num) => {
  return num > 9 ? num : '0'+num
}

//调用
action = async () => { 
  console.log('action')
  let sendSuccessMailList = []
  let sendFailMailList = []
  let waitSendMailList = await selectMail()

  for(let i in waitSendMailList){
    let sendMaimRes = await sendMail(waitSendMailList[i])
    console.log({sendMaimRes})
    if(sendMaimRes.code === 'success' ){
      let updataMail = await updateMail(waitSendMailList[i])
      console.log({updataMail})
      if( updataMail.code === 'success' ){
        sendSuccessMailList.push[waitSendMailList[i]]
      }else{
          sendFailMailList.push({mas:'发送成功，但数据库更新失败',mail:waitSendMailList[i]})
      }
    }else{
      sendFailMailList.push({mas:'发送失败',mail:waitSendMailList[i]})
    }
  }
  console.log({sendSuccessMailList, sendFailMailList})
  const log = cloud.logger()
  log.info({ sendSuccessMailList, sendFailMailList })
  return { sendSuccessMailList, sendFailMailList }
}
// action()

// 云函数入口函数
exports.main = async (event, context) => {
  return await action()
}
