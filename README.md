# 🌍 DÜNYAMIZ — 3D Gezegen, Kıtalar, Ülkeler ve Şehirler

Dünyayı 3D olarak keşfetmeni sağlayan interaktif bir Android uygulamasıdır. Kıtalar, ülkeler ve şehirler hakkında bilgi sunar; harita tabanlı keşif deneyimi yaşatır.

## ✨ Özellikler

- 🌐 İnteraktif 3D Dünya görünümü
- 🗺️ Kıta → Ülke → Şehir hiyerarşik gezinti
- 📊 Ülkeler ve şehirler hakkında bilgi kartları
- 🔍 Arama fonksiyonu
- 📱 Android (Capacitor wrapper)

## 🛠️ Teknolojiler

| Katman | Teknoloji |
|--------|-----------|
| Frontend | HTML5, CSS3, JavaScript (Vanilla) |
| 3D Render | WebGL / Canvas API |
| Mobil Wrapper | Capacitor 6.x |
| Platform | Android APK |

## 📋 Gereksinimler

- Node.js 18+
- Android Studio (Android derleme için)
- Java 17+
- Android SDK 21+

## 🚀 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Android projesini senkronize et
npx cap sync android

# Android Studio'da aç
npx cap open android
```

### APK Derleme
```powershell
.\apk_yap.ps1
# veya
.\apk_yap.bat
```

## 📁 Proje Yapısı

```
├── www/              # Web uygulaması (HTML/JS/CSS)
├── android/          # Android native proje
├── package.json      # Node bağımlılıkları
└── capacitor.config.json
```

## 👨‍💻 Geliştirici

**Nihat Yazgan** — Yazgan Bilişim  
GitHub: [@nihatyazgan1962](https://github.com/nihatyazgan1962)
