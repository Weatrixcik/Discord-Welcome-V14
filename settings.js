module.exports = {
  Tokens: [
      'YOUR_BOT_TOKEN_1',
      'YOUR_BOT_TOKEN_2'
  ],
  Presence: {
      Status: 'dnd', // Botun çevrimiçi durumu
      Type: ActivityType.Playing, // Etkinlik türü (Playing, Watching, Listening, Streaming)
      Message: [
          'Créated by Weatrix',
          'Weatrix Was here ❤️',
          'Weatrix ❤️ Discord'
      ]
  },
  VoiceChannels: [
      'VOICE_CHANNEL_ID_1',
      'VOICE_CHANNEL_ID_2'
  ],
  Roles: {
      Admin: [
          'ADMIN_ROLE_ID'
      ],
      Unregistered: [
          'UNREGISTER_ROLE_ID'
      ],
  },
  AudioFiles: {
      Admin: path.join(__dirname, 'Voices', 'Admin-Welcome.mp3'),
      Unregistered: path.join(__dirname, 'Voices', 'Unregistered-Welcome.mp3'),
  }
};