// DÜNYAMIZ - Uygulama Mantığı ve Durum Yönetimi
// Hiyerarşi: Dünya (Tüm Ülke Pinleri Dönen Küre Üzerinde) -> Kıtalar -> Ülkeler -> Başkentler ve Şehirler

class App {
  constructor() {
    this.state = {
      level: 'world', // 'world' | 'continent' | 'country' | 'city'
      activeContinent: null,
      activeCountry: null,
      activeCity: null,
      panelOpen: true,
      autoRotate: true,
      quiz: {
        currentIdx: 0,
        score: 0,
        total: WORLD_DATA.quizQuestions.length,
        answered: false
      }
    };

    this.initElements();
    this.initGlobe();
    this.bindEvents();
    this.render();
  }

  initElements() {
    this.panel = document.getElementById('main-panel');
    this.panelTitle = document.getElementById('panel-title');
    this.panelSubtitle = document.getElementById('panel-subtitle');
    this.panelIcon = document.getElementById('panel-icon');
    this.panelBody = document.getElementById('panel-body');
    this.panelCloseBtn = document.getElementById('panel-close-btn');

    this.breadcrumbBar = document.getElementById('breadcrumb-bar');
    this.searchInput = document.getElementById('search-input');
    this.searchResults = document.getElementById('search-results');

    this.btnRandom = document.getElementById('btn-random');
    this.btnQuiz = document.getElementById('btn-quiz');
    this.btnToggleRotate = document.getElementById('btn-toggle-rotate');
    this.btnResetView = document.getElementById('btn-reset-view');

    this.quizModal = document.getElementById('quiz-modal');
    this.quizCloseBtn = document.getElementById('quiz-close-btn');
    this.quizScore = document.getElementById('quiz-score');
    this.quizQuestion = document.getElementById('quiz-question');
    this.quizOptions = document.getElementById('quiz-options');
    this.quizFeedback = document.getElementById('quiz-feedback');
    this.quizNextBtn = document.getElementById('quiz-next-btn');

    this.toastNotice = document.getElementById('toast-notice');
  }

  initGlobe() {
    this.globe = new EarthGlobe('globe-container', (markerData) => {
      this.handleMarkerClick(markerData);
    });
  }

  bindEvents() {
    // Panel Açma/Kapama
    this.panelCloseBtn.addEventListener('click', () => {
      this.state.panelOpen = !this.state.panelOpen;
      this.panel.classList.toggle('hidden', !this.state.panelOpen);
    });

    // Otomatik Dönüş Butonu
    this.btnToggleRotate.addEventListener('click', () => {
      this.state.autoRotate = !this.state.autoRotate;
      this.globe.setAutoRotate(this.state.autoRotate);
      this.btnToggleRotate.classList.toggle('active-glow', this.state.autoRotate);
      this.showToast(this.state.autoRotate ? 'Döner küre hareketi açıldı 🔄' : 'Döner küre duraklatıldı');
    });

    // Görünümü Sıfırla (Dünya'ya Dön)
    this.btnResetView.addEventListener('click', () => {
      this.navigateToWorld();
    });

    // Rastgele Keşfet (Beni Bir Yere Işınla)
    this.btnRandom.addEventListener('click', () => {
      this.exploreRandomPlace();
    });

    // Bilgi Yarışması (Quiz) Modu
    this.btnQuiz.addEventListener('click', () => {
      this.openQuizModal();
    });

    this.quizCloseBtn.addEventListener('click', () => {
      this.quizModal.classList.remove('active');
    });

    this.quizNextBtn.addEventListener('click', () => {
      this.nextQuizQuestion();
    });

    // Arama Dinleyicisi
    this.searchInput.addEventListener('input', (e) => {
      this.handleSearch(e.target.value.trim());
    });

    // Tıklama dışı arama sonuçlarını kapat
    document.addEventListener('click', (e) => {
      if (!this.searchInput.contains(e.target) && !this.searchResults.contains(e.target)) {
        this.searchResults.classList.remove('active');
      }
    });
  }

