const { MessageEmbed } = require('discord.js');
const separator = '+' // <perfix>투표 제목 + 질문 중간에 + 가 제목, 질문 갯수를 확인하는 것이다
const embedColor = "BLUE" // 그냥 말하면 일반적인 임베드 색이다

module.exports = {
    name: "투표",
    async execute(message, args) {
        const findSep = args.find(char => char.includes(separator));
        if (findSep === undefined) {
            const question = args.join(' ')
            if (!question) {
                const questionerror = new MessageEmbed();
                questionerror
                    .setDescription(`❌ 제목을 입력하세요!\n-투표 [제목]`)
                    .setColor('RED')
                return message.reply({embeds : [questionerror]});
            }
          message.channel.send("<@&960049805973946388>")  
          const embed = new MessageEmbed().setTitle('📊 ' + question).setColor(embedColor);
            await message.reply({ embeds : [embed] }).then(msg => {
                msg.react('<:yes:960051026759671848>');
                msg.react('<:no:960051096938754070> ');
            });
        }
        else {
            const embed = new MessageEmbed();
            const options = [];
            let j = 0;
            for (let i = 0; i < args.length; i++) {
                if (args[i] === separator) {
                    args.splice(i, 1);
                    const question = args.splice(0, i);
                    embed.setTitle('📊 ' + question.join(' '));
                    break;
                }
            }
            for (let i = 0; i < args.length; i++) {
                if (args[i] === separator) {
                    args.splice(i, 1);
                    options[j] = args.splice(0, i);
                    j++;
                    i = 0;
                }
            }
            
            const alphabet = [
                '1️⃣',
                '2️⃣',
                '3️⃣',
                '4️⃣',
                '5️⃣',
                '6️⃣',
                '7️⃣',
                '8️⃣',
                '9️⃣',
                '🔟'
            ];
    
            const arr = [];
            options[j] = args;
            if (options.length > alphabet.length) {
                const optionerror = new MessageEmbed();
                optionerror
                    .setDescription(`❌ 10개 이상의 옵션을 입력하지마세요!\n-투표 [제목] + [질문] + [질문]`)
                    .setColor('RED')
                return await message.reply({embeds : [optionerror]})
            }
            let count = 0;
            options.forEach(option => {
                arr.push(alphabet[count] + ' ' + option.join(' '));
                count++;
            });
            embed
                .setDescription(arr.join('\n\n'))
                .setColor(embedColor);
            await message.reply({ embeds : [embed] }).then(msg => {
                for (let i = 0; i < options.length; i++) {
                    msg.react(alphabet[i]);
                }
            });
        }
    }
}