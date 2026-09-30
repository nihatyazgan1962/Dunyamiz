// DÜNYAMIZ - Kapsamlı Coğrafya Veri Tabanı
// Kıtalar -> Ülkeler (Dil ve Din Bilgileri) -> Çok Sayıda Şehir ve Başkentler

const WORLD_DATA = {
  stats: {
    continentsCount: 7,
    countriesCount: 195,
    worldPopulation: "8.1 Milyar",
    surfaceArea: "510.1 Milyon km²",
    waterPercentage: "%71",
    landPercentage: "%29"
  },
  continents: [
    {
      id: "europe",
      name: "Avrupa",
      englishName: "Europe",
      icon: "🏛️",
      color: "#3b82f6",
      coords: { lat: 50.0, lng: 15.0 },
      cameraDist: 2.2,
      population: "746 Milyon",
      area: "10.18 Milyon km²",
      countriesCount: 44,
      highestPoint: "Elbruz Dağı (5,642 m)",
      longestRiver: "Volga Nehri (3,530 km)",
      description: "Tarih, sanat, kültür ve sanayi devriminin beşiği olan Avrupa, yüzlerce yıllık mimari mirasıyla öne çıkar.",
      funFact: "Avrupa'da sınır kontrolleri olmadan 27 ülke arasında Schengen vizesi ile serbestçe seyahat edilebilir.",
      countries: [
        {
          id: "turkey",
          name: "Türkiye",
          nativeName: "Türkiye Cumhuriyeti",
          flag: "🇹🇷",
          capital: "Ankara",
          coords: { lat: 39.9334, lng: 32.8597 },
          population: "85.3 Milyon",
          area: "783,562 km²",
          currency: "Türk Lirası (₺ - TRY)",
          language: "Türkçe",
          religion: "İslam (%99)",
          callingCode: "+90",
          gdp: "$1.1 Trilyon",
          badge: "İki Kıtayı Birleştiren Köprü",
          summary: "Asya ve Avrupa kıtalarını birbirine bağlayan, binlerce yıllık zengin tarihi ve doğal güzellikleriyle kavşak noktası.",
          cities: [
            {
              id: "ankara",
              name: "Ankara",
              isCapital: true,
              population: "5.8 Milyon",
              elevation: "938 m",
              founded: "Antik Frigya dönemi",
              coords: { lat: 39.9334, lng: 32.8597 },
              highlights: ["Anıtkabir", "Ankara Kalesi", "Anadolu Medeniyetleri Müzesi", "Atakule", "Hacı Bayram Camii"],
              description: "Türkiye Cumhuriyeti'nin başkenti ve idari kalbi. Mustafa Kemal Atatürk'ün ebedi istirahatgahı Anıtkabir'e ev sahipliği yapar."
            },
            {
              id: "istanbul",
              name: "İstanbul",
              isCapital: false,
              population: "15.9 Milyon",
              elevation: "40 m",
              founded: "M.Ö. 657 (Bizantion)",
              coords: { lat: 41.0082, lng: 28.9784 },
              highlights: ["Ayasofya", "Topkapı Sarayı", "Boğaziçi Köprüsü", "Kapalıçarşı", "Galata Kulesi"],
              description: "Tarihte Roma, Bizans ve Osmanlı imparatorluklarına başkentlik yapmış, Boğaz'ın iki yakasında Asya ve Avrupa'yı kucaklayan dünya metropolü."
            },
            {
              id: "izmir",
              name: "İzmir",
              isCapital: false,
              population: "4.4 Milyon",
              elevation: "2 m",
              founded: "M.Ö. 3000 (Smyrna)",
              coords: { lat: 38.4237, lng: 27.1428 },
              highlights: ["Saat Kulesi", "Efes Antik Kenti", "Tarihi Kemeraltı", "Kordon Boyu"],
              description: "Ege'nin incisi; modern yaşam tarzı, palmiyeleri ve antik miraslarıyla Türkiye'nin 3. büyük şehridir."
            },
            {
              id: "antalya",
              name: "Antalya",
              isCapital: false,
              population: "2.7 Milyon",
              elevation: "30 m",
              founded: "M.Ö. 150 (Attaleia)",
              coords: { lat: 36.8969, lng: 30.7133 },
              highlights: ["Kaleiçi", "Düden Şelalesi", "Aspendos Tiyatrosu", "Konyaaltı Plajı"],
              description: "Akdeniz'in turizm başkenti; turkuaz denizi ve antik Likya/Pamfilya kalıntılarıyla tanınır."
            },
            {
              id: "bursa",
              name: "Bursa",
              isCapital: false,
              population: "3.1 Milyon",
              elevation: "100 m",
              founded: "M.Ö. 202 (Prusa)",
              coords: { lat: 40.1885, lng: 29.0610 },
              highlights: ["Ulu Camii", "Uludağ Kaynakları & Kayak", "Yeşil Türbe", "Tarihi Koza Han"],
              description: "Osmanlı İmparatorluğu'nun ilk başkenti; yeşil doğası, kestane şekeri ve Uludağ kayak merkeziyle ünlü sanayi kenti."
            },
            {
              id: "konya",
              name: "Konya",
              isCapital: false,
              population: "2.3 Milyon",
              elevation: "1,027 m",
              founded: "Antik Iconium",
              coords: { lat: 37.8746, lng: 32.4932 },
              highlights: ["Mevlana Müzesi & Türbesi", "Alaeddin Tepesi", "Sille Köyü", "Tropikal Kelebek Bahçesi"],
              description: "Anadolu Selçuklu Devleti'nin başkenti; Hz. Mevlana'nın hoşgörü felsefesi ve semazen kültürüyle ruhani merkez."
            },
            {
              id: "trabzon",
              name: "Trabzon",
              isCapital: false,
              population: "820 Bin",
              elevation: "30 m",
              founded: "M.Ö. 756 (Trapezus)",
              coords: { lat: 41.0027, lng: 39.7168 },
              highlights: ["Sümela Manastırı", "Uzungöl", "Atatürk Köşkü", "Boztepe"],
              description: "Karadeniz'in dik yamaçlı yeşil cenneti; tarihi Sümela Manastırı, Uzungöl ve hamsi kültürüyle meşhur."
            }
          ]
        },
        {
          id: "germany",
          name: "Almanya",
          nativeName: "Bundesrepublik Deutschland",
          flag: "🇩🇪",
          capital: "Berlin",
          coords: { lat: 52.5200, lng: 13.4050 },
          population: "84.4 Milyon",
          area: "357,022 km²",
          currency: "Euro (€ - EUR)",
          language: "Almanca",
          religion: "Hristiyanlık (%53 - Katolik & Protestan)",
          callingCode: "+49",
          gdp: "$4.4 Trilyon",
          badge: "Avrupa'nın Ekonomik Lokomotifi",
          summary: "Avrupa Birliği'nin en kalabalık ülkesi ve mühendislik ile sanayi devi.",
          cities: [
            {
              id: "berlin",
              name: "Berlin",
              isCapital: true,
              population: "3.7 Milyon",
              elevation: "34 m",
              founded: "1237",
              coords: { lat: 52.5200, lng: 13.4050 },
              highlights: ["Brandenburg Kapısı", "Reichstag", "Berlin Duvarı", "Müze Adası"],
              description: "Tarihin dönüm noktalarına tanıklık etmiş, sanat galerileri ve çok kültürlü yapısıyla canlı bir başkent."
            },
            {
              id: "munich",
              name: "Münih",
              isCapital: false,
              population: "1.5 Milyon",
              elevation: "519 m",
              founded: "1158",
              coords: { lat: 48.1351, lng: 11.5820 },
              highlights: ["Marienplatz", "Neuschwanstein Şatosu Yakını", "BMW Welt"],
              description: "Bavyera eyaletinin başkenti. Yüksek teknolojisi ve Alpler manzarası ile bilinir."
            },
            {
              id: "hamburg",
              name: "Hamburg",
              isCapital: false,
              population: "1.9 Milyon",
              elevation: "6 m",
              founded: "810",
              coords: { lat: 53.5511, lng: 9.9937 },
              highlights: ["Elbphilharmonie", "Speicherstadt Antrepoları", "Hamburg Limanı"],
              description: "Avrupa'nın en büyük liman kentlerinden biri; Venedik'ten daha fazla köprüye sahiptir."
            },
            {
              id: "frankfurt",
              name: "Frankfurt",
              isCapital: false,
              population: "760 Bin",
              elevation: "112 m",
              founded: "794",
              coords: { lat: 50.1109, lng: 8.6821 },
              highlights: ["Avrupa Merkez Bankası Kulesi", "Römerberg Meydanı", "Goethe Evi"],
              description: "Avrupa'nın finans ve borsa başkenti; gökdelenlerle dolu siluetiyle 'Mainhattan' olarak anılır."
            },
            {
              id: "cologne",
              name: "Köln",
              isCapital: false,
              population: "1.1 Milyon",
              elevation: "53 m",
              founded: "M.Ö. 38",
              coords: { lat: 50.9375, lng: 6.9603 },
              highlights: ["Köln Katedrali (Kölner Dom)", "Hohenzollern Aşk Köprüsü", "Ren Nehri Kordonu"],
              description: "Gotik Katedrali, kolonyanın doğduğu yer olması ve neşeli karnavalları ile ünlü tarihi kent."
            }
          ]
        },
        {
          id: "france",
          name: "Fransa",
          nativeName: "République française",
          flag: "🇫🇷",
          capital: "Paris",
          coords: { lat: 48.8566, lng: 2.3522 },
          population: "68.0 Milyon",
          area: "551,695 km²",
          currency: "Euro (€ - EUR)",
          language: "Fransızca",
          religion: "Hristiyanlık (%50 Katolik, %33 Seküler)",
          callingCode: "+33",
          gdp: "$3.0 Trilyon",
          badge: "Işıklar ve Sanat Ülkesi",
          summary: "Gastronomi, moda, şarap kültürü ve felsefenin merkezi.",
          cities: [
            {
              id: "paris",
              name: "Paris",
              isCapital: true,
              population: "2.1 Milyon (Metropol 12M)",
              elevation: "35 m",
              founded: "M.Ö. 259",
              coords: { lat: 48.8566, lng: 2.3522 },
              highlights: ["Eyfel Kulesi", "Louvre Müzesi", "Notre Dame Katedrali", "Zafer Takı"],
              description: "Işık Şehir olarak bilinen Paris; Seine Nehri boyunca sıralanan mimari şaheserleri ve moda merkezidir."
            },
            {
              id: "marseille",
              name: "Marsilya",
              isCapital: false,
              population: "870 Bin",
              elevation: "12 m",
              founded: "M.Ö. 600",
              coords: { lat: 43.2965, lng: 5.3698 },
              highlights: ["Vieux-Port (Eski Liman)", "Notre-Dame de la Garde", "Calanques Parkı"],
              description: "Fransa'nın en eski şehri ve Akdeniz'deki en büyük limanı."
            },
            {
              id: "lyon",
              name: "Lyon",
              isCapital: false,
              population: "522 Bin",
              elevation: "173 m",
              founded: "M.Ö. 43",
              coords: { lat: 45.7640, lng: 4.8357 },
              highlights: ["Vieux Lyon", "Fourvière Bazilikası", "Traboules"],
              description: "Fransız gastronomisinin başkenti. UNESCO Dünya Mirası listesindedir."
            },
            {
              id: "nice",
              name: "Nis (Nice)",
              isCapital: false,
              population: "340 Bin",
              elevation: "0 m",
              founded: "M.Ö. 350",
              coords: { lat: 43.7102, lng: 7.2620 },
              highlights: ["Promenade des Anglais", "Eski Şehir (Vieux Nice)", "Castle Hill"],
              description: "Fransız Rivierası'nın (Cote d'Azur) en büyüleyici tatil kenti."
            }
          ]
        },
        {
          id: "italy",
          name: "İtalya",
          nativeName: "Repubblica Italiana",
          flag: "🇮🇹",
          capital: "Roma",
          coords: { lat: 41.9028, lng: 12.4964 },
          population: "58.8 Milyon",
          area: "301,340 km²",
          currency: "Euro (€ - EUR)",
          language: "İtalyanca",
          religion: "Hristiyanlık (%80 Katolik)",
          callingCode: "+39",
          gdp: "$2.2 Trilyon",
          badge: "Rönesans ve Antik Roma Mirası",
          summary: "Çizme şeklindeki yarımada; Roma İmparatorluğu mirası ve Rönesans sanatı ile eşsizdir.",
          cities: [
            {
              id: "rome",
              name: "Roma",
              isCapital: true,
              population: "2.8 Milyon",
              elevation: "21 m",
              founded: "M.Ö. 753",
              coords: { lat: 41.9028, lng: 12.4964 },
              highlights: ["Kolezyum", "Vatikan & San Pietro", "Trevi Çeşmesi", "Panteon"],
              description: "'Ebedi Şehir' unvanına sahip Roma, her köşe başında antik eserlerin yükseldiği açık hava müzesidir."
            },
            {
              id: "florence",
              name: "Floransa",
              isCapital: false,
              population: "360 Bin",
              elevation: "50 m",
              founded: "M.Ö. 59",
              coords: { lat: 43.7696, lng: 11.2558 },
              highlights: ["Duomo Katedrali", "Uffizi Galerisi", "Ponte Vecchio"],
              description: "Rönesans'ın doğduğu şehir. Leonardo da Vinci ve Michelangelo'nun sanatsal beşiği."
            },
            {
              id: "venice",
              name: "Venedik",
              isCapital: false,
              population: "260 Bin",
              elevation: "1 m",
              founded: "421",
              coords: { lat: 45.4408, lng: 12.3155 },
              highlights: ["San Marco Meydanı", "Büyük Kanal", "Rialto Köprüsü"],
              description: "118 adacık üzerine kurulu, gondolların süzüldüğü masalsı kanallar şehri."
            },
            {
              id: "milan",
              name: "Milano",
              isCapital: false,
              population: "1.4 Milyon",
              elevation: "120 m",
              founded: "M.Ö. 600",
              coords: { lat: 45.4642, lng: 9.1900 },
              highlights: ["Duomo di Milano", "Galleria Vittorio Emanuele II", "La Scala Operası"],
              description: "Dünya modasının, tasarımın ve İtalyan finansının başkenti."
            },
            {
              id: "naples",
              name: "Napoli",
              isCapital: false,
              population: "960 Bin",
              elevation: "17 m",
              founded: "M.Ö. 8. Yüzyıl",
              coords: { lat: 40.8518, lng: 14.2681 },
              highlights: ["Vezüv Yanardağı & Pompeii Antik Kenti", "Castel Nuovo", "Tarihi Napoliten Pizzacılar"],
              description: "Pizzanın doğduğu yer; Vezüv Yanardağı gölgesinde tarihi ve lezzetli bir sahil kenti."
            }
          ]
        },
        {
          id: "uk",
          name: "Birleşik Krallık",
          nativeName: "United Kingdom",
          flag: "🇬🇧",
          capital: "Londra",
          coords: { lat: 51.5074, lng: -0.1278 },
          population: "67.7 Milyon",
          area: "242,495 km²",
          currency: "İngiliz Sterlini (£ - GBP)",
          language: "İngilizce",
          religion: "Hristiyanlık (%46 Hristiyan, %37 Seküler)",
          callingCode: "+44",
          gdp: "$3.3 Trilyon",
          badge: "Küresel Finans ve Kraliyet Kültürü",
          summary: "İngiltere, İskoçya, Galler ve Kuzey İrlanda'dan oluşan ada ülkesi.",
          cities: [
            {
              id: "london",
              name: "Londra",
              isCapital: true,
              population: "8.9 Milyon",
              elevation: "11 m",
              founded: "M.S. 43",
              coords: { lat: 51.5074, lng: -0.1278 },
              highlights: ["Big Ben", "Tower Bridge", "Buckingham Sarayı", "British Museum"],
              description: "Thames Nehri kıyısında yükselen, 300'den fazla dilin konuşulduğu finans ve kültür başkenti."
            },
            {
              id: "edinburgh",
              name: "Edinburgh",
              isCapital: false,
              population: "500 Bin",
              elevation: "41 m",
              founded: "7. Yüzyıl",
              coords: { lat: 55.9533, lng: -3.1883 },
              highlights: ["Edinburgh Kalesi", "Royal Mile", "Arthur's Seat"],
              description: "İskoçya'nın tarihi başkenti; volkanik kayalıklar üzerindeki kalesiyle tanınır."
            },
            {
              id: "manchester",
              name: "Manchester",
              isCapital: false,
              population: "550 Bin",
              elevation: "38 m",
              founded: "79 (Mamucium)",
              coords: { lat: 53.4808, lng: -2.2426 },
              highlights: ["Old Trafford Stadyumu", "Bilim ve Sanayi Müzesi", "Manchester Kütüphanesi"],
              description: "Sanayi devriminin doğduğu şehir; futbol kulüpleri ve müzik kültürüyle dünyaca ünlüdür."
            }
          ]
        }
      ]
    },
    {
      id: "asia",
      name: "Asya",
      englishName: "Asia",
      icon: "⛩️",
      color: "#f59e0b",
      coords: { lat: 34.0, lng: 100.0 },
      cameraDist: 2.3,
      population: "4.75 Milyar",
      area: "44.58 Milyon km²",
      countriesCount: 48,
      highestPoint: "Everest Tepesi (8,848 m)",
      longestRiver: "Yangtze Nehri (6,300 km)",
      description: "Dünyanın en büyük ve en kalabalık kıtası. İpek Yolu ve antik medeniyetlerin merkezidir.",
      funFact: "Dünya nüfusunun yaklaşık %60'ı Asya kıtasında yaşamaktadır.",
      countries: [
        {
          id: "japan",
          name: "Japonya",
          nativeName: "Nihon / Nippon (日本)",
          flag: "🇯🇵",
          capital: "Tokyo",
          coords: { lat: 35.6762, lng: 139.6503 },
          population: "124.5 Milyon",
          area: "377,975 km²",
          currency: "Japon Yeni (¥ - JPY)",
          language: "Japonca",
          religion: "Şintoizm & Budizm (%84)",
          callingCode: "+81",
          gdp: "$4.2 Trilyon",
          badge: "Doğan Güneşin ve Teknolojinin Ülkesi",
          summary: "Gelenek ve teknolojinin mükemmel uyumunu sunan ada ülkesi.",
          cities: [
            {
              id: "tokyo",
              name: "Tokyo",
              isCapital: true,
              population: "14.0 Milyon (Metropol 37M)",
              elevation: "40 m",
              founded: "1457",
              coords: { lat: 35.6762, lng: 139.6503 },
              highlights: ["Şibuya Kavşağı", "Senso-ji Tapınağı", "Tokyo Skytree", "Akihabara"],
              description: "Dünyanın en kalabalık metropol alanı; neon ışıklı caddeleri ile meşhur."
            },
            {
              id: "kyoto",
              name: "Kyoto",
              isCapital: false,
              population: "1.4 Milyon",
              elevation: "55 m",
              founded: "794",
              coords: { lat: 35.0116, lng: 135.7681 },
              highlights: ["Fushimi Inari Taisha", "Kinkaku-ji Altın Köşk", "Arashiyama Bambu Ormanı"],
              description: "Japonya'nın bin yıllık eski başkenti; binlerce tapınağıyla geleneksel kültür merkezidir."
            },
            {
              id: "osaka",
              name: "Osaka",
              isCapital: false,
              population: "2.7 Milyon",
              elevation: "10 m",
              founded: "Antik Naniwa",
              coords: { lat: 34.6937, lng: 135.5023 },
              highlights: ["Osaka Kalesi", "Dotonbori Neon Caddesi", "Umeda Sky Building"],
              description: "'Ulusun Mutfağı' olarak anılan sokak lezzetleri şehri."
            },
            {
              id: "hiroshima",
              name: "Hiroşima",
              isCapital: false,
              population: "1.2 Milyon",
              elevation: "5 m",
              founded: "1589",
              coords: { lat: 34.3853, lng: 132.4553 },
              highlights: ["Hiroşima Barış Anıtı Parkı (Atom Bombası Kubbesi)", "Itsukushima Yüzen Torii Kapısı"],
              description: "Tarihin küllerinden doğan, barışın ve umudun dünya sembolü kenti."
            }
          ]
        },
        {
          id: "south-korea",
          name: "Güney Kore",
          nativeName: "Daehan Minguk (대한민국)",
          flag: "🇰🇷",
          capital: "Seul",
          coords: { lat: 37.5665, lng: 126.9780 },
          population: "51.7 Milyon",
          area: "100,210 km²",
          currency: "Güney Kore Wonu (₩ - KRW)",
          language: "Korece",
          religion: "Hristiyanlık & Budizm (%50 Seküler)",
          callingCode: "+82",
          gdp: "$1.7 Trilyon",
          badge: "K-Pop ve Dijital Gelecek",
          summary: "Hallyu dalgası, ileri teknoloji devleri ve leziz mutfağıyla küresel bir güç.",
          cities: [
            {
              id: "seoul",
              name: "Seul",
              isCapital: true,
              population: "9.5 Milyon",
              elevation: "38 m",
              founded: "M.Ö. 18",
              coords: { lat: 37.5665, lng: 126.9780 },
              highlights: ["Gyeongbokgung Sarayı", "N Seul Kulesi", "Myeongdong", "Lotte World Tower"],
              description: "Han Nehri etrafında kurulu, asırlık saraylar ile fütüristik gökdelenler şehri."
            },
            {
              id: "busan",
              name: "Busan",
              isCapital: false,
              population: "3.4 Milyon",
              elevation: "15 m",
              founded: "Antik Dönem",
              coords: { lat: 35.1796, lng: 129.0756 },
              highlights: ["Haeundae Plajı", "Gamcheon Kültür Köyü", "Jagalchi Balık Pazarı"],
              description: "Kore'nin en büyük limanı ve sahil cenneti; dağ yamacı rengarenk köyleriyle ünlüdür."
            }
          ]
        },
        {
          id: "china",
          name: "Çin",
          nativeName: "Zhonghua Renmin Gongheguo (中华人民共和国)",
          flag: "🇨🇳",
          capital: "Pekin",
          coords: { lat: 39.9042, lng: 116.4074 },
          population: "1.41 Milyar",
          area: "9,596,961 km²",
          currency: "Çin Yuanı (¥ - CNY)",
          language: "Mandarin Çincesi",
          religion: "Budizm, Taoizm & Konfüçyüsçülük",
          callingCode: "+86",
          gdp: "$18.5 Trilyon",
          badge: "5000 Yıllık Medeniyet Devrimi",
          summary: "Dünyanın en eski kesintisiz uygarlıklarından biri.",
          cities: [
            {
              id: "beijing",
              name: "Pekin",
              isCapital: true,
              population: "21.5 Milyon",
              elevation: "43 m",
              founded: "M.Ö. 1045",
              coords: { lat: 39.9042, lng: 116.4074 },
              highlights: ["Yasak Şehir", "Çin Seddi", "Yazlık Saray", "Cennet Tapınağı"],
              description: "Ming ve Qing hanedanlarının imparatorluk saraylarına ev sahipliği yapan başkent."
            },
            {
              id: "shanghai",
              name: "Şanghay",
              isCapital: false,
              population: "26.3 Milyon",
              elevation: "4 m",
              founded: "1292",
              coords: { lat: 31.2304, lng: 121.4737 },
              highlights: ["The Bund Kordonu", "Şanghay Kulesi (632 m)", "Doğu'nun İncisi Kulesi"],
              description: "Dünyanın en yoğun limanı ve Çin'in küresel finans başkenti."
            },
            {
              id: "guangzhou",
              name: "Guangzhou (Kanton)",
              isCapital: false,
              population: "18.7 Milyon",
              elevation: "11 m",
              founded: "M.Ö. 214",
              coords: { lat: 23.1291, lng: 113.2644 },
              highlights: ["Kanton Kulesi (Canton Tower)", "Shamian Adası", "Yuexiu Parkı"],
              description: "İpek Yolu liman kenti; devasa ticaret fuarlarıyla bilinen metropol."
            }
          ]
        },
        {
          id: "india",
          name: "Hindistan",
          nativeName: "Bharat Ganarajya (भारत)",
          flag: "🇮🇳",
          capital: "Yeni Delhi",
          coords: { lat: 28.6139, lng: 77.2090 },
          population: "1.43 Milyar",
          area: "3,287,263 km²",
          currency: "Hindistan Rupisi (₹ - INR)",
          language: "Hintçe, İngilizce (22 Resmi Dil)",
          religion: "Hinduizm (%79.8), İslam (%14.2)",
          callingCode: "+91",
          gdp: "$3.7 Trilyon",
          badge: "Renklerin ve Baharatın Ülkesi",
          summary: "Dünyanın en kalabalık ülkesi ve yazılım devi.",
          cities: [
            {
              id: "new-delhi",
              name: "Yeni Delhi",
              isCapital: true,
              population: "33.0 Milyon",
              elevation: "216 m",
              founded: "1911",
              coords: { lat: 28.6139, lng: 77.2090 },
              highlights: ["India Gate", "Qutub Minar", "Lotus Tapınağı", "Kızıl Kale"],
              description: "Geniş bulvarları ve Babür mirasıyla tarihi ve politik merkez."
            },
            {
              id: "mumbai",
              name: "Mumbai",
              isCapital: false,
              population: "21.0 Milyon",
              elevation: "14 m",
              founded: "1500'ler",
              coords: { lat: 19.0760, lng: 72.8777 },
              highlights: ["Gateway of India", "Marine Drive", "Bollywood Stüdyoları"],
              description: "Hindistan'ın finans, ticaret ve sinema (Bollywood) kalbi."
            },
            {
              id: "agra",
              name: "Agra",
              isCapital: false,
              population: "1.6 Milyon",
              elevation: "171 m",
              founded: "1504",
              coords: { lat: 27.1767, lng: 78.0081 },
              highlights: ["Tac Mahal (Taj Mahal)", "Agra Kalesi", "Mehtab Bagh"],
              description: "Dünyanın 7 harikasından biri olan aşk anıtı Tac Mahal'in evi."
            }
          ]
        },
        {
          id: "azerbaijan",
          name: "Azerbaycan",
          nativeName: "Azərbaycan Respublikası",
          flag: "🇦🇿",
          capital: "Bakü",
          coords: { lat: 40.4093, lng: 49.8671 },
          population: "10.2 Milyon",
          area: "86,600 km²",
          currency: "Azerbaycan Manatı (₼ - AZN)",
          language: "Azerbaycan Türkçesi",
          religion: "İslam (%96)",
          callingCode: "+994",
          gdp: "$78 Milyar",
          badge: "Odlar Yurdu ve Hazar'ın İncisi",
          summary: "Hazar Denizi kıyısında zengin petrol rezervleri ve kadim Kafkas kültürü.",
          cities: [
            {
              id: "baku",
              name: "Bakü",
              isCapital: true,
              population: "2.3 Milyon",
              elevation: "-28 m",
              founded: "5. Yüzyıl",
              coords: { lat: 40.4093, lng: 49.8671 },
              highlights: ["İçerişehir (Kız Kalesi)", "Alev Kuleleri", "Haydar Aliyev Merkezi"],
              description: "Hazar kıyısındaki rüzgarlar şehri; fütüristik mimarisi ve tarihi sokaklarıyla ünlü."
            },
            {
              id: "ganja",
              name: "Gence",
              isCapital: false,
              population: "335 Bin",
              elevation: "400 m",
              founded: "M.S. 859",
              coords: { lat: 40.6828, lng: 46.3606 },
              highlights: ["Nizami Gencevi Türbesi", "Şah Abbas Camii", "Göygöl Ulusal Parkı"],
              description: "Büyük şair Nizami'nin memleketi ve Azerbaycan'ın ikinci kültür kenti."
            },
            {
              id: "sheki",
              name: "Şeki",
              isCapital: false,
              population: "68 Bin",
              elevation: "500 m",
              founded: "M.Ö. 1. Binde",
              coords: { lat: 41.1919, lng: 47.1706 },
              highlights: ["Şeki Hanları Sarayı", "Kafkas Dağları Manzarası", "Tarihi Kervansaray"],
              description: "UNESCO korumasındaki ahşap çıtalı sarayı ve tatlılarıyla meşhur dağ kenti."
            }
          ]
        }
      ]
    },
    {
      id: "africa",
      name: "Afrika",
      englishName: "Africa",
      icon: "🦁",
      color: "#10b981",
      coords: { lat: 2.0, lng: 20.0 },
      cameraDist: 2.4,
      population: "1.46 Milyar",
      area: "30.37 Milyon km²",
      countriesCount: 54,
      highestPoint: "Kilimanjaro Dağı (5,895 m)",
      longestRiver: "Nil Nehri (6,650 km)",
      description: "İnsanlığın doğduğu kıta. Devasa vahşi yaşam safarileri ve Sahra Çölü'nün evi.",
      funFact: "Dünyanın en uzun nehri Nil ve en büyük sıcak çölü Sahra Afrika kıtasındadır.",
      countries: [
        {
          id: "egypt",
          name: "Mısır",
          nativeName: "Jumhuriyat Misr al-Arabiyah (مصر)",
          flag: "🇪🇬",
          capital: "Kahire",
          coords: { lat: 30.0444, lng: 31.2357 },
          population: "112 Milyon",
          area: "1,010,408 km²",
          currency: "Mısır Lirası (EGP)",
          language: "Arapça",
          religion: "İslam (%90), Hristiyanlık (%10 Kıpti)",
          callingCode: "+20",
          gdp: "$400 Milyar",
          badge: "Firavunlar ve Piramitler Diyarı",
          summary: "7000 yıllık yazılı tarihiyle Giza Piramitleri'ne sahip efsanevi coğrafya.",
          cities: [
            {
              id: "cairo",
              name: "Kahire",
              isCapital: true,
              population: "22 Milyon",
              elevation: "68 m",
              founded: "M.S. 969",
              coords: { lat: 30.0444, lng: 31.2357 },
              highlights: ["Giza Piramitleri ve Sfenks", "Büyük Mısır Müzesi", "Han el-Halili"],
              description: "'Bin Minareli Şehir' olarak bilinen Nil kıyısındaki devasa Arap metropolü."
            },
            {
              id: "alexandria",
              name: "İskenderiye",
              isCapital: false,
              population: "5.4 Milyon",
              elevation: "5 m",
              founded: "M.Ö. 331",
              coords: { lat: 31.2001, lng: 29.9187 },
              highlights: ["İskenderiye Kütüphanesi", "Kayıtbay Kalesi"],
              description: "Antik feneri ve efsanevi kütüphanesiyle Akdeniz liman kenti."
            },
            {
              id: "luxor",
              name: "Luksor",
              isCapital: false,
              population: "500 Bin",
              elevation: "89 m",
              founded: "Antik Teb Şehri",
              coords: { lat: 25.6872, lng: 32.6396 },
              highlights: ["Krallar Vadisi", "Karnak Tapınağı", "Tutankamon Türbesi"],
              description: "Antik Mısır tapınaklarının ve firavun mezarlarının açık hava müzesi."
            }
          ]
        },
        {
          id: "south-africa",
          name: "Güney Afrika",
          nativeName: "Republic of South Africa",
          flag: "🇿🇦",
          capital: "Pretoria / Cape Town",
          coords: { lat: -25.7479, lng: 28.2293 },
          population: "60.4 Milyon",
          area: "1,221,037 km²",
          currency: "Güney Afrika Randı (ZAR)",
          language: "12 Resmi Dil (İngilizce, Zulu...)",
          religion: "Hristiyanlık (%86)",
          callingCode: "+27",
          gdp: "$380 Milyar",
          badge: "Gökkuşağı Ulusu",
          summary: "Nelson Mandela mirası ve Ümit Burnu.",
          cities: [
            {
              id: "cape-town",
              name: "Cape Town",
              isCapital: true,
              population: "4.8 Milyon",
              elevation: "0 m",
              founded: "1652",
              coords: { lat: -33.9249, lng: 18.4241 },
              highlights: ["Masa Dağı", "Ümit Burnu", "Robben Adası"],
              description: "Atlas ve Hint okyanuslarının kıyısında büyüleyici sahil kenti."
            },
            {
              id: "johannesburg",
              name: "Johannesburg",
              isCapital: false,
              population: "5.9 Milyon",
              elevation: "1,753 m",
              founded: "1886",
              coords: { lat: -26.2041, lng: 28.0473 },
              highlights: ["Apartheid Müzesi", "Soweto & Vilakazi"],
              description: "'Egoli' (Altın Şehri); Afrika'nın finans ve ekonomi kalbi."
            }
          ]
        },
        {
          id: "morocco",
          name: "Fas",
          nativeName: "Al-Mamlakah al-Maghribiyah (المملكة المغربية)",
          flag: "🇲🇦",
          capital: "Rabat",
          coords: { lat: 34.0209, lng: -6.8416 },
          population: "37.8 Milyon",
          area: "446,550 km²",
          currency: "Fas Dirhemi (MAD)",
          language: "Arapça, Berberi dili",
          religion: "İslam (%99)",
          callingCode: "+212",
          gdp: "$145 Milyar",
          badge: "Atlas Dağları ve Masalsı Medinalar",
          summary: "Cebelitarık Boğazı'nın güneyinde egzotik krallık.",
          cities: [
            {
              id: "rabat",
              name: "Rabat",
              isCapital: true,
              population: "580 Bin",
              elevation: "53 m",
              founded: "1146",
              coords: { lat: 34.0209, lng: -6.8416 },
              highlights: ["Hassan Kulesi", "Udaya Kasbahı"],
              description: "Atlas Okyanusu kıyısındaki zarif ve sakin kraliyet başkenti."
            },
            {
              id: "marrakech",
              name: "Marakeş",
              isCapital: false,
              population: "1.0 Milyon",
              elevation: "466 m",
              founded: "1062",
              coords: { lat: 31.6295, lng: -7.9811 },
              highlights: ["Cemaa el Fna Meydanı", "Majorelle Bahçeleri"],
              description: "'Kızıl Şehir' Marakeş; mistik atmosferiyle Fas'ın ruhudur."
            },
            {
              id: "casablanca",
              name: "Kazablanka",
              isCapital: false,
              population: "3.7 Milyon",
              elevation: "17 m",
              founded: "M.Ö. 7. Yüzyıl",
              coords: { lat: 33.5731, lng: -7.5898 },
              highlights: ["II. Hasan Camii", "Kordon Boyu"],
              description: "Fas'ın en büyük ticaret limanı ve sinema klasiklerine konu kenti."
            }
          ]
        }
      ]
    },
    {
      id: "north-america",
      name: "Kuzey Amerika",
      englishName: "North America",
      icon: "🗽",
      color: "#ec4899",
      coords: { lat: 45.0, lng: -100.0 },
      cameraDist: 2.3,
      population: "592 Milyon",
      area: "24.71 Milyon km²",
      countriesCount: 23,
      highestPoint: "Denali Dağı (6,190 m)",
      longestRiver: "Missouri-Mississippi (6,275 km)",
      description: "Ekonomik ve teknolojik inovasyonların öncüsü.",
      funFact: "ABD ve Kanada arasındaki sınır (8,891 km), dünyadaki en uzun silahsız sınırdır.",
      countries: [
        {
          id: "usa",
          name: "Amerika Birleşik Devletleri",
          nativeName: "United States of America",
          flag: "🇺🇸",
          capital: "Washington, D.C.",
          coords: { lat: 38.9072, lng: -77.0369 },
          population: "336 Milyon",
          area: "9,833,517 km²",
          currency: "ABD Doları ($ - USD)",
          language: "İngilizce",
          religion: "Hristiyanlık (%63 Hristiyan, %29 Seküler)",
          callingCode: "+1",
          gdp: "$27.9 Trilyon",
          badge: "Süper Güç ve İnovasyon Merkezi",
          summary: "50 eyaletten oluşan federal cumhuriyet.",
          cities: [
            {
              id: "washington-dc",
              name: "Washington, D.C.",
              isCapital: true,
              population: "690 Bin",
              elevation: "7 m",
              founded: "1790",
              coords: { lat: 38.9072, lng: -77.0369 },
              highlights: ["Beyaz Saray", "Kongre Binası", "Lincoln Anıtı"],
              description: "Neoklasik anıtlarla donatılmış politik karar merkezidir."
            },
            {
              id: "new-york",
              name: "New York",
              isCapital: false,
              population: "8.5 Milyon (Metropol 20M)",
              elevation: "10 m",
              founded: "1624",
              coords: { lat: 40.7128, lng: -74.0060 },
              highlights: ["Özgürlük Heykeli", "Times Meydanı", "Central Park", "Empire State"],
              description: "'Asla Uyumayan Şehir'; finans ve tiyatro başkentidir."
            },
            {
              id: "los-angeles",
              name: "Los Angeles",
              isCapital: false,
              population: "3.9 Milyon",
              elevation: "87 m",
              founded: "1781",
              coords: { lat: 34.0522, lng: -118.2437 },
              highlights: ["Hollywood Tabelası", "Santa Monica İskelesi", "Beverly Hills"],
              description: "Sinema endüstrisinin ve palmiyeli sahillere sahip melekler şehri."
            }
          ]
        },
        {
          id: "canada",
          name: "Kanada",
          nativeName: "Canada",
          flag: "🇨🇦",
          capital: "Ottawa",
          coords: { lat: 45.4215, lng: -75.6972 },
          population: "40.1 Milyon",
          area: "9,984,670 km²",
          currency: "Kanada Doları (CAD)",
          language: "İngilizce, Fransızca",
          religion: "Hristiyanlık (%53 Hristiyan, %34 Seküler)",
          callingCode: "+1",
          gdp: "$2.1 Trilyon",
          badge: "Buzullar, Göller ve Hoşgörü Ülkesi",
          summary: "Dünyanın en büyük 2. ülkesi.",
          cities: [
            {
              id: "ottawa",
              name: "Ottawa",
              isCapital: true,
              population: "1.0 Milyon",
              elevation: "70 m",
              founded: "1826",
              coords: { lat: 45.4215, lng: -75.6972 },
              highlights: ["Parlamento Tepesi", "Rideau Kanalı"],
              description: "İki dilli, müzeleri ve kış festivalleriyle tanınan başkent."
            },
            {
              id: "toronto",
              name: "Toronto",
              isCapital: false,
              population: "2.8 Milyon",
              elevation: "76 m",
              founded: "1793",
              coords: { lat: 43.6532, lng: -79.3832 },
              highlights: ["CN Kulesi (553 m)", "Ontario Gölü", "Niagara Şelalesi"],
              description: "Kanada'nın en büyük ve en çok göçmen barındıran kenti."
            }
          ]
        },
        {
          id: "mexico",
          name: "Meksika",
          nativeName: "Estados Unidos Mexicanos",
          flag: "🇲🇽",
          capital: "Meksiko (Mexico City)",
          coords: { lat: 19.4326, lng: -99.1332 },
          population: "128.5 Milyon",
          area: "1,964,375 km²",
          currency: "Meksika Pesosu (MXN)",
          language: "İspanyolca",
          religion: "Hristiyanlık (%89 Katolik)",
          callingCode: "+52",
          gdp: "$1.8 Trilyon",
          badge: "Maya ve Aztek Mirası",
          summary: "Piramitleri ve Karayip sahilleriyle Latin Amerika devi.",
          cities: [
            {
              id: "mexico-city",
              name: "Meksiko",
              isCapital: true,
              population: "9.2 Milyon",
              elevation: "2,240 m",
              founded: "1325",
              coords: { lat: 19.4326, lng: -99.1332 },
              highlights: ["Zocalo Meydanı", "Teotihuacan Piramitleri"],
              description: "Aztek imparatorluk başkenti üzerine kurulu devasa metropol."
            },
            {
              id: "cancun",
              name: "Cancun",
              isCapital: false,
              population: "888 Bin",
              elevation: "10 m",
              founded: "1970",
              coords: { lat: 21.1619, lng: -86.8515 },
              highlights: ["Karayip Plajları", "Chichen Itza Maya Piramidi"],
              description: "Turkuaz denizi ve bembeyaz kumsallarıyla tatil cenneti."
            }
          ]
        }
      ]
    },
    {
      id: "south-america",
      name: "Güney Amerika",
      englishName: "South America",
      icon: "🦜",
      color: "#8b5cf6",
      coords: { lat: -15.0, lng: -60.0 },
      cameraDist: 2.3,
      population: "434 Milyon",
      area: "17.84 Milyon km²",
      countriesCount: 12,
      highestPoint: "Aconcagua Dağı (6,961 m)",
      longestRiver: "Amazon Nehri (6,400 km)",
      description: "Dünyanın akciğeri Amazon Yağmur Ormanları kıtası.",
      funFact: "Amazon Nehri, dünyadaki diğer en büyük 7 nehrin toplamından daha fazla su taşır.",
      countries: [
        {
          id: "brazil",
          name: "Brezilya",
          nativeName: "República Federativa do Brasil",
          flag: "🇧🇷",
          capital: "Brasilia",
          coords: { lat: -15.7975, lng: -47.8919 },
          population: "216 Milyon",
          area: "8,515,767 km²",
          currency: "Brezilya Reali (BRL)",
          language: "Portekizce",
          religion: "Hristiyanlık (%88 Katolik & Evanjelik)",
          callingCode: "+55",
          gdp: "$2.1 Trilyon",
          badge: "Futbolun ve Karnavalın Kalbi",
          summary: "Güney Amerika'nın en büyük ülkesi.",
          cities: [
            {
              id: "brasilia",
              name: "Brasilia",
              isCapital: true,
              population: "3.1 Milyon",
              elevation: "1,172 m",
              founded: "1960",
              coords: { lat: -15.7975, lng: -47.8919 },
              highlights: ["Katedral Metropolitana", "Kongre Binası"],
              description: "Oscar Niemeyer tarafından tasarlanmış fütüristik başkent."
            },
            {
              id: "rio-de-janeiro",
              name: "Rio de Janeiro",
              isCapital: false,
              population: "6.7 Milyon",
              elevation: "5 m",
              founded: "1565",
              coords: { lat: -22.9068, lng: -43.1729 },
              highlights: ["Kurtarıcı İsa Heykeli", "Copacabana Plajı"],
              description: "Samba ritimleri ve görkemli İsa Heykeli ile ünlü rüya kent."
            }
          ]
        },
        {
          id: "argentina",
          name: "Arjantin",
          nativeName: "República Argentina",
          flag: "🇦🇷",
          capital: "Buenos Aires",
          coords: { lat: -34.6037, lng: -58.3816 },
          population: "46.2 Milyon",
          area: "2,780,400 km²",
          currency: "Arjantin Pesosu (ARS)",
          language: "İspanyolca",
          religion: "Hristiyanlık (%77 Katolik)",
          callingCode: "+54",
          gdp: "$620 Milyar",
          badge: "Tango, Pampa ve Patagonya",
          summary: "Futbol ve tango diyarı.",
          cities: [
            {
              id: "buenos-aires",
              name: "Buenos Aires",
              isCapital: true,
              population: "3.1 Milyon",
              elevation: "25 m",
              founded: "1536",
              coords: { lat: -34.6037, lng: -58.3816 },
              highlights: ["Obelisco", "La Boca & Caminito"],
              description: "'Güney Amerika'nın Paris'i' olarak anılan canlı kent."
            }
          ]
        }
      ]
    },
    {
      id: "oceania",
      name: "Okyanusya",
      englishName: "Oceania / Australia",
      icon: "🦘",
      color: "#06b6d4",
      coords: { lat: -25.0, lng: 135.0 },
      cameraDist: 2.3,
      population: "45 Milyon",
      area: "8.52 Milyon km²",
      countriesCount: 14,
      highestPoint: "Puncak Jaya (4,884 m)",
      longestRiver: "Murray Nehri (2,508 km)",
      description: "Büyük Bariyer Resifi ve kangurular kıtası.",
      funFact: "Avustralya'da insan sayısından daha fazla kanguru yaşamaktadır.",
      countries: [
        {
          id: "australia",
          name: "Avustralya",
          nativeName: "Commonwealth of Australia",
          flag: "🇦🇺",
          capital: "Canberra",
          coords: { lat: -35.2809, lng: 149.1300 },
          population: "26.5 Milyon",
          area: "7,692,024 km²",
          currency: "Avustralya Doları (AUD)",
          language: "İngilizce",
          religion: "Hristiyanlık (%44), Seküler (%39)",
          callingCode: "+61",
          gdp: "$1.7 Trilyon",
          badge: "Büyük Ada Kıta ve Eşsiz Vahşi Yaşam",
          summary: "Ada ülkesi.",
          cities: [
            {
              id: "canberra",
              name: "Canberra",
              isCapital: true,
              population: "460 Bin",
              elevation: "580 m",
              founded: "1913",
              coords: { lat: -35.2809, lng: 149.1300 },
              highlights: ["Parlamento Binası", "Burley Griffin Gölü"],
              description: "Sakin ve düzenli planlanmış başkent."
            },
            {
              id: "sydney",
              name: "Sydney",
              isCapital: false,
              population: "5.3 Milyon",
              elevation: "19 m",
              founded: "1788",
              coords: { lat: -33.8688, lng: 151.2093 },
              highlights: ["Sydney Opera Binası", "Harbour Köprüsü", "Bondi Plajı"],
              description: "Yelkenli çatılı ikonik opera binası ile Avustralya'nın incisi."
            }
          ]
        }
      ]
    },
    {
      id: "antarctica",
      name: "Antarktika",
      englishName: "Antarctica",
      icon: "🧊",
      color: "#e2e8f0",
      coords: { lat: -82.8628, lng: 135.0 },
      cameraDist: 2.6,
      population: "1,000 - 5,000",
      area: "14.2 Milyon km²",
      countriesCount: 0,
      highestPoint: "Vinson Dağı (4,892 m)",
      longestRiver: "Onyx Nehri (32 km)",
      description: "Dünyanın en soğuk, en rüzgarlı ve en kurak kıtası.",
      funFact: "Dünyadaki tüm tatlı su buzullarının yaklaşık %70'i Antarktika kıtasındadır.",
      countries: [
        {
          id: "antarctica-stations",
          name: "Bilimsel Üsler",
          nativeName: "International Research Stations",
          flag: "🇦🇶",
          capital: "McMurdo Üssü",
          coords: { lat: -77.8419, lng: 166.6863 },
          population: "~4,000",
          area: "14.2 Milyon km²",
          currency: "Dolar / Euro",
          language: "Çok dilli",
          religion: "Uluslararası Bilim Topluluğu",
          callingCode: "+672",
          gdp: "$0",
          badge: "Barış ve Bilim Kıtası",
          summary: "Onlarca ülkenin kutup araştırmaları yaptığı beyaz çöl.",
          cities: [
            {
              id: "mcmurdo",
              name: "McMurdo",
              isCapital: true,
              population: "~1,000",
              elevation: "24 m",
              founded: "1956",
              coords: { lat: -77.8419, lng: 166.6863 },
              highlights: ["Ross Buz Sahanlığı", "Erebus Dağı"],
              description: "Antarktika'nın en büyük bilimsel lojistik üssü."
            }
          ]
        }
      ]
    }
  ],
  quizQuestions: [
    {
      question: "Türkiye'nin başkenti neresidir?",
      options: ["İstanbul", "Ankara", "İzmir", "Bursa"],
      answer: "Ankara",
      info: "Ankara, 13 Ekim 1923 tarihinde Türkiye Cumhuriyeti'nin başkenti ilan edilmiştir."
    },
    {
      question: "Japonya hangi kıtada yer alır ve başkenti neresidir?",
      options: ["Asya - Tokyo", "Avrupa - Kyoto", "Okyanusya - Osaka", "Asya - Pekin"],
      answer: "Asya - Tokyo",
      info: "Japonya Doğu Asya'da yer alır ve başkenti Tokyo, dünyanın en kalabalık metropol alanıdır."
    }
  ]
};
