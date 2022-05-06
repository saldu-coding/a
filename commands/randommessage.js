module.exports = {
    name:"랜덤메세지",
    execute(message){
        const randommsg = ["이거왜함","랜더므메시지","https://youtu.be/dQw4w9WgXcQ","살두#2977에 샌즈라고보낸다면 소정의선물을 드립니다"] //괄호안에 메세지 더 추가하시거나 수정하시면됩니다
        const random = Math.floor(Math.random() * randommsg.length)
        message.channel.send({content : `${randommsg[random]}`})
    }
}