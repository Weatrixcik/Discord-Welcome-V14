const { Client, GatewayIntentBits, Events, ActivityType } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, NoSubscriberBehavior } = require('@discordjs/voice');
const settings = require('./settings.js');
const chalk = require('chalk');

settings.Tokens.forEach((botToken, botIndex) => {
    const discordClient = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildVoiceStates,
        ],
    });

    discordClient.once(Events.ClientReady, async (readyBot) => {
        console.log(chalk.cyan(`[Bot ${botIndex + 1}] ${readyBot.user.username} (ID: ${readyBot.user.id})`));

        setInterval(() => {
            const statusMessage = settings.Presence.Message[Math.floor(Math.random() * settings.Presence.Message.length)];
            readyBot.user.setActivity(statusMessage, { type: settings.Presence.Type || ActivityType.Playing });
            readyBot.user.setStatus(settings.Presence.Status || 'online');
        }, 10000);

        const voiceChannel = readyBot.channels.cache.get(settings.VoiceChannels[botIndex]);

        if (voiceChannel) {
            readyBot.voiceConnection = joinVoiceChannel({
                group: readyBot.user.id,
                channelId: voiceChannel.id,
                guildId: voiceChannel.guild.id,
                adapterCreator: voiceChannel.guild.voiceAdapterCreator,
            });
        }
    });

    discordClient.on(Events.VoiceStateUpdate, async (previousState, currentState) => {
        function isAdmin(user) {
            return settings.Roles.Admin.some((roleId) => user.roles.cache.has(roleId)) ? true : false;
        }

        function isVoiceChannel(channel) {
            return settings.VoiceChannels.some((channelId) => channel.id == channelId) ? true : false;
        }

        function hasMembers(channel) {
            if (currentState.channel) {
                if (isAdmin(currentState.member)) return false;
                return channel.members.filter((member) => !member.user.bot).size > 1;
            }
        }

        async function playSound(type) {
            const audioPlayer = createAudioPlayer({
                behaviors: { noSubscriber: NoSubscriberBehavior.Play },
                inlineVolume: true,
            });

            const audioSource = createAudioResource(type === 'Unregistered' ? settings.AudioFiles.Unregistered : settings.AudioFiles.Admin);
            audioPlayer.play(audioSource);
            return discordClient.voiceConnection.subscribe(audioPlayer);
        }

        if (
            currentState.channel &&
            !currentState.member.user.bot &&
            previousState.channelId != currentState.channelId &&
            isVoiceChannel(currentState.channel) &&
            !hasMembers(currentState.channel)
        ) {
            if (!isAdmin(currentState.member)) {
                await playSound('Unregistered');
            } else {
                await playSound('Admin');
            }
        }
    });

    discordClient.login(botToken);
});