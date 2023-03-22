const Discord = require('discord.js');

class helpHandler
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
                this.moneyCommandDescription = ":arrow_right: Recevoir 10 Pokédollars _(toutes les heures)_"
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
                this.moneyCommandDescription = ":arrow_right: Receive 10 Pokédollars _(every hour)_"
                this.languageCommandDescription = ":arrow_right: Change the language of the bot"
                this.languageListCommandDescription = ":arrow_right: View the list of supported languages"
                this.prefixCommandDescription = ":arrow_right: Change the bot's prefix"
                this.deleteMessageCommandDescription = ":arrow_right: Enable/disable the deletation of message"
                break
        }
    }

    drawAdminHelp()
    {
        this.embed.setTitle(this.adminCommandList)
        this.embed.setDescription(":gear: __**Voici la liste des commandes Administrateur:**__")
        this.embed.setColor("#E67E22")
        this.embed.setThumbnail("https://raw.githubusercontent.com/Matthieu-Solgaleo/solgaleo-bot-IMG/main/Image%20bonne%20.png")
        this.embed.setFooter("Powered By Solgaleo-TCG | Official BOT created since March 2022 by Matthieu-Solgaleo#3468")
        this.embed.fields = []
        this.embed.addFields(
            { name: ":diamond_shape_with_a_dot_inside: ``tcg language``", value: this.languageCommandDescription, inline: false },
            { name: ":diamond_shape_with_a_dot_inside: ``tcg language list``", value: this.languageListCommandDescription, inline: false},
            { name: ":diamond_shape_with_a_dot_inside: ``tcg prefix``", value: this.prefixCommandDescription, inline: false},
            { name: ":diamond_shape_with_a_dot_inside: ``tcg delete_message``", value: this.deleteMessageCommandDescription, inline: false},
        )
    }

    drawBasicHelp()
    {
        this.embed.setTitle(this.commandList)
        this.embed.setDescription(":gear: __**Voici la liste des commandes Utilisateur:**__")
        this.embed.setColor("#E67E22")
        this.embed.setThumbnail("https://raw.githubusercontent.com/Matthieu-Solgaleo/solgaleo-bot-IMG/main/Image%20bonne%20.png")
        this.embed.setFooter("Powered By Solgaleo-TCG | Official BOT created since March 2022 by Matthieu-Solgaleo#3468")
        this.embed.fields = []
        this.embed.addFields(
            { name: ":diamond_shape_with_a_dot_inside: ``tcg v || view``", value: this.viewCommandDescription, inline: false},
            { name: ":diamond_shape_with_a_dot_inside: ``tcg b || buy``", value: this.buyCommandDescription, inline: false},
            { name: ":diamond_shape_with_a_dot_inside: ``tcg m || money``", value: this.moneyCommandDescription, inline: false},
        )
    }

    createMessage()
    {
        this.drawBasicHelp()
        if (!this.isAdmin)
        {
            this.channel.send(this.embed)
        }
        else
        {
            this.channel.send(this.embed).then(msg =>
            {
                msg.react('⬅').then(r =>
                {
                    msg.react('➡').then(() =>
                    {
                        const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id === this.authorId
                        const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id === this.authorId

                        const backwards = msg.createReactionCollector(backwardsFilter)
                        const forwards = msg.createReactionCollector(forwardsFilter)

                        backwards.on('collect', (r, _) =>
                        {
                            if (this.isViewingAdminPage)
                            {
                                this.drawBasicHelp()
                                msg.edit(this.embed)
                                r.users.remove(r.users.cache.filter(u => u !== msg.author).first())
                                this.isViewingAdminPage = false
                            }
                        })

                        forwards.on('collect', (r, _) =>
                        {
                            if (!this.isViewingAdminPage)
                            {
                                this.drawAdminHelp()
                                msg.edit(this.embed)
                                r.users.remove(r.users.cache.filter(u => u !== msg.author).first())
                                this.isViewingAdminPage = true
                            }
                        })
                    })
                })
            })  
        }
    }

    view()
    {
        this.createMessage()
    }
}

module.exports = { helpHandler }