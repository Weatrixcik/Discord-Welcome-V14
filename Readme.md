# Sesli Hoş Geldin Botu

Bu proje, Discord sunucularında yeni katılan üyeleri sesli bir şekilde karşılamak için tasarlanmış bir Discord botunu içerir. Bot, belirli ses dosyalarını çalarak kullanıcılara hoş geldin mesajı verir.

## Özellikler

- **Sesli Hoş Geldin:** Yeni bir üye sesli olarak karşılanır.
- **Rol Tabanlı Mesajlar:** Kullanıcılar belirli rollerine göre farklı sesli mesajlar alır.
- **Özelleştirilebilir Ayarlar:** Botun davranışları ve ses dosyaları konfigürasyon dosyasından yönetilir.
- **Çoklu Bot Desteği:** Birden fazla bot token'ı kullanarak aynı anda birden fazla sesli kanalda çalışabilir.

## Gereksinimler

- **Node.js**: Bu projeyi çalıştırmak için Node.js'in en son sürümüne ihtiyacınız var. [Node.js İndirme](https://nodejs.org/)
- **FFmpeg**: Ses dosyalarını işlemek için FFmpeg gereklidir. FFmpeg'in sisteminize kurulu olduğundan emin olun. [FFmpeg İndirme](https://ffmpeg.org/download.html)

## Kurulum

1. **Gerekli Paketleri Yükleyin:**

    Bu projede kullanılan bağımlılıkları yüklemek için aşağıdaki komutu çalıştırın:

    ```bash
    npm install discord.js @discordjs/voice chalk ffmpeg-static libsodium-wrappers axios
    ```

2. **Konfigürasyon Dosyasını Oluşturun:**

    `settings.js` dosyanızı oluşturun ve aşağıdaki şablonu kullanarak botunuzu yapılandırın:

    ```javascript
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
    ```

    Konfigürasyon dosyasında aşağıdaki alanları doldurmanız gerekmektedir:
    
    - `Tokens`: Botunuzun token'larını buraya ekleyin.
    - `Presence`: Botunuzun çevrimiçi durumunu ve etkinlik mesajlarını buradan ayarlayın.
    - `VoiceChannels`: Sesli kanalların ID'lerini buraya ekleyin.
    - `Roles`: Yönetici rolleri için rol ID'lerini buraya ekleyin.
    - `AudioFiles`: Ses dosyalarının yollarını buraya ekleyin.

3. **Ses Dosyalarını Yükleyin:**

    Ses dosyalarınızı `Voices` adlı bir klasöre koyun. Ses dosyalarının adları ve yolları konfigürasyon dosyasındaki ile uyumlu olmalıdır.

4. **Botu Başlatın:**

    Botu başlatmak için aşağıdaki komutu çalıştırın:

    ```bash
    node Start.js
    ```

## Kullanım

Bot, bir sesli kanalda yeni bir üye belirdiğinde otomatik olarak o kanalda sesli hoş geldin mesajı çalar. Sesli mesajlar, üyenin rolüne bağlı olarak değişir.

- **Kayıtsız Üyeler:** Kayıtsız (Unregistered) rolüne sahip üyeler için özel ses dosyası çalar.
- **Yönetici Üyeler:** Yönetici (Admin) rolüne sahip üyeler için farklı bir ses dosyası çalar.

## Katkıda Bulunanlar

- [Weatrix](https://github.com/Weatrixcik) - Proje Yöneticisi ve Geliştirici

## Destek

Bu proje ile ilgili herhangi bir sorun yaşarsanız, lütfen [GitHub Issues](https://github.com/Weatrixcik/Discord-Welcome-V14/issues) sayfasını ziyaret edin.

## Lisans

Bu proje GNU V3 ( General Public License ) Lisansı altında lisanslanmıştır. Daha fazla bilgi için [LICENSE](LICENSE) dosyasına bakabilirsiniz.