  // 3D Döner Küre Üzerindeki Herhangi Bir Ülke veya Şehir İşaretçisine Tıklandığında
  handleMarkerClick(markerData) {
    if (markerData.type === 'country') {
      this.navigateToCountry(markerData.continentId, markerData.id);
    } else if (markerData.type === 'continent') {
      this.navigateToContinent(markerData.id);
    } else if (markerData.type === 'city') {
      this.navigateToCity(markerData.continentId, markerData.countryId, markerData.id);
    }
  }

  // Tüm Ülkeleri Döner Küre Üzerinde Marker Olarak Göster
  getAllCountryMarkers() {
    const markers = [];
    WORLD_DATA.continents.forEach(cont => {
      cont.countries.forEach(country => {
        markers.push({
          id: country.id,
          continentId: cont.id,
          type: 'country',
          name: country.name,
          coords: country.coords,
          color: country.id === 'turkey' ? 0xef4444 : 0x38bdf8
        });
      });
    });
    return markers;
  }

  // 1. DÜNYA GÖRÜNÜMÜ (Döner Küre Üzerinde Tüm Ülkeler)
  navigateToWorld() {
    this.state.level = 'world';
    this.state.activeContinent = null;
    this.state.activeCountry = null;
    this.state.activeCity = null;

    // Döner Küre üzerine TÜM ülkeleri tıklanabilir parıldayan 3D pinler olarak koy
    const allCountryMarkers = this.getAllCountryMarkers();
    this.globe.setMarkers(allCountryMarkers);
    this.globe.flyTo(20, 20, 2.8, 1000);

    this.render();
  }

  navigateToContinent(continentId) {
    const continent = WORLD_DATA.continents.find(c => c.id === continentId);
    if (!continent) return;

    this.state.level = 'continent';
    this.state.activeContinent = continent;
    this.state.activeCountry = null;
    this.state.activeCity = null;

    // Bu kıtadaki ülkeleri marker olarak ayarla
    const countryMarkers = continent.countries.map(country => ({
      id: country.id,
      continentId: continent.id,
      type: 'country',
      name: country.name,
      coords: country.coords,
      color: 0x10b981
    }));
    this.globe.setMarkers(countryMarkers);
    this.globe.flyTo(continent.coords.lat, continent.coords.lng, continent.cameraDist || 2.2, 1200);

    this.render();
  }

  navigateToCountry(continentId, countryId) {
    const continent = WORLD_DATA.continents.find(c => c.id === continentId);
    if (!continent) return;
    const country = continent.countries.find(c => c.id === countryId);
    if (!country) return;

    this.state.level = 'country';
    this.state.activeContinent = continent;
    this.state.activeCountry = country;
    this.state.activeCity = null;

    // Ülkenin başkent ve şehirlerini 3D marker yap
    const cityMarkers = country.cities.map(city => ({
      id: city.id,
      countryId: country.id,
      continentId: continent.id,
      type: 'city',
      name: city.name,
      coords: city.coords,
      color: city.isCapital ? 0xfbbf24 : 0xec4899
    }));
    this.globe.setMarkers(cityMarkers);
    this.globe.flyTo(country.coords.lat, country.coords.lng, 1.85, 1200);

    this.render();
  }

  navigateToCity(continentId, countryId, cityId) {
    const continent = WORLD_DATA.continents.find(c => c.id === continentId);
    if (!continent) return;
    const country = continent.countries.find(c => c.id === countryId);
    if (!country) return;
    const city = country.cities.find(c => c.id === cityId);
    if (!city) return;

    this.state.level = 'city';
    this.state.activeContinent = continent;
    this.state.activeCountry = country;
    this.state.activeCity = city;

    this.globe.flyTo(city.coords.lat, city.coords.lng, 1.55, 1200);
    this.render();
  }

