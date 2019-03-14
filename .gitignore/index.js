const Discord = require('discord.js')
const client = new Discord.Client()
const prefix = '!'
 
var randomstring = require("randomstring");

client.on('message', msg => {

    let args = msg.content.slice(prefix.length).trim().split(' ');

    if(msg.content.startsWith(`${prefix}help`)) {

        let embed = new Discord.RichEmbed()
            .setColor('#0090FE')
            .setThumbnail('https://s2.qwant.com/thumbr/0x0/c/5/f72caa288d38871acbf4294908893484a5dfbac634ade17249a0a7424fc01a/nitro_cut_dribbble.gif?u=https%3A%2F%2Fcdn.dribbble.com%2Fusers%2F1029769%2Fscreenshots%2F3238009%2Fnitro_cut_dribbble.gif&q=0&b=1&p=0&a=1')
            .setTitle(`⛏ Commandes du BOT :`)
            .setDescription(`**!help :** Affiche les commandes du bot.\n**!setgame :** Change le jeux du bot.\n**!setup :** Crée les salons nécessaire au bot.\n**!start :** Commence à chercher des codes Nitro.`)
            .addBlankField()
            .setFooter(`${client.user.username} by 𝐙𝐄𝐓𝐇𝐔𝐆/𝐍𝐂#5164`)
            .setTimestamp(new Date())
        msg.channel.send(embed)

    }

    if(msg.content.startsWith(`${prefix}setgame`)) {

        if(msg.author.id !== '550961588962852864') return msg.channel.send("Vous n'avez pas la permission d'utiliser cette commande.")

        let status = args.join(' ').slice(8)

        client.user.setActivity(status, {type: 'PLAYING'});

        let embed= new Discord.RichEmbed()

            .setColor("#0090FE")
            .setTitle(`⛏ Jeux changé :`)
            .setDescription(`**Le jeux du bot a été changé en :** \`${status}\``)
            .setFooter(`Changé par ${msg.author.username}`)
            .setTimestamp(new Date())

        msg.channel.send(embed);

    }

    if(msg.content.startsWith(`${prefix}setup`)) {

        if(msg.author.id !== '550961588962852864') return msg.channel.send("Vous n'avez pas la permission d'utiliser cette commande.")

        if(!msg.guild.member(client.user).hasPermission(["MANAGE_CHANNELS","ADMINISTRATOR"])) return;
        msg.guild.createChannel(`nitro-mining`, 'text').catch(e => {});

    }

    if(msg.content.startsWith(`${prefix}start`)) {

        if(msg.author.id !== '550961588962852864') return msg.channel.send("Vous n'avez pas la permission d'utiliser cette commande.")

        msg.delete()

        var interval = setInterval (function () {

            client.channels.findAll('name', 'nitro-mining').map(channel => channel.send("https://discord.gift/" + randomstring.generate(16)));

        }, 2000);

    }

});

client.on('ready', async () => {
    console.log('Prêt à miner !')

    let statuses = [
        `${client.users.size} Utilisateurs 👀`,
        `Mine des codes nitro 🔨`
    ]

    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        client.user.setGame(status, 'https://twitch.tv/discord')
    }, 4000)
})

client.login(process.env.TOKEN)
