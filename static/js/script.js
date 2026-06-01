/* ========================================
   JARINGANKU SARANA NUSANTARA
   ======================================== */

// ★★★ EDIT BAGIAN INI SAJA ★★★
var DEV_CONFIG = {
    portfolioUrl: 'https://muhamadjhuhan.github.io/Portofolio_Digital/',
    name: 'Muhamad Jhuhan',
    role: 'Full-Stack Web Developer',
    bio: 'Pengembang web yang bersemangat menciptakan solusi digital elegan dan fungsional.',
    photo: '../static/image/jhuhan.png',
    Gmail: 'jhuhanvino625@gmail.com',
    github: 'https://github.com/MuhamadJhuhan',
    linkedin: 'https://linkedin.com/in/muhamad-jhuhan',
    instagram: 'https://instagram.com/jhuhan_',
    skills: [
        { name: 'HTML', level: 'Advanced' },
        { name: 'CSS', level: 'Advanced' },
        { name: 'JavaScript', level: 'Advanced' },
        { name: 'PHP', level: 'Advanced' },
        { name: 'MySQL', level: 'Advanced' },
        { name: 'Figma', level: 'Advanced' }
    ],
    stats: [
        { value: '2+', label: 'Proyek Selesai' },
        { value: '1+', label: 'Klien Puas' },
        { value: '2+', label: 'Tahun Pengalaman' },
    ],
    techStack: ['HTML','CSS','JavaScript','PHP','MySQL','Git','Figma']
};

var paketData = {
    rumah: [
        {id:'r1',name:'Paket 1',speed:'10',speedLabel:'10 Mbps',quota:'Unlimited',price:150000,features:['WiFi Router Single Band','Instalasi Gratis','Streaming 720p','2 Perangkat']},
        {id:'r2',name:'Paket 2',speed:'20',speedLabel:'20 Mbps',quota:'Unlimited',price:200000,features:['WiFi Router Single Band','Instalasi Gratis','Streaming 1080p','3 Perangkat']},
        {id:'r3',name:'Paket 3',speed:'30',speedLabel:'30 Mbps',quota:'Unlimited',price:275000,features:['WiFi Router Dual Band','Instalasi Gratis','Streaming 1080p','5 Perangkat','Free 1 Bulan'],popular:true},
        {id:'r4',name:'Paket 4',speed:'50',speedLabel:'50 Mbps',quota:'Unlimited',price:375000,features:['WiFi Router Dual Band','Instalasi Gratis','Streaming 4K','8 Perangkat','Free 1 Bulan']},
        {id:'r5',name:'Paket 5',speed:'100',speedLabel:'100 Mbps',quota:'Unlimited',price:550000,features:['WiFi Router Gaming','Instalasi Gratis','Streaming 4K+','Unlimited Perangkat','Priority Support','Free 2 Bulan']}
    ],
    bisnis: [
        {id:'b1',name:'Bisnis 1',speed:'20',speedLabel:'20 Mbps',quota:'Unlimited',price:350000,features:['1 Static IP','SLA 99.5%','Support Prioritas','Router Bisnis']},
        {id:'b2',name:'Bisnis 2',speed:'50',speedLabel:'50 Mbps',quota:'Unlimited',price:550000,features:['1 Static IP','SLA 99.7%','Support 24/7','Dedicated Bandwidth']},
        {id:'b3',name:'Bisnis 3',speed:'100',speedLabel:'100 Mbps',quota:'Unlimited',price:850000,features:['2 Static IP','SLA 99.9%','Support 24/7','Dedicated Bandwidth','Backup Connection'],popular:true},
        {id:'b4',name:'Bisnis 4',speed:'200',speedLabel:'200 Mbps',quota:'Unlimited',price:1500000,features:['4 Static IP','SLA 99.95%','Account Manager','Dedicated Bandwidth','Custom Config']},
        {id:'b5',name:'Bisnis 5',speed:'500',speedLabel:'500 Mbps',quota:'Unlimited',price:2500000,features:['8 Static IP','SLA 99.99%','Account Manager','Full Dedicated','Redundansi Ganda','Custom Config']}
    ]
};

var layananMap = {pasang:'Pasang WiFi Baru',tambah:'Tambah Paket',perbaikan:'Perbaikan Jaringan',enterprise:'Paket Enterprise',pindah:'Pindah Alamat',cctv:'Pasang CCTV'};
var selectedPaket = null;
var currentFilter = 'rumah';
var orders = JSON.parse(localStorage.getItem('jaringanku_orders') || '[]');

// ========== DEV PAGE ==========
function renderDevPage() {
    var c = DEV_CONFIG;
    function setText(id, val) { var el = document.getElementById(id); if (el) el.textContent = val; }
    function setHref(id, val) { var el = document.getElementById(id); if (el && val) el.href = val; }

    setText('dev-name', c.name);
    setText('dev-role', c.role);
    setText('dev-bio', c.bio);
    setHref('dev-portfolio-link', c.portfolioUrl);
    setHref('dev-portfolio-cta', c.portfolioUrl);
    setHref('dev-open-portfolio', c.portfolioUrl);
    setHref('btn-open-portfolio', c.portfolioUrl);
    setHref('dev-github-link', c.github);
    setHref('dev-linkedin-link', c.linkedin);
    setHref('dev-instagram-link', c.instagram);
    setHref('dev-email-link', 'mailto:' + c.Gmail);
    setHref('dev-email-cta', 'mailto:' + c.Gmail);

    // ★★★ MEMUAT FOTO PROFIL ★★★
    var photoEl = document.getElementById('dev-photo');
    if (photoEl && c.photo) {
        photoEl.src = c.photo;
        console.log('📸 Foto dimuat dari: ' + c.photo);
    } else {
        console.warn('⚠️ dev-photo tidak ditemukan atau photo kosong');
    }

    var skillsEl = document.getElementById('dev-skills');
    if (skillsEl) skillsEl.innerHTML = c.skills.map(function(s) { return '<div class="glass-panel rounded-xl p-4 text-center"><div class="text-lg font-bold mb-1">' + s.name + '</div><div class="text-[10px] uppercase tracking-widest text-white/30">' + s.level + '</div></div>'; }).join('');

    var statsEl = document.getElementById('dev-stats');
    if (statsEl) statsEl.innerHTML = c.stats.map(function(s) { return '<div><div class="text-3xl md:text-4xl font-bold">' + s.value + '</div><div class="text-[10px] uppercase tracking-widest text-white/30 mt-1">' + s.label + '</div></div>'; }).join('');

    var techEl = document.getElementById('dev-techstack');
    if (techEl) techEl.innerHTML = c.techStack.map(function(t) { return '<span class="glass-panel rounded-lg px-4 py-2 text-xs text-white/50">' + t + '</span>'; }).join('');

    var btnShow = document.getElementById('btn-preview-show');
    var btnHide = document.getElementById('btn-preview-hide');
    var preview = document.getElementById('portfolio-preview-container');
    var iframe = document.getElementById('portfolio-iframe');

    if (btnShow) btnShow.onclick = function() { iframe.src = c.portfolioUrl; preview.classList.remove('hidden'); btnShow.classList.add('hidden'); btnHide.classList.remove('hidden'); };
    if (btnHide) btnHide.onclick = function() { iframe.src = ''; preview.classList.add('hidden'); btnHide.classList.add('hidden'); btnShow.classList.remove('hidden'); };
}

// ========== NAVIGATION ==========
function navigateTo(page) {
    if (page === 'status') { document.getElementById('page-status').classList.add('active'); return; }
    document.getElementById('page-status').classList.remove('active');
    document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });
    document.querySelectorAll('.nav-item').forEach(function(n) { n.classList.remove('active'); n.classList.add('text-white/40'); });
    var target = document.getElementById('page-' + page);
    if (target) target.classList.add('active');
    var navBtn = document.querySelector('.nav-item[data-page="' + page + '"]');
    if (navBtn) { navBtn.classList.add('active'); navBtn.classList.remove('text-white/40'); }
    if (page === 'pesanan') updateOrderSummary();
    if (page === 'pengembang') renderDevPage();
}

// ========== MOBILE MENU ==========
function toggleMobileMenu() {
    var m = document.getElementById('mobile-menu');
    if (m.classList.contains('mobile-menu-visible')) { m.classList.remove('mobile-menu-visible'); m.classList.add('mobile-menu-hidden'); }
    else { m.classList.remove('mobile-menu-hidden'); m.classList.add('mobile-menu-visible'); }
}

// ========== PARTICLES ==========
function createParticles() {
    var c = document.getElementById('particles');
    for (var i = 0; i < 40; i++) {
        var p = document.createElement('div'); p.className = 'particle';
        p.style.left = Math.random()*100+'%'; p.style.bottom = '-10px';
        p.style.animationDuration = (10+Math.random()*20)+'s'; p.style.animationDelay = (Math.random()*15)+'s';
        var s = (1+Math.random()*2)+'px'; p.style.width = s; p.style.height = s;
        c.appendChild(p);
    }
}

// ========== PAKET ==========
function renderPaket() {
    var grid = document.getElementById('paket-grid');
    var pakets = paketData[currentFilter];
    grid.innerHTML = pakets.map(function(p) {
        var sel = selectedPaket && selectedPaket.id === p.id;
        var pop = p.popular ? '<div class="popular-badge">Populer</div>' : '';
        var feats = p.features.map(function(f) { return '<div class="feature-item"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg><span>'+f+'</span></div>'; }).join('');
        var cat = currentFilter==='rumah'?'Residential':'Business';
        var hrg = 'Rp'+p.price.toLocaleString('id-ID');
        return '<div class="package-card glass-panel rounded-2xl p-5 relative '+(sel?'selected':'')+'" data-pid="'+p.id+'">'+pop+'<div class="tier-label">'+cat+'</div><h3 class="font-semibold text-base mb-3">'+p.name+'</h3><div class="speed-badge mb-1"><span class="speed-number">'+p.speed+'</span><span class="speed-unit">Mbps</span></div><div class="text-[10px] text-white/20 uppercase tracking-widest mb-4">'+p.quota+'</div><div class="w-full h-px bg-white/5 mb-4"></div><div class="flex items-baseline gap-1 mb-4"><span class="text-lg font-bold">'+hrg+'</span><span class="text-[10px] text-white/25">/bulan</span></div><div class="feature-list">'+feats+'</div></div>';
    }).join('');
    grid.querySelectorAll('.package-card').forEach(function(c) { c.addEventListener('click', function() { selectPaket(this.getAttribute('data-pid')); }); });
}

function filterPaket(f) {
    currentFilter = f;
    document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); b.classList.add('text-white/40'); });
    var btn = document.querySelector('.filter-btn[data-filter="'+f+'"]');
    if (btn) { btn.classList.add('active'); btn.classList.remove('text-white/40'); }
    renderPaket();
}

function selectPaket(id) {
    var all = paketData.rumah.concat(paketData.bisnis);
    selectedPaket = all.find(function(p) { return p.id === id; });
    document.getElementById('btn-order').disabled = false;
    renderPaket();
    showToast('Paket dipilih: '+selectedPaket.name+' ('+selectedPaket.speedLabel+')','check-circle');
}

function selectService(type) { navigateTo('pesanan'); setTimeout(function(){document.getElementById('f-layanan').value=layananMap[type]||''},150); }

// ========== ORDER ==========
function goToOrder() { if(!selectedPaket){showToast('Pilih paket dulu','alert-circle');return} navigateTo('pesanan'); }

function updateOrderSummary() {
    var bar = document.getElementById('order-summary-bar');
    if(selectedPaket){bar.classList.remove('hidden');document.getElementById('summary-paket').textContent=selectedPaket.name+' — '+selectedPaket.speedLabel;document.getElementById('summary-harga').textContent='Rp'+selectedPaket.price.toLocaleString('id-ID')+'/bulan'}else{bar.classList.add('hidden')}
}

function submitOrder(e) {
    e.preventDefault();
    var nama=document.getElementById('f-nama').value,wa=document.getElementById('f-wa').value,alamat=document.getElementById('f-alamat').value,layanan=document.getElementById('f-layanan').value,idP=document.getElementById('f-id').value,tgl=document.getElementById('f-tanggal').value,cat=document.getElementById('f-catatan').value;
    if(!selectedPaket&&layanan==='Pasang WiFi Baru'){showToast('Pilih paket dulu','alert-circle');navigateTo('paket');return}
    var oid='JSN-'+Date.now().toString().slice(-5);
    var order={id:oid,nama:nama,wa:wa,alamat:alamat,layanan:layanan,idPelanggan:idP,tanggal:tgl,catatan:cat,paket:selectedPaket?selectedPaket.name:'-',speed:selectedPaket?selectedPaket.speedLabel:'-',harga:selectedPaket?selectedPaket.price:0,status:'menunggu',createdAt:new Date().toISOString()};
    orders.push(order);localStorage.setItem('jaringanku_orders',JSON.stringify(orders));
    document.getElementById('order-form').reset();selectedPaket=null;document.getElementById('btn-order').disabled=true;
    document.getElementById('modal-title').textContent='Pesanan Berhasil!';
    document.getElementById('modal-msg').textContent='Pesanan #'+oid+' diterima. Tim kami hubungi via WhatsApp 1x24 jam.';
    document.getElementById('modal').classList.add('show');
    setupStatusPage(order);
}

function closeModal(){document.getElementById('modal').classList.remove('show');navigateTo('status')}
function closeStatus(){document.getElementById('page-status').classList.remove('active');navigateTo('beranda')}