  // Arama Fonksiyonu
  handleSearch(query) {
    if (!query || query.length < 1) {
      this.searchResults.classList.remove('active');
      this.searchResults.innerHTML = '';
      return;
    }

    const q = query.toLocaleLowerCase('tr');
    const matches = [];

    WORLD_DATA.continents.forEach(cont => {
      if (cont.name.toLocaleLowerCase('tr').includes(q)) {
        matches.push({
          type: 'continent',
          title: cont.name,
          subtitle: `${cont.countriesCount} Ülke • ${cont.population}`,
          icon: cont.icon,
          data: { continentId: cont.id }
        });
      }

      cont.countries.forEach(country => {
        if (country.name.toLocaleLowerCase('tr').includes(q) || country.capital.toLocaleLowerCase('tr').includes(q) || country.language.toLocaleLowerCase('tr').includes(q) || country.religion.toLocaleLowerCase('tr').includes(q)) {
          matches.push({
            type: 'country',
            title: `${country.flag} ${country.name}`,
            subtitle: `Başkent: ${country.capital} • Dil: ${country.language} • Din: ${country.religion}`,
            icon: '🏳️',
            data: { continentId: cont.id, countryId: country.id }
          });
        }

        country.cities.forEach(city => {
          if (city.name.toLocaleLowerCase('tr').includes(q)) {
            matches.push({
              type: 'city',
              title: `${city.name} ${city.isCapital ? '⭐ Başkent' : ''}`,
              subtitle: `${country.name} • Nüfus: ${city.population}`,
              icon: '🏙️',
              data: { continentId: cont.id, countryId: country.id, cityId: city.id }
            });
          }
        });
      });
    });

    if (matches.length === 0) {
      this.searchResults.innerHTML = `<div style="padding: 1rem; color: var(--text-dim); text-align: center; font-size: 0.85rem;">"${query}" ile eşleşen kıta, ülke, dil veya din bulunamadı.</div>`;
    } else {
      this.searchResults.innerHTML = matches.slice(0, 8).map(m => `
        <div class="search-result-item" data-type="${m.type}" data-json='${JSON.stringify(m.data)}'>
          <div class="result-info">
            <span style="font-size: 1.2rem;">${m.icon}</span>
            <div>
              <div style="font-weight: 600; font-size: 0.9rem;">${m.title}</div>
              <div style="font-size: 0.72rem; color: var(--text-muted);">${m.subtitle}</div>
            </div>
          </div>
          <span class="result-badge ${m.type}">${m.type === 'continent' ? 'Kıta' : m.type === 'country' ? 'Ülke' : 'Şehir'}</span>
        </div>
      `).join('');

      this.searchResults.querySelectorAll('.search-result-item').forEach(el => {
        el.addEventListener('click', () => {
          const type = el.getAttribute('data-type');
          const data = JSON.parse(el.getAttribute('data-json'));
          this.searchResults.classList.remove('active');
          this.searchInput.value = '';

          if (type === 'continent') {
            this.navigateToContinent(data.continentId);
          } else if (type === 'country') {
            this.navigateToCountry(data.continentId, data.countryId);
          } else if (type === 'city') {
            this.navigateToCity(data.continentId, data.countryId, data.cityId);
          }
        });
      });
    }

    this.searchResults.classList.add('active');
  }

  // Rastgele Keşfet
  exploreRandomPlace() {
    const allCountries = [];
    WORLD_DATA.continents.forEach(cont => {
      cont.countries.forEach(country => {
        allCountries.push({ continent: cont, country: country });
      });
    });

    const choice = allCountries[Math.floor(Math.random() * allCountries.length)];
    this.navigateToCountry(choice.continent.id, choice.country.id);
    this.showToast(`Işınlandın: ${choice.country.flag} ${choice.country.name} (${choice.continent.name}) 🌍✈️`);
  }

  // Render Metodu
  render() {
    this.renderBreadcrumb();
    this.panel.classList.remove('hidden');
    this.state.panelOpen = true;

    if (this.state.level === 'world') {
      this.renderWorldView();
    } else if (this.state.level === 'continent') {
      this.renderContinentView();
    } else if (this.state.level === 'country') {
      this.renderCountryView();
    } else if (this.state.level === 'city') {
      this.renderCityView();
    }
  }

