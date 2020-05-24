require('dotenv').config()

const Discord = require('discord.js')

const bot = new Discord.Client()

bot.on('message', msg => {
    if (msg.content.startsWith("!인증")) {
        const role = msg.guild.roles.cache.find(role => role.name == "개발자")
        if (!msg.member.roles.cache.find(r => r.name == '개발자')) {
            msg.reply('❌ 이런 존재하지않는 명령어또는 권한이없어요!')
            return
        }
        const user = msg.mentions.users.first()
        if (!user) return
        const createdAt = user.createdAt
        const now = new Date()
        const _diff = Math.abs(now - createdAt)
        const _diffDays = Math.ceil(_diff / (1000 * 60 * 60 * 24))
        if (_diffDays > 30) {
            const member = msg.mentions.members.first()
            const identified_role = msg.guild.roles.cache.find(r => r.name == '인증 회원')
            member.roles.add(identified_role)
            const not_identified_role = msg.guild.roles.cache.find(r => r.name == '비인증 회원')
            member.roles.remove(not_identified_role)
            msg.reply(`인증이 정상적으로 처리되었습니다.\n가입 날짜: ${user.createdAt}`)
        }
    }
})

process.on('uncaughtException', err => {
    console.error(err)
})

bot.login(process.env.TOKEN).then(r => console.log("login"))