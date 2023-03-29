const Discord = require('discord.js');


class shopHandler
{
    embed = new Discord.MessageEmbed()
    channel
    authorId
    isAdmin
    commandList
    basicDescription
    isViewingAdminPage = false
    viewCommandDescription
    buyCommandDescription
    moneyCommandDescription
    languageCommandDescription
    languageListCommandDescription
    prefixCommandDescription
    deleteMessageCommandDescription

    constructor (member, channel, language)
    {
        this.channel = channel
        this.authorId = member.user.id
        this.isAdmin = member.hasPermission("ADMINISTRATOR")
        switch (language)
        {
            case "français":
                this.commandList = "Liste des commandes:"
                this.adminCommandList = "Liste des commandes administrateur:"
                this.viewCommandDescription = ":arrow_right: Voir votre collection de carte"
                this.buyCommandDescription = ":arrow_right: Acheter des boosters"
                this.moneyCommandDescription = ":arrow_right: Recevoir 10 <:pkgold:1090031647757447178> _(toutes les heures)_"
                this.languageCommandDescription = ":arrow_right: Changer la langue du bot"
                this.languageListCommandDescription = ":arrow_right: Voir la liste des langues supportées"
                this.prefixCommandDescription = ":arrow_right: Changer le prefix du bot"
                this.deleteMessageCommandDescription = ":arrow_right: Désactiver/activer la suppression de message"
                break
            case "english":
            default:
                this.commandList = "Commands list:"
                this.adminCommandList = "Administrator commands list:"
                this.viewCommandDescription = ":arrow_right: View your card's collection"
                this.buyCommandDescription = ":arrow_right: Buy new boosters"
                this.moneyCommandDescription = ":arrow_right: Receive 10 <:pkgold:1090031647757447178> _(every hour)_"
                this.languageCommandDescription = ":arrow_right: Change the language of the bot"
                this.languageListCommandDescription = ":arrow_right: View the list of supported languages"
                this.prefixCommandDescription = ":arrow_right: Change the bot's prefix"
                this.deleteMessageCommandDescription = ":arrow_right: Enable/disable the deletation of message"
                break
        }
    }

    

    drawBasictest()
    {
        this.embed.setTitle(this.commandList)
        this.embed.setDescription("<:601:835133502839848970> __**Voici la liste des commandes Utilisateur:**__")
        this.embed.setColor("#E67E22")
        this.embed.setThumbnail("https://raw.githubusercontent.com/Matthieu-Solgaleo/solgaleo-bot-IMG/main/Solgaleo-TCG.png")
        this.embed.setFooter("Powered By Solgaleo-TCG | Official BOT created since March 2022 by Matthieu-Solgaleo#3468")
        this.embed.setImage("https://raw.githubusercontent.com/Matthieu-Solgaleo/solgaleo-bot-IMG/main/Ev%C3%A9nement.png")
        this.embed.fields = []
        this.embed.addFields(
            { name: "<:599:835133500545826826> ``tcg v`` || ``view``", value: this.viewCommandDescription, inline: false},
            { name: "<:599:835133500545826826> ``tcg b`` || ``buy``", value: this.buyCommandDescription, inline: false},
            { name: "<:599:835133500545826826> ``tcg m`` || ``money``", value: this.moneyCommandDescription, inline: false},
        
        )
        

    }

    createMessage()
    {
        this.drawBasictest()
        if (!this.isAdmin)
        {
            this.channel.send(this.embed)
        }
        else
        {
            this.channel.send(this.embed).then(msg =>
            {
                
            })  
        }
    }

    view()
    {
        this.createMessage()
    }
}

module.exports = { shopHandler }