  renderBreadcrumb() {
    let html = `
      <div class="breadcrumb-item ${this.state.level === 'world' ? 'active' : ''}" id="bc-world">
        <span>🌍</span>
        <span>Dünya</span>
      </div>
    `;

    if (this.state.activeContinent) {
      html += `
        <span class="breadcrumb-separator">›</span>
        <div class="breadcrumb-item ${this.state.level === 'continent' ? 'active' : ''}" id="bc-continent">
          <span>${this.state.activeContinent.icon}</span>
          <span>${this.state.activeContinent.name}</span>
        </div>
      `;
    }

    if (this.state.activeCountry) {
      html += `
        <span class="breadcrumb-separator">›</span>
        <div class="breadcrumb-item ${this.state.level === 'country' ? 'active' : ''}" id="bc-country">
          <span>${this.state.activeCountry.flag}</span>
          <span>${this.state.activeCountry.name}</span>
        </div>
      `;
    }

    if (this.state.activeCity) {
      html += `
        <span class="breadcrumb-separator">›</span>
        <div class="breadcrumb-item active" id="bc-city">
          <span>${this.state.activeCity.isCapital ? '⭐' : '🏙️'}</span>
          <span>${this.state.activeCity.name}</span>
        </div>
      `;
    }

    this.breadcrumbBar.innerHTML = html;

    const bcWorld = document.getElementById('bc-world');
    if (bcWorld) bcWorld.addEventListener('click', () => this.navigateToWorld());

    const bcContinent = document.getElementById('bc-continent');
    if (bcContinent && this.state.activeContinent) {
      bcContinent.addEventListener('click', () => this.navigateToContinent(this.state.activeContinent.id));
    }

    const bcCountry = document.getElementById('bc-country');
    if (bcCountry && this.state.activeContinent && this.state.activeCountry) {
      bcCountry.addEventListener('click', () => this.navigateToCountry(this.state.activeContinent.id, this.state.activeCountry.id));
    }
  }

