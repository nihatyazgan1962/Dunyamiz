// DÜNYAMIZ - 3D İnteraktif Dünya Motoru (Three.js WebGL)
// Bağımsız çalışan, procedurally zenginleştirilmiş gerçekçi Dünya, atmosfer ve yıldızlar

class EarthGlobe {
  constructor(containerId, onMarkerClick) {
    this.container = document.getElementById(containerId);
    this.onMarkerClick = onMarkerClick;
    this.markers = [];
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    this.targetRotation = { x: 0.2, y: 0 };
    this.currentRotation = { x: 0.2, y: 0 };
    this.targetDistance = 2.8;
    this.currentDistance = 2.8;
    this.autoRotate = true;
    this.autoRotateSpeed = 0.0015;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.isAnimatingTo = false;

    this.init();
  }

  init() {
    // 1. Sahne ve Kamera
    this.scene = new THREE.Scene();
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.z = this.currentDistance;

    // 2. WebGL Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;
    this.container.appendChild(this.renderer.domElement);

    // 3. Işıklandırma
    const ambientLight = new THREE.AmbientLight(0x223344, 1.2);
    this.scene.add(ambientLight);

    this.sunLight = new THREE.DirectionalLight(0xffffff, 2.2);
    this.sunLight.position.set(5, 3, 5);
    this.scene.add(this.sunLight);

    const backLight = new THREE.DirectionalLight(0x38bdf8, 0.8);
    backLight.position.set(-5, -2, -4);
    this.scene.add(backLight);

    // 4. Yıldız Kümesi (Uzay Arka Planı)
    this.createStars();

    // 5. Dünya Küresi (Gelişmiş Canvas Dokusu & Kabartma)
    this.createEarth();

    // 6. Bulut Katmanı
    this.createClouds();

    // 7. Atmosfer Hale Işıltısı
    this.createAtmosphere();

    // 8. Olay Dinleyicileri (Fare, Dokunmatik, Resize)
    this.bindEvents();

    // 9. Render Döngüsü Başlat
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  // Yüksek çözünürlüklü procedurally üretilen Dünya Harita Dokusu
  generateEarthTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Okyanus rengi (Derin mavi ve degrade)
    const oceanGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    oceanGrad.addColorStop(0, '#061a33');
    oceanGrad.addColorStop(0.5, '#0a2e5c');
    oceanGrad.addColorStop(1, '#081e3a');
    ctx.fillStyle = oceanGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Okyanus dalga ve derinlik deseni
    ctx.fillStyle = 'rgba(14, 116, 144, 0.15)';
    for (let i = 0; i < 600; i++) {
      const rx = Math.random() * canvas.width;
      const ry = Math.random() * canvas.height;
      const r = Math.random() * 40 + 5;
      ctx.beginPath();
      ctx.arc(rx, ry, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Kıta ana hatlarını çizme fonksiyonu (Lng, Lat -> Canvas X, Y)
    const toCanvasCoords = (lng, lat) => {
      const x = ((lng + 180) / 360) * canvas.width;
      const y = ((90 - lat) / 180) * canvas.height;
      return { x, y };
    };

    // Kıtaların coğrafi ana kara poligonları
    const continentPolygons = [
      // Afrika
      [
        [-17, 30], [-5, 36], [10, 37], [25, 32], [35, 28], [43, 12], [51, 12],
        [44, 4], [40, -10], [35, -24], [28, -34], [18, -35], [12, -20], [8, 4],
        [2, 6], [-15, 12], [-17, 21], [-17, 30]
      ],
      // Avrupa & Asya (Avrasya)
      [
        [-9, 36], [-9, 43], [0, 48], [-5, 58], [5, 62], [20, 70], [30, 71],
        [60, 70], [100, 77], [140, 72], [170, 66], [160, 55], [140, 45],
        [130, 35], [120, 30], [110, 20], [100, 10], [80, 8], [70, 20],
        [60, 25], [50, 28], [35, 30], [28, 41], [15, 40], [5, 43], [-3, 36], [-9, 36]
      ],
      // Kuzey Amerika
      [
        [-168, 65], [-160, 70], [-130, 70], [-90, 70], [-60, 60], [-55, 48],
        [-65, 44], [-75, 35], [-80, 25], [-97, 20], [-105, 22], [-117, 32],
        [-124, 40], [-125, 50], [-140, 60], [-165, 60], [-168, 65]
      ],
      // Güney Amerika
      [
        [-75, 11], [-60, 8], [-50, 0], [-35, -5], [-37, -12], [-42, -22],
        [-50, -30], [-65, -45], [-68, -55], [-75, -50], [-72, -35], [-78, -10],
        [-80, -2], [-75, 11]
      ],
      // Avustralya
      [
        [115, -22], [125, -15], [135, -12], [142, -11], [148, -20], [153, -28],
        [150, -37], [138, -35], [130, -32], [115, -34], [113, -25], [115, -22]
      ],
      // Grönland
      [
        [-55, 60], [-40, 60], [-20, 75], [-30, 83], [-50, 82], [-55, 70], [-55, 60]
      ],
      // Antarktika
      [
        [-180, -70], [180, -70], [180, -90], [-180, -90]
      ]
    ];

    // Karaları çiz
    ctx.fillStyle = '#1e3a2b'; // Koyu yeşil bitki örtüsü
    continentPolygons.forEach(polygon => {
      ctx.beginPath();
      polygon.forEach((pt, index) => {
        const coords = toCanvasCoords(pt[0], pt[1]);
        if (index === 0) ctx.moveTo(coords.x, coords.y);
        else ctx.lineTo(coords.x, coords.y);
      });
      ctx.closePath();
      ctx.fill();
    });

    // Karalara detay katmanı (Topografik yeşil ve bej tonları, dağlar, çöller)
    ctx.fillStyle = '#2d5a3f';
    continentPolygons.forEach(polygon => {
      ctx.beginPath();
      polygon.forEach((pt, index) => {
        // İçeri doğru ufak pay ile 2. katman
        const coords = toCanvasCoords(pt[0] * 0.95, pt[1] * 0.95);
        if (index === 0) ctx.moveTo(coords.x, coords.y);
        else ctx.lineTo(coords.x, coords.y);
      });
      ctx.closePath();
      ctx.fill();
    });

    // Sahra, Arap ve Gobi Çölleri tonlaması (Sarımsı bej)
    const deserts = [
      { lng: 15, lat: 22, rx: 180, ry: 60 }, // Sahra
      { lng: 45, lat: 23, rx: 70, ry: 40 },  // Arap Yarımadası
      { lng: 100, lat: 42, rx: 90, ry: 35 }, // Gobi
      { lng: 132, lat: -25, rx: 80, ry: 50 }, // Avustralya İçleri
      { lng: -110, lat: 34, rx: 50, ry: 30 } // Arizona/Nevada
    ];

    deserts.forEach(d => {
      const pos = toCanvasCoords(d.lng, d.lat);
      const grad = ctx.createRadialGradient(pos.x, pos.y, 5, pos.x, pos.y, d.rx);
      grad.addColorStop(0, '#c29b61');
      grad.addColorStop(0.7, '#8f7743');
      grad.addColorStop(1, 'rgba(45, 90, 63, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(pos.x, pos.y, d.rx, d.ry, 0, 0, Math.PI * 2);
      ctx.fill();
    });

    // Kar ve Buzullar (Kutup bölgeleri & Grönland & Antarktika)
    const snowGradTop = ctx.createLinearGradient(0, 0, 0, 130);
    snowGradTop.addColorStop(0, '#ffffff');
    snowGradTop.addColorStop(0.8, 'rgba(230, 245, 255, 0.8)');
    snowGradTop.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = snowGradTop;
    ctx.fillRect(0, 0, canvas.width, 130);

    const snowGradBottom = ctx.createLinearGradient(0, canvas.height - 180, 0, canvas.height);
    snowGradBottom.addColorStop(0, 'rgba(255, 255, 255, 0)');
    snowGradBottom.addColorStop(0.3, 'rgba(240, 248, 255, 0.9)');
    snowGradBottom.addColorStop(1, '#ffffff');
    ctx.fillStyle = snowGradBottom;
    ctx.fillRect(0, canvas.height - 180, canvas.width, 180);

    // Şehir Gece Işıkları (Canlı sarı/turuncu ışıltılar)
    ctx.fillStyle = '#fef08a';
    for (let i = 0; i < 800; i++) {
      // Rastgele karaların yoğun olduğu bölgelere dağıtım
      const lng = (Math.random() * 320) - 140;
      const lat = (Math.random() * 90) - 20;
      const pos = toCanvasCoords(lng, lat);
      ctx.fillRect(pos.x, pos.y, Math.random() * 2 + 1, Math.random() * 2 + 1);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  }

  // Bulut Dokusu
  generateCloudTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';

    // Doğal bulut kümeleri
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height * 0.8 + (canvas.height * 0.1);
      const r = Math.random() * 35 + 10;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.55)');
      grad.addColorStop(0.6, 'rgba(255, 255, 255, 0.25)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    return texture;
  }

  createEarth() {
    const earthGeometry = new THREE.SphereGeometry(1, 64, 64);
    const earthTexture = this.generateEarthTexture();

    this.earthMaterial = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.7,
      metalness: 0.1,
      bumpScale: 0.05
    });

    this.earth = new THREE.Mesh(earthGeometry, this.earthMaterial);
    this.scene.add(this.earth);

    // Kıtalar ve Şehirler için Marker Grubu
    this.markerGroup = new THREE.Group();
    this.earth.add(this.markerGroup);
  }

  createClouds() {
    const cloudGeometry = new THREE.SphereGeometry(1.015, 48, 48);
    const cloudTexture = this.generateCloudTexture();

    this.cloudMaterial = new THREE.MeshStandardMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.clouds = new THREE.Mesh(cloudGeometry, this.cloudMaterial);
    this.earth.add(this.clouds);
  }

  createAtmosphere() {
    // Atmosfer Işıltısı (Glow Mesh)
    const atmosphereGeometry = new THREE.SphereGeometry(1.15, 48, 48);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0, 0, 1.0)), 2.2);
          gl_FragColor = vec4(0.25, 0.65, 1.0, 1.0) * intensity;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false
    });

    this.atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    this.scene.add(this.atmosphere);
  }

  createStars() {
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 2000;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      const radius = 50 + Math.random() * 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);

      // Çeşitli yıldız renkleri (Mavi, beyaz, sarımsı)
      const colorType = Math.random();
      if (colorType > 0.8) {
        colors[i] = 0.6; colors[i + 1] = 0.8; colors[i + 2] = 1.0; // Açık Mavi
      } else if (colorType > 0.6) {
        colors[i] = 1.0; colors[i + 1] = 0.9; colors[i + 2] = 0.7; // Sıcak Yıldız
      } else {
        colors[i] = 0.95; colors[i + 1] = 0.95; colors[i + 2] = 1.0; // Beyaz
      }
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.7,
      vertexColors: true,
      transparent: true,
      opacity: 0.85
    });

    this.stars = new THREE.Points(starGeometry, starMaterial);
    this.scene.add(this.stars);
  }

  // Lat / Lng koordinatını 3D Küre Üzerinde Vektöre Çevirme
  latLngToVector3(lat, lng, radius = 1.02) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);

    return new THREE.Vector3(x, y, z);
  }

  // 3D Parıldayan İşaretçiler Ekle (Kıtalar veya Başkentler için)
  setMarkers(markerDataList) {
    // Önceki markerları temizle
    while (this.markerGroup.children.length > 0) {
      const obj = this.markerGroup.children[0];
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) obj.material.dispose();
      this.markerGroup.remove(obj);
    }
    this.markers = [];

    markerDataList.forEach(item => {
      const position = this.latLngToVector3(item.coords.lat, item.coords.lng, 1.02);

      // Ana Pin Küresi
      const pinGeo = new THREE.SphereGeometry(0.024, 16, 16);
      const pinMat = new THREE.MeshBasicMaterial({
        color: item.color || 0x38bdf8
      });
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.copy(position);

      // Dış Halka (Pulse animasyonu için)
      const ringGeo = new THREE.RingGeometry(0.035, 0.048, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: item.color || 0x38bdf8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.copy(position);
      ringMesh.lookAt(new THREE.Vector3(0, 0, 0)); // Kürenin merkezine baksın

      // Grup olarak birleştir
      const markerParent = new THREE.Group();
      markerParent.add(pinMesh);
      markerParent.add(ringMesh);
      markerParent.userData = item;

      this.markerGroup.add(markerParent);
      this.markers.push({ parent: markerParent, ring: ringMesh, initialScale: 1 });
    });
  }

  // Belirli bir koordinata pürüzsüz kamera uçuşu (Fly To)
  flyTo(lat, lng, targetDist = 2.0, duration = 1200) {
    this.isAnimatingTo = true;
    this.autoRotate = false;

    // Hedef rotasyonu hesapla
    const targetY = -(lng + 90) * (Math.PI / 180);
    const targetX = (lat) * (Math.PI / 180);

    const startRotX = this.currentRotation.x;
    const startRotY = this.currentRotation.y;
    const startDist = this.currentDistance;

    // En kısa açıyı bul
    let diffY = (targetY - startRotY) % (Math.PI * 2);
    if (diffY < -Math.PI) diffY += Math.PI * 2;
    if (diffY > Math.PI) diffY -= Math.PI * 2;

    const startTime = performance.now();

    const animateFlight = (time) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1.0);
      // Smooth cubic in-out easing
      const ease = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      this.currentRotation.x = startRotX + (targetX - startRotX) * ease;
      this.currentRotation.y = startRotY + diffY * ease;
      this.targetRotation.x = this.currentRotation.x;
      this.targetRotation.y = this.currentRotation.y;

      this.currentDistance = startDist + (targetDist - startDist) * ease;
      this.targetDistance = this.currentDistance;
      this.camera.position.z = this.currentDistance;

      if (progress < 1.0) {
        requestAnimationFrame(animateFlight);
      } else {
        this.isAnimatingTo = false;
      }
    };

    requestAnimationFrame(animateFlight);
  }

  // Fare ve Dokunmatik Etkileşimleri
  bindEvents() {
    const dom = this.container;

    // Mouse Down
    dom.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.autoRotate = false;
      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    // Mouse Move
    dom.addEventListener('mousemove', (e) => {
      // Hover kontrolü için raycasting
      const rect = dom.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (!this.isDragging) {
        this.checkHover();
        return;
      }

      const deltaX = e.clientX - this.previousMousePosition.x;
      const deltaY = e.clientY - this.previousMousePosition.y;

      this.targetRotation.y += deltaX * 0.005;
      this.targetRotation.x += deltaY * 0.005;

      // Kutup noktalarında aşırı ters dönmeyi sınırla
      this.targetRotation.x = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, this.targetRotation.x));

      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    // Mouse Up / Leave
    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    // Click / Tap on Marker
    dom.addEventListener('click', (e) => {
      const rect = dom.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObjects(
        this.markers.map(m => m.parent),
        true
      );

      if (intersects.length > 0) {
        // En yakın markera tıklandı
        let topGroup = intersects[0].object;
        while (topGroup.parent && topGroup.parent !== this.markerGroup) {
          topGroup = topGroup.parent;
        }
        if (topGroup.userData && this.onMarkerClick) {
          this.onMarkerClick(topGroup.userData);
        }
      }
    });

    // Mouse Wheel Zoom
    dom.addEventListener('wheel', (e) => {
      e.preventDefault();
      this.targetDistance += e.deltaY * 0.0015;
      this.targetDistance = Math.max(1.4, Math.min(4.5, this.targetDistance));
    }, { passive: false });

    // Touch Support (Mobil Cihazlar)
    dom.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.autoRotate = false;
        this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    }, { passive: true });

    dom.addEventListener('touchmove', (e) => {
      if (this.isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - this.previousMousePosition.x;
        const deltaY = e.touches[0].clientY - this.previousMousePosition.y;

        this.targetRotation.y += deltaX * 0.005;
        this.targetRotation.x += deltaY * 0.005;
        this.targetRotation.x = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, this.targetRotation.x));

        this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    }, { passive: true });

    dom.addEventListener('touchend', () => {
      this.isDragging = false;
    });

    // Window Resize
    window.addEventListener('resize', () => {
      const width = this.container.clientWidth || window.innerWidth;
      const height = this.container.clientHeight || window.innerHeight;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    });
  }

  checkHover() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(
      this.markers.map(m => m.parent),
      true
    );

    if (intersects.length > 0) {
      this.container.style.cursor = 'pointer';
    } else {
      this.container.style.cursor = this.isDragging ? 'grabbing' : 'grab';
    }
  }

  // 60 FPS Render Döngüsü
  animate() {
    requestAnimationFrame(this.animate);

    // Otomatik Yavaş Dönüş
    if (this.autoRotate && !this.isDragging && !this.isAnimatingTo) {
      this.targetRotation.y += this.autoRotateSpeed;
    }

    // Pürüzsüz Rotasyon Damping (Sönümleme)
    if (!this.isAnimatingTo) {
      this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * 0.08;
      this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * 0.08;
      this.currentDistance += (this.targetDistance - this.currentDistance) * 0.08;
      this.camera.position.z = this.currentDistance;
    }

    if (this.earth) {
      this.earth.rotation.x = this.currentRotation.x;
      this.earth.rotation.y = this.currentRotation.y;
    }

    // Bulutların Dünya'dan biraz daha hızlı dönmesi (Rüzgar etkisi)
    if (this.clouds) {
      this.clouds.rotation.y += 0.0003;
    }

    // Yıldızların çok hafif arka plan salınımı
    if (this.stars) {
      this.stars.rotation.y += 0.0001;
    }

    // Marker Parıldama (Pulse Efekti)
    const time = performance.now() * 0.003;
    this.markers.forEach((m, idx) => {
      const scale = 1 + Math.sin(time + idx) * 0.25;
      m.ring.scale.set(scale, scale, 1);
    });

    this.renderer.render(this.scene, this.camera);
  }

  // Dışarıdan rotasyon hızını ayarlama
  setAutoRotate(enabled) {
    this.autoRotate = enabled;
  }
}
