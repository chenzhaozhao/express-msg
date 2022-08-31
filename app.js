const nodemailer = require('nodemailer')
const axios = require("axios");
// 创建一个SMTP客户端配置
const config = {
    service: "QQ",
    auth: {
        // 发件人邮箱账号
        user: '826764720@qq.com',
        //发件人邮箱的授权码 这里可以通过qq邮箱获取 并且不唯一
        pass: 'hmovezxffjynbdci'   //授权码生成之后，要等一会才能使用，否则验证的时候会报错，但是不要慌张哦
    }
}
//创建一个SMTP客户端配置对象
const transporter = nodemailer.createTransport(config)
// https://api.shadiao.pro/chp
setInterval(async () => {
    try {
        const now = new Date();
        const hour = now.getHours();
        const min = now.getMinutes();
        if (hour == 8 && min == 0) {
            const { data: { lives } } = await axios.get(`https://restapi.amap.com/v3/weather/weatherInfo?key=6fd28a17711cf71ee30032c750ff506a&city=320506&extensions=base&output=json`)
            const { province,city,weather,temperature,winddirection,windpower,humidity } = lives[0];
            // const { data: { returnObj } } 
            const { data: { data: { text } } } = await axios.get("https://api.shadiao.pro/chp" || "https://api.lovelive.tools/api/SweetNothings/3/Serialization/Json");
            //创建一个收件人对象
            const mail = {
                // 发件人 邮箱  '昵称<发件人邮箱>'
                from: `"👻"<826764720@qq.com>`,
                to: '2466601792@qq.com',
                subject: "张同学",
                html: `<div
                style="box-sizing:border-box;width: 100vw;height:100vh;background-repeat: no-repeat;background-size: cover;filter: gray;-webkit-filter: grayscale(50%);padding: 1rem;">
                <div style="font-weight:bold">亲爱的张同学:</div>
        
                <div style="padding-left:.8rem;font-size: 14px;padding-top: .4rem;">
                    ${text}
                </div>
                <div style=" display: flex;
                justify-content:center;">
                        <div style="font-style: italic;margin-top: 1rem;">
                            <span>吴中区天气：</span><span>${weather}</span></br/>
                            <span>温度：</span><span>${temperature}℃</span>
                    </div>
                </div>
            </div>
            </div>`
            }
            transporter.sendMail(mail, function (error, info) {
                if (error) {
                    return console.log(error);
                }
                transporter.close()
            })
        }

    } catch (e) { }

}, 6000)