function setupStatusPage(o) {
    document.getElementById('status-order-id').textContent='Order #'+o.id;
    document.getElementById('step1-time').textContent=new Date().toLocaleString('id-ID');
    document.getElementById('status-detail').innerHTML='<h3 class="font-semibold mb-4">Detail Pesanan</h3><div class="grid grid-cols-2 gap-3 text-sm"><div class="text-white/40">Nama</div><div>'+o.nama+'</div><div class="text-white/40">Layanan</div><div>'+o.layanan+'</div><div class="text-white/40">Paket</div><div>'+o.paket+' ('+o.speed+')</div><div class="text-white/40">Harga</div><div>Rp'+o.harga.toLocaleString('id-ID')+'/bulan</div><div class="text-white/40">Alamat</div><div>'+o.alamat+'</div><div class="text-white/40">WhatsApp</div><div>'+o.wa+'</div>'+(o.tanggal?'<div class="text-white/40">Jadwal</div><div>'+new Date(o.tanggal).toLocaleDateString('id-ID')+'</div>':'')+'</div>';
}

function sendMessage(e){e.preventDefault();showToast('Pesan terkirim!','check-circle');e.target.reset()}

// ========== TOAST ==========
function showToast(msg,icon) {
    icon=icon||'check-circle';
    var t=document.getElementById('toast');
    document.getElementById('toast-msg').textContent=msg;
    document.getElementById('toast-icon').setAttribute('data-lucide',icon);
    lucide.createIcons();t.classList.add('show');
    setTimeout(function(){t.classList.remove('show')},3000);
}

// ========== STATUS SIM ==========
function simStatus() {
    if(!orders.length)return;var l=orders[orders.length-1];
    if(l.status==='menunggu'){l.status='konfirmasi';var d=document.getElementById('step2-dot');d.classList.add('done');d.classList.remove('current');document.getElementById('step2-line').classList.add('done');document.getElementById('step2-label').className='font-medium text-sm';document.getElementById('step2-time').textContent=new Date().toLocaleString('id-ID');document.getElementById('status-text').textContent='Dikonfirmasi';showToast('Dikonfirmasi!','check-circle')}
    else if(l.status==='konfirmasi'){l.status='instalasi';document.getElementById('step3-dot').classList.add('done');document.getElementById('step3-line').classList.add('done');document.getElementById('step3-label').className='font-medium text-sm';document.getElementById('step3-time').textContent=new Date().toLocaleString('id-ID');document.getElementById('status-text').textContent='Proses Instalasi';showToast('Instalasi dimulai!','loader')}
    else if(l.status==='instalasi'){l.status='selesai';document.getElementById('step4-dot').classList.add('done');document.getElementById('step4-label').className='font-medium text-sm';document.getElementById('step4-time').textContent=new Date().toLocaleString('id-ID');document.getElementById('status-text').textContent='Aktif ✓';var ind=document.getElementById('status-indicator');ind.classList.remove('pulse-ring','bg-yellow-400');ind.classList.add('bg-green-400');showToast('Internet aktif!','check-circle')}
    localStorage.setItem('jaringanku_orders',JSON.stringify(orders));
}

// ========== EVENTS ==========
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    createParticles();
    renderPaket();

    document.getElementById('logo-btn').addEventListener('click',function(){navigateTo('beranda')});
    document.querySelectorAll('.nav-item').forEach(function(b){b.addEventListener('click',function(){navigateTo(this.getAttribute('data-page'))})});
    document.querySelectorAll('.mobile-nav-btn').forEach(function(b){b.addEventListener('click',function(){navigateTo(this.getAttribute('data-page'));toggleMobileMenu()})});
    document.getElementById('mobile-menu-btn').addEventListener('click',toggleMobileMenu);
    document.getElementById('mobile-menu-close').addEventListener('click',toggleMobileMenu);

    document.getElementById('btn-pesan').addEventListener('click',function(){navigateTo('paket')});
    document.getElementById('btn-layanan').addEventListener('click',function(){navigateTo('layanan')});

    document.querySelectorAll('.service-card').forEach(function(c){c.addEventListener('click',function(){selectService(this.getAttribute('data-service'))})});

    document.querySelectorAll('.filter-btn').forEach(function(b){b.addEventListener('click',function(){filterPaket(this.getAttribute('data-filter'))})});
    document.getElementById('btn-order').addEventListener('click',goToOrder);
    document.getElementById('btn-ganti').addEventListener('click',function(){navigateTo('paket')});

    document.getElementById('order-form').addEventListener('submit',submitOrder);
    document.getElementById('btn-kembali').addEventListener('click',function(){navigateTo('paket')});

    document.getElementById('contact-form').addEventListener('submit',sendMessage);

    document.getElementById('btn-modal-close').addEventListener('click',closeModal);
    document.getElementById('btn-back').addEventListener('click',closeStatus);

    if(orders.length>0)setupStatusPage(orders[orders.length-1]);
    setInterval(simStatus,10000);
});