  // 1. DÜNYA GÖRÜNÜMÜ
  renderWorldView() {
    this.panelIcon.textContent = '🌍';
    this.panelTitle.textContent = 'Dünyamız';
    this.panelSubtitle.textContent = '7 Kıta • 195 Ülke • 8+ Milyar İnsan';

    const s = WORLD_DATA.stats;

    this.panelBody.innerHTML = `
      <div class="world-hero-card">
        <div class="world-hero-title">Gezegenimizi Keşfedin</div>
        <div class="world-hero-desc">
          Dönen 3D Dünya küresi üzerindeki parıldayan ülke işaretçilerine doğrudan tıklayarak veya aşağıdaki listeden kıtaları seçerek dilediğiniz ülkenin dilini, dinini, başkentini ve şehirlerini inceleyebilirsiniz.
        </div>
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-label">Toplam Nüfus</div>
            <div class="stat-value">${s.worldPopulation}</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">Yüzölçümü</div>
            <div class="stat-value">${s.surfaceArea}</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">Su / Kara Oranı</div>
            <div class="stat-value">${s.waterPercentage} / ${s.landPercentage}</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">Tanınan Ülke</div>
            <div class="stat-value">${s.countriesCount} Ülke</div>
          </div>
        </div>
      </div>

      <div class="section-heading">
        <span>Kıtalar (7 Kıta)</span>
        <span style="font-size: 0.75rem; color: var(--primary);">Kıtaya gitmek için tıkla</span>
      </div>

      <div class="continents-list">
        ${WORLD_DATA.continents.map(c => `
          <div class="continent-card" data-id="${c.id}">
            <div class="continent-left">
              <div class="continent-icon-badge">${c.icon}</div>
              <div>
                <div class="continent-name">${c.name}</div>
                <div class="continent-meta">${c.countriesCount} Ülke • ${c.population}</div>
              </div>
            </div>
            <div class="btn-drill-down">➔</div>
          </div>
        `).join('')}
      </div>
    `;

    this.panelBody.querySelectorAll('.continent-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        this.navigateToContinent(id);
      });
    });
  }

  // 2. KITA GÖRÜNÜMÜ
  renderContinentView() {
    const c = this.state.activeContinent;
    this.panelIcon.textContent = c.icon;
    this.panelTitle.textContent = `${c.name} Kıtası`;
    this.panelSubtitle.textContent = `${c.englishName} • ${c.countriesCount} Ülke`;

    this.panelBody.innerHTML = `
      <div class="world-hero-card" style="border-color: ${c.color}40; background: linear-gradient(135deg, ${c.color}15, transparent);">
        <div class="world-hero-title" style="color: ${c.color};">${c.name} Hakkında</div>
        <div class="world-hero-desc">${c.description}</div>
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-label">Nüfus</div>
            <div class="stat-value">${c.population}</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">Yüzölçümü</div>
            <div class="stat-value">${c.area}</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">En Yüksek Nokta</div>
            <div class="stat-value" style="font-size: 0.85rem;">${c.highestPoint}</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">En Uzun Nehir</div>
            <div class="stat-value" style="font-size: 0.85rem;">${c.longestRiver}</div>
          </div>
        </div>
      </div>

      <div class="section-heading">
        <span>Kıtadaki Ülkeler (${c.countries.length})</span>
        <span style="font-size: 0.75rem; color: var(--accent-emerald);">Ülke detayları için tıkla</span>
      </div>

      <div class="countries-grid">
        ${c.countries.map(country => `
          <div class="country-card" data-id="${country.id}">
            <div class="country-header">
              <div class="country-flag-title">
                <span class="country-flag">${country.flag}</span>
                <span class="country-name">${country.name}</span>
              </div>
              <span class="country-badge">${country.badge || 'Öne Çıkan Ülke'}</span>
            </div>
            <div style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.4;">${country.summary}</div>
            <div class="country-quick-facts" style="grid-template-columns: repeat(2, 1fr); margin-top: 0.6rem;">
              <div class="fact-box">
                <span class="fact-title">Başkent</span>
                <span class="fact-data">⭐ ${country.capital}</span>
              </div>
              <div class="fact-box">
                <span class="fact-title">Nüfus</span>
                <span class="fact-data">👥 ${country.population}</span>
              </div>
              <div class="fact-box">
                <span class="fact-title">Resmi Dil</span>
                <span class="fact-data">🗣️ ${country.language}</span>
              </div>
              <div class="fact-box">
                <span class="fact-title">Yaygın Din</span>
                <span class="fact-data" style="color: #fbbf24;">🛐 ${country.religion}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    this.panelBody.querySelectorAll('.country-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        this.navigateToCountry(c.id, id);
      });
    });
  }

  // 3. ÜLKE GÖRÜNÜMÜ (Dil ve Din Vurgulu)
  renderCountryView() {
    const cont = this.state.activeContinent;
    const country = this.state.activeCountry;

    this.panelIcon.textContent = country.flag;
    this.panelTitle.textContent = country.name;
    this.panelSubtitle.textContent = `${country.nativeName} • ${cont.name}`;

    const capitalCity = country.cities.find(c => c.isCapital) || country.cities[0];
    const otherCities = country.cities.filter(c => !c.isCapital);

    this.panelBody.innerHTML = `
      <div class="world-hero-card">
        <div class="world-hero-title">${country.flag} ${country.name} Genel Bilgileri</div>
        <div class="world-hero-desc">${country.summary}</div>
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-label">Başkent</div>
            <div class="stat-value" style="color: #fbbf24;">⭐ ${country.capital}</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">Nüfus</div>
            <div class="stat-value">👥 ${country.population}</div>
          </div>
          <div class="stat-item" style="border-left: 2px solid var(--primary);">
            <div class="stat-label">Resmi Dil</div>
            <div class="stat-value" style="font-size: 0.95rem; color: #38bdf8;">🗣️ ${country.language}</div>
          </div>
          <div class="stat-item" style="border-left: 2px solid #fbbf24;">
            <div class="stat-label">Yaygın Din</div>
            <div class="stat-value" style="font-size: 0.95rem; color: #fbbf24;">🛐 ${country.religion}</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">Yüzölçümü</div>
            <div class="stat-value">${country.area}</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">Para Birimi</div>
            <div class="stat-value" style="font-size: 0.95rem;">💰 ${country.currency}</div>
          </div>
        </div>
      </div>

      <!-- BAŞKENT ÖNE ÇIKAN KART -->
      <div class="capital-highlight-card" id="btn-goto-capital" style="cursor: pointer;">
        <div class="capital-badge-header">
          <span class="badge-capital">⭐ Resmi Başkent</span>
          <span style="font-size: 0.78rem; color: #fbbf24;">Şehre Uç ➔</span>
        </div>
        <div class="capital-city-name">${capitalCity.name}</div>
        <div class="capital-city-desc">${capitalCity.description}</div>
        <div class="landmarks-title">Gezilecek Simgesel Yerler:</div>
        <div class="landmarks-tags">
          ${capitalCity.highlights.map(h => `<span class="landmark-pill">📍 ${h}</span>`).join('')}
        </div>
      </div>

      <!-- DİĞER ÖNEMLİ ŞEHİRLER -->
      ${otherCities.length > 0 ? `
        <div class="section-heading">
          <span>Diğer Önemli Şehirler (${otherCities.length})</span>
          <span style="font-size: 0.75rem; color: var(--primary);">Şehre uçmak için tıkla</span>
        </div>

        <div class="other-cities-list">
          ${otherCities.map(city => `
            <div class="city-card" data-id="${city.id}">
              <div class="city-card-header">
                <span class="city-title">🏙️ ${city.name}</span>
                <span class="city-pop">👥 ${city.population}</span>
              </div>
              <div class="city-desc">${city.description}</div>
              <div class="landmarks-tags" style="margin-top: 0.5rem;">
                ${city.highlights.slice(0, 3).map(h => `<span class="landmark-pill" style="font-size: 0.7rem;">📍 ${h}</span>`).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}
    `;

    const btnCapital = document.getElementById('btn-goto-capital');
    if (btnCapital) {
      btnCapital.addEventListener('click', () => {
        this.navigateToCity(cont.id, country.id, capitalCity.id);
      });
    }

    this.panelBody.querySelectorAll('.city-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        this.navigateToCity(cont.id, country.id, id);
      });
    });
  }

  // 4. ŞEHİR DETAY GÖRÜNÜMÜ
  renderCityView() {
    const cont = this.state.activeContinent;
    const country = this.state.activeCountry;
    const city = this.state.activeCity;

    this.panelIcon.textContent = city.isCapital ? '⭐' : '🏙️';
    this.panelTitle.textContent = city.name;
    this.panelSubtitle.textContent = `${city.isCapital ? 'Başkent • ' : ''}${country.name}, ${cont.name}`;

    this.panelBody.innerHTML = `
      <div class="world-hero-card" style="${city.isCapital ? 'border-color: rgba(251, 191, 36, 0.4); background: linear-gradient(135deg, rgba(251, 191, 36, 0.15), transparent);' : ''}">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem;">
          <div class="world-hero-title" style="${city.isCapital ? 'color: #fbbf24;' : ''}">${city.name} Şehir Rehberi</div>
          ${city.isCapital ? '<span class="badge-capital">Resmi Başkent</span>' : ''}
        </div>
        <div class="world-hero-desc">${city.description}</div>
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-label">Nüfus</div>
            <div class="stat-value">${city.population}</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">Bulunduğu Ülke</div>
            <div class="stat-value" style="font-size: 0.9rem;">${country.flag} ${country.name}</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">Ülke Resmi Dili</div>
            <div class="stat-value" style="font-size: 0.85rem; color: #38bdf8;">🗣️ ${country.language}</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">Ülke Yaygın Dini</div>
            <div class="stat-value" style="font-size: 0.85rem; color: #fbbf24;">🛐 ${country.religion}</div>
          </div>
        </div>
      </div>

      <div class="section-heading">
        <span>Görülmesi Gereken Simgesel Yerler</span>
      </div>

      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        ${city.highlights.map(h => `
          <div style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: var(--radius-sm); padding: 0.75rem 1rem; display: flex; align-items: center; gap: 0.75rem;">
            <span style="font-size: 1.2rem;">🏛️</span>
            <div>
              <div style="font-weight: 600; font-size: 0.9rem;">${h}</div>
              <div style="font-size: 0.72rem; color: var(--text-dim);">${city.name} tarihi ve turistik mekanı</div>
            </div>
          </div>
        `).join('')}
      </div>

      <div style="margin-top: 0.5rem; display: flex; gap: 0.6rem;">
        <button id="btn-back-to-country" class="btn-nav" style="width: 100%; justify-content: center; background: rgba(56, 189, 248, 0.15); border-color: var(--primary); color: #38bdf8;">
          ${country.flag} ${country.name} Ülkesine Dön
        </button>
      </div>
    `;

    const btnBack = document.getElementById('btn-back-to-country');
    if (btnBack) {
      btnBack.addEventListener('click', () => {
        this.navigateToCountry(cont.id, country.id);
      });
    }
  }

  // Quiz Mantığı
  openQuizModal() {
    this.state.quiz.currentIdx = 0;
    this.state.quiz.score = 0;
    this.state.quiz.answered = false;
    this.quizModal.classList.add('active');
    this.renderQuizQuestion();
  }

  renderQuizQuestion() {
    const qData = WORLD_DATA.quizQuestions[this.state.quiz.currentIdx];
    this.state.quiz.answered = false;

    this.quizScore.textContent = `Puan: ${this.state.quiz.score} / ${this.state.quiz.total} (Soru ${this.state.quiz.currentIdx + 1}/${this.state.quiz.total})`;
    this.quizQuestion.textContent = qData.question;
    this.quizFeedback.style.display = 'none';
    this.quizNextBtn.style.display = 'none';

    this.quizOptions.innerHTML = qData.options.map(opt => `
      <button class="quiz-opt-btn" data-opt="${opt}">${opt}</button>
    `).join('');

    this.quizOptions.querySelectorAll('.quiz-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.state.quiz.answered) return;
        this.handleQuizAnswer(btn.getAttribute('data-opt'), qData);
      });
    });
  }

  handleQuizAnswer(selectedOpt, qData) {
    this.state.quiz.answered = true;
    const isCorrect = selectedOpt === qData.answer;

    if (isCorrect) {
      this.state.quiz.score++;
      this.quizScore.textContent = `Puan: ${this.state.quiz.score} / ${this.state.quiz.total} (Tebrikler!)`;
    }

    this.quizOptions.querySelectorAll('.quiz-opt-btn').forEach(btn => {
      const opt = btn.getAttribute('data-opt');
      if (opt === qData.answer) {
        btn.classList.add('correct');
      } else if (opt === selectedOpt && !isCorrect) {
        btn.classList.add('wrong');
      }
    });

    this.quizFeedback.style.display = 'block';
    this.quizFeedback.innerHTML = `
      <strong style="color: ${isCorrect ? '#34d399' : '#f43f5e'};">
        ${isCorrect ? '✅ Doğru Cevap!' : '❌ Yanlış Cevap!'}
      </strong><br>
      ${qData.info}
    `;

    this.quizNextBtn.style.display = 'block';
    this.quizNextBtn.textContent = this.state.quiz.currentIdx + 1 >= this.state.quiz.total ? 'Yarışmayı Bitir' : 'Sonraki Soru ➔';
  }

  nextQuizQuestion() {
    if (this.state.quiz.currentIdx + 1 < this.state.quiz.total) {
      this.state.quiz.currentIdx++;
      this.renderQuizQuestion();
    } else {
      this.quizQuestion.textContent = `🎉 Tebrikler! Bilgi yarışmasını tamamladınız.`;
      this.quizOptions.innerHTML = `
        <div style="text-align: center; padding: 1.5rem; font-size: 1.1rem; color: #f8fafc;">
          Toplam Başarı: <strong>${this.state.quiz.score} / ${this.state.quiz.total}</strong> Doğru
        </div>
      `;
      this.quizFeedback.style.display = 'none';
      this.quizNextBtn.textContent = 'Tekrar Oyna';
      this.quizNextBtn.onclick = () => {
        this.openQuizModal();
      };
    }
  }

  showToast(message) {
    this.toastNotice.textContent = message;
    this.toastNotice.classList.add('show');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      this.toastNotice.classList.remove('show');
    }, 3200);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
  window.app.navigateToWorld();
});
