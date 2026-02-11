document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('keydown', event => {
if (event.ctrlKey && (event.key === 'c' || event.key === 'C' || event.key === 'u' || event.key === 'U' || event.key === 's' || event.key === 'S' || event.key === 'p' || event.key === 'P')) event.preventDefault();
});
const allRecitersSource = [
{ id: 'shatri', name: 'أبو بكر الشاطري', url: 'https://server11.mp3quran.net/shatri/' },
{ id: 'ajm', name: 'أحمد العجمي', url: 'https://server10.mp3quran.net/ajm/' },
{ id: 'husr', name: 'الحصري', url: 'https://server13.mp3quran.net/husr/' },
{ id: 'minsh', name: 'المنشاوي', url: 'https://server10.mp3quran.net/minsh/' },
{ id: 'basit', name: 'عبد الباسط عبد الصمد', url: 'https://server7.mp3quran.net/basit/' },
{ id: 'sds', name: 'عبد الرحمن السديس', url: 'https://server11.mp3quran.net/sds/' },
{ id: 'jhn', name: 'عبدالله عواد الجهني', url: 'https://server13.mp3quran.net/jhn/' },
{ id: 'a_jbr', name: 'علي جابر', url: 'https://server11.mp3quran.net/a_jbr/' },
{ id: 'frs_a', name: 'فارس عباد', url: 'https://server8.mp3quran.net/frs_a/' },
{ id: 'maher', name: 'ماهر المعيقلي', url: 'https://server12.mp3quran.net/maher/' },
{ id: 'ayyub', name: 'محمد أيوب', url: 'https://server8.mp3quran.net/ayyub/' },
{ id: 'lhdan', name: 'محمد اللحيدان', url: 'https://server8.mp3quran.net/lhdan/' },
{ id: 'afs', name: 'مشاري العفاسي', url: 'https://server8.mp3quran.net/afs/' },
{ id: 'qtm', name: 'ناصر القطامي', url: 'https://server6.mp3quran.net/qtm/' },
{ id: 'namh', name: 'نعمة الحسان', url: 'https://server8.mp3quran.net/namh/' },
{ id: 's_gmd', name: 'سعد الغامدي', url: 'https://server7.mp3quran.net/s_gmd/' },
{ id: 'shur', name: 'سعود الشريم', url: 'https://server7.mp3quran.net/shur/' },
{ id: 'yasser', name: 'ياسر الدوسري', url: 'https://server11.mp3quran.net/yasser/' },
{ id: 'kurdi', name: 'رعد محمد الكردي', url: 'https://server6.mp3quran.net/kurdi/' },
{ id: 'bsfr', name: 'عبدالله بصفر', url: 'https://server6.mp3quran.net/bsfr/' }
];
const surahNames = [
"الفاتحة", "البقرة", "آل عمران", "النساء", "المائدة", "الأنعام", "الأعراف", "الأنفال", "التوبة", "يونس",
"هود", "يوسف", "الرعد", "إبراهيم", "الحجر", "النحل", "الإسراء", "الكهف", "مريم", "طه",
"الأنبياء", "الحج", "المؤمنون", "النور", "الفرقان", "الشعراء", "النمل", "القصص", "العنكبوت", "الروم",
"لقمان", "السجدة", "الأحزاب", "سبأ", "فاطر", "يس", "الصافات", "ص", "الزمر", "غافر",
"فصلت", "الشورى", "الزخرف", "الدخان", "الجاثية", "الأحقاف", "محمد", "الفتح", "الحجرات", "ق",
"الذاريات", "الطور", "النجم", "القمر", "الرحمن", "الواقعة", "الحديد", "المجادلة", "الخشر", "الممتحنة",
"الصف", "الجمعة", "المنافقون", "التغابن", "الطلاق", "التحريم", "الملك", "القلم", "الخاقة", "المعارج",
"نوح", "الجن", "المزمل", "المدثر", "القيامة", "الإنسان", "المرسلات", "النبأ", "النازعات", "عبس",
"التكوير", "الانفطار", "المطففين", "الانشقاق", "البروج", "الطارق", "الأعلى", "الغاشية", "الفجر", "البلد",
"الشمس", "الليل", "الضحى", "الشرح", "التين", "العلق", "القدر", "البينة", "الزلزلة", "العاديات",
"القارعة", "التكاثر", "العصر", "الهمزة", "الفيل", "قريش", "الماعون", "الكوثر", "الكافرون", "النصر",
"المسد", "الإخلاص", "الفلق", "الناس"
];
let reciters = [];
let currentReciterIndex = 0;
let currentSurahIndex = -1;
let isDragging = false;
let isFullPlayerOpen = false;
let pendingResumeState = null;
const audio = document.getElementById('audioPlayer');
const miniPlayer = document.getElementById('miniPlayer');
const miniSurahName = document.getElementById('miniSurahName');
const miniPlayIcon = document.getElementById('miniPlayIcon');
const miniPauseIcon = document.getElementById('miniPauseIcon');
const miniLoadingSpinner = document.getElementById('miniLoadingSpinner');
const fullPlayerModal = document.getElementById('fullPlayerModal');
const fpSurahName = document.getElementById('fpSurahName');
const fpReciterName = document.getElementById('fpReciterName');
const playBtn = document.getElementById('playBtn');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
const loadingSpinner = document.getElementById('loadingSpinner');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const btnComfort = document.getElementById('btnComfort');
const btnAutoPlay = document.getElementById('btnAutoPlay');
const listeningStatsEl = document.getElementById('listeningStats');
const surahListContainer = document.getElementById('surahList');
const selectedReciterText = document.getElementById('selectedReciterText');
const reciterTriggerBtn = document.getElementById('reciterTriggerBtn');
const reciterModal = document.getElementById('reciterModal');
const modalReciterList = document.getElementById('modalReciterList');
const closeModalBtn = document.getElementById('closeModalBtn');
const initLoader = document.getElementById('initLoader');
const surahSearchInput = document.getElementById('surahSearch');
const infoModal = document.getElementById('infoModal');
const smartResumePopup = document.getElementById('smartResumePopup');
const srSurah = document.getElementById('srSurah');
const srReciter = document.getElementById('srReciter');
const srTimeDisplay = document.getElementById('srTimeDisplay');
const shortcutsModal = document.getElementById('shortcutsModal');
let isComfortMode = false;
let isAutoPlay = false;
let audioContext = null;
let audioSource = null;
let compressorNode = null;
let gainNode = null;
let lastTimeUpdate = 0;
window.openFullPlayer = function() {
fullPlayerModal.classList.add('active');
document.body.classList.add('no-scroll');
isFullPlayerOpen = true;
}
window.closeFullPlayer = function() {
fullPlayerModal.classList.remove('active');
document.body.classList.remove('no-scroll');
isFullPlayerOpen = false;
}
async function initializeApp() {
reciters = allRecitersSource;
const savedReciterId = localStorage.getItem('quran_reciter_id');
let foundIndex = reciters.findIndex(r => r.id === savedReciterId);
if (foundIndex === -1) foundIndex = 0;
currentReciterIndex = foundIndex;
isComfortMode = localStorage.getItem('quran_comfort') === 'true';
isAutoPlay = localStorage.getItem('quran_autoplay') === 'true';
updateUIState();
renderSurahs();
updateReciterUI(currentReciterIndex);
updateListeningStatsDisplay();
checkSmartResume();
initLoader.classList.add('hidden');
}
function checkSmartResume() {
const saved = localStorage.getItem('quran_playback_state');
if (!saved) return;
try {
const state = JSON.parse(saved);
if (
typeof state.time === "number" &&
state.time > 10 &&
state.surahIndex >= 0 &&
state.surahIndex < surahNames.length &&
reciters.find(r => r.id === state.reciterId)
) {
pendingResumeState = state;
srSurah.textContent = "سورة " + surahNames[state.surahIndex];
const reciterObj = reciters.find(r => r.id === state.reciterId);
srReciter.textContent = reciterObj.name;
srTimeDisplay.textContent = formatTime(state.time);
requestAnimationFrame(() => {
smartResumePopup.classList.add('visible');
});
}
} catch(e) {
console.error("Smart Resume Error:", e);
}
}
window.confirmSmartResume = function() {
if (!pendingResumeState) return;
smartResumePopup.classList.remove('visible');
const recIndex = reciters.findIndex(r => r.id === pendingResumeState.reciterId);
if (recIndex === -1) return;
currentReciterIndex = recIndex;
updateReciterUI(currentReciterIndex);
currentSurahIndex = pendingResumeState.surahIndex;
const url = getAudioUrl(currentReciterIndex, currentSurahIndex);
audio.src = url;
audio.addEventListener('loadedmetadata', function once() {
audio.currentTime = pendingResumeState.time;
if (!audioContext) initAudioContext();
audio.play();
audio.removeEventListener('loadedmetadata', once);
});
updatePlayerInfo();
highlightActiveSurah();
}
window.dismissSmartResume = function() {
smartResumePopup.classList.remove('visible');
pendingResumeState = null;
}
document.addEventListener('keydown', (e) => {
if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
switch(e.code) {
case 'Space':
e.preventDefault();
togglePlay();
break;
case 'ArrowRight':
e.preventDefault();
if(audio.duration) audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
break;
case 'ArrowLeft':
e.preventDefault();
if(audio.duration) audio.currentTime = Math.max(0, audio.currentTime - 5);
break;
case 'ArrowUp':
e.preventDefault();
audio.volume = Math.min(1, audio.volume + 0.05);
break;
case 'ArrowDown':
e.preventDefault();
audio.volume = Math.max(0, audio.volume - 0.05);
break;
case 'KeyM':
audio.muted = !audio.muted;
break;
case 'KeyN':
let n = currentSurahIndex + 1;
if(n >= surahNames.length) n = 0;
playTrack(n, true, 0);
break;
case 'KeyB':
let p = currentSurahIndex - 1;
if(p < 0) p = surahNames.length - 1;
playTrack(p, true, 0);
break;
}
});
window.openShortcutsModal = function() {
shortcutsModal.classList.add('active');
}
window.closeShortcutsModal = function() {
shortcutsModal.classList.remove('active');
}
shortcutsModal.addEventListener('click', (e) => { if(e.target === shortcutsModal) closeShortcutsModal(); });
function savePlaybackState() {
if (currentSurahIndex === -1) return;
const state = {
reciterId: reciters[currentReciterIndex].id,
surahIndex: currentSurahIndex,
time: audio.currentTime
};
localStorage.setItem('quran_playback_state', JSON.stringify(state));
}
function initAudioContext() {
if (!audioContext) {
try {
const AudioContext = window.AudioContext || window.webkitAudioContext;
audioContext = new AudioContext();
audioSource = audioContext.createMediaElementSource(audio);
compressorNode = audioContext.createDynamicsCompressor();
gainNode = audioContext.createGain();
audioSource.connect(compressorNode);
compressorNode.connect(gainNode);
gainNode.connect(audioContext.destination);
applyComfortSettings();
} catch (e) { console.log("Audio Context Init:", e); }
} else if (audioContext.state === 'suspended') { audioContext.resume(); }
}
function applyComfortSettings() {
if (!compressorNode || !gainNode) return;
if (isComfortMode) {
compressorNode.threshold.value = -24; compressorNode.knee.value = 30;
compressorNode.ratio.value = 12; compressorNode.attack.value = 0.003;
compressorNode.release.value = 0.25; gainNode.gain.value = 1.4;
} else {
compressorNode.threshold.value = 0; compressorNode.ratio.value = 1; gainNode.gain.value = 1;
}
}
function toggleComfort() {
isComfortMode = !isComfortMode;
localStorage.setItem('quran_comfort', isComfortMode);
if (!audioContext) initAudioContext(); else applyComfortSettings();
updateUIState();
}
function toggleAutoPlay() {
isAutoPlay = !isAutoPlay;
localStorage.setItem('quran_autoplay', isAutoPlay);
updateUIState();
}
function updateUIState() {
if(isComfortMode) btnComfort.classList.add('active'); else btnComfort.classList.remove('active');
if(isAutoPlay) btnAutoPlay.classList.add('active'); else btnAutoPlay.classList.remove('active');
}
function updateListeningStats() {
const now = Date.now();
if (now - lastTimeUpdate > 1000) {
const today = new Date().toLocaleDateString('en-CA');
let stats = JSON.parse(localStorage.getItem('quran_stats') || '{"date": "", "today": 0}');
if (stats.date !== today) { stats.date = today; stats.today = 0; }
stats.today += 1;
localStorage.setItem('quran_stats', JSON.stringify(stats));
lastTimeUpdate = now;
updateListeningStatsDisplay(stats);
}
}
function updateListeningStatsDisplay(stats) {
if (!stats) stats = JSON.parse(localStorage.getItem('quran_stats') || '{"today": 0}');
const mins = Math.floor(stats.today / 60);
listeningStatsEl.textContent = `وقت الاستماع اليوم: ${mins} دقيقة`;
}
function getAudioUrl(reciterIdx, surahIdx) {
const baseUrl = reciters[reciterIdx].url;
const surahPad = String(surahIdx + 1).padStart(3, '0');
return `${baseUrl}${surahPad}.mp3`;
}
function changeReciter(newIndex) {
if (currentReciterIndex === newIndex) return;
currentReciterIndex = newIndex;
localStorage.setItem('quran_reciter_id', reciters[currentReciterIndex].id);
audio.pause();
audio.currentTime = 0;
if (currentSurahIndex !== -1) {
const url = getAudioUrl(currentReciterIndex, currentSurahIndex);
audio.src = url;
updatePlayerInfo();
}
updateReciterUI(newIndex);
renderSurahs();
}
function playTrack(index, autoPlay = true, startTime = 0) {
if (index < 0 || index >= surahNames.length) return;
const isSameSurah = (currentSurahIndex === index);
currentSurahIndex = index;
localStorage.setItem('quran_reciter_id', reciters[currentReciterIndex].id);
const url = getAudioUrl(currentReciterIndex, currentSurahIndex);
if (audio.src !== url) {
audio.src = url;
audio.currentTime = startTime;
} else {
if (!isSameSurah) audio.currentTime = startTime;
}
updatePlayerInfo();
highlightActiveSurah();
if (autoPlay) {
setLoadingState(true);
if (!audioContext) initAudioContext();
const playPromise = audio.play();
if (playPromise !== undefined) {
playPromise.then(() => {
setPlayingState(true);
savePlaybackState();
})
.catch(err => {
setPlayingState(false);
console.error("Playback prevented", err);
});
}
}
}
function renderSurahs() {
surahListContainer.innerHTML = '';
const fragment = document.createDocumentFragment();
surahNames.forEach((name, index) => {
const li = document.createElement('li');
li.className = 'surah-item';
li.dataset.name = name;
li.dataset.id = index + 1;
const audioUrl = getAudioUrl(currentReciterIndex, index);
const fileName = `سورة-${name.replace(/\s+/g, '_')}-${reciters[currentReciterIndex].name.replace(/\s+/g, '_')}.mp3`;
li.innerHTML = `
<div class="item-right">
<span class="surah-num">${index + 1}</span>
<span class="surah-name">سورة ${name}</span>
</div>
<div class="item-actions">
<button class="btn-download" title="تحميل" onclick="downloadWithProgress(event, '${audioUrl}', '${fileName}')">
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
</button>
</div>
`;
li.onclick = (e) => {
if (!e.target.closest('.btn-download')) playTrack(index, true, 0);
};
fragment.appendChild(li);
});
surahListContainer.appendChild(fragment);
highlightActiveSurah();
}
function updateReciterUI(index) {
if (reciters[index]) {
selectedReciterText.textContent = reciters[index].name;
fpReciterName.textContent = reciters[index].name;
}
}
function updatePlayerInfo() {
if (currentSurahIndex !== -1 && reciters[currentReciterIndex]) {
const text = `سورة ${surahNames[currentSurahIndex]}`;
miniSurahName.textContent = text;
fpSurahName.textContent = text;
fpReciterName.textContent = reciters[currentReciterIndex].name;
if ('mediaSession' in navigator) {
navigator.mediaSession.metadata = new MediaMetadata({
title: text, artist: reciters[currentReciterIndex].name, album: 'القرآن الكريم'
});
}
}
}
function highlightActiveSurah() {
document.querySelectorAll('.surah-item').forEach(el => el.classList.remove('active'));
const items = Array.from(surahListContainer.children);
const activeItem = items.find(item => parseInt(item.querySelector('.surah-num').textContent) === currentSurahIndex + 1);
if (activeItem) activeItem.classList.add('active');
}
function populateReciterModal() {
modalReciterList.innerHTML = '';
const fragment = document.createDocumentFragment();
reciters.forEach((r, index) => {
const div = document.createElement('div');
div.className = 'modal-list-item';
div.dataset.name = r.name;
if (index === currentReciterIndex) div.classList.add('selected');
div.innerHTML = `<span>${r.name}</span>`;
div.onclick = () => { changeReciter(index); closeReciterModal(); };
fragment.appendChild(div);
});
modalReciterList.appendChild(fragment);
}
function openReciterModal() { populateReciterModal(); reciterModal.classList.add('active'); document.body.classList.add('no-scroll'); }
function closeReciterModal() { reciterModal.classList.remove('active'); document.body.classList.remove('no-scroll'); }
window.openInfoModal = () => { infoModal.classList.add('active'); document.body.classList.add('no-scroll'); }
window.closeInfoModal = () => { infoModal.classList.remove('active'); document.body.classList.remove('no-scroll'); }
reciterTriggerBtn.addEventListener('click', openReciterModal);
closeModalBtn.addEventListener('click', closeReciterModal);
reciterModal.addEventListener('click', (e) => { if (e.target === reciterModal) closeReciterModal(); });
infoModal.addEventListener('click', (e) => { if(e.target === infoModal) closeInfoModal(); });
btnComfort.addEventListener('click', toggleComfort);
btnAutoPlay.addEventListener('click', toggleAutoPlay);
surahSearchInput.addEventListener('input', (e) => {
const q = e.target.value.trim();
document.querySelectorAll('.surah-item').forEach(item => {
if (q === '' || item.dataset.name.includes(q) || item.dataset.id === q) item.classList.remove('hidden');
else item.classList.add('hidden');
});
});
async function downloadWithProgress(event, url, filename) {
event.preventDefault(); event.stopPropagation();
const btn = event.currentTarget;
if(btn.dataset.downloading === "true") return;
btn.dataset.downloading = "true"; const originalContent = btn.innerHTML;
try {
const response = await fetch(url);
if (!response.ok) throw new Error(response.status);
const total = parseInt(response.headers.get('content-length'), 10) || 0;
let loaded = 0; const reader = response.body.getReader(); const chunks = [];
while (true) {
const { done, value } = await reader.read(); if (done) break;
chunks.push(value); loaded += value.length;
btn.innerHTML = total > 0 ? `<span style="font-size:10px;font-weight:700;">${Math.round((loaded/total)*100)}%</span>` : `<div class="progress-spinner"></div>`;
}
const blob = new Blob(chunks); const blobUrl = window.URL.createObjectURL(blob);
const a = document.createElement('a'); a.style.display = 'none'; a.href = blobUrl; a.download = filename;
document.body.appendChild(a); a.click(); window.URL.revokeObjectURL(blobUrl); document.body.removeChild(a);
} catch (error) { window.open(url, '_blank'); }
finally { btn.innerHTML = originalContent; btn.dataset.downloading = "false"; }
}
function setPlayingState(playing) {
loadingSpinner.style.display = 'none';
miniLoadingSpinner.style.display = 'none';
if (playing) {
playIcon.style.display = 'none'; pauseIcon.style.display = 'block';
miniPlayIcon.style.display = 'none'; miniPauseIcon.style.display = 'block';
} else {
playIcon.style.display = 'block'; pauseIcon.style.display = 'none';
miniPlayIcon.style.display = 'block'; miniPauseIcon.style.display = 'none';
}
}
function setLoadingState(loading) {
if (loading) {
playIcon.style.display = 'none'; pauseIcon.style.display = 'none';
loadingSpinner.style.display = 'inline-block';
miniPlayIcon.style.display = 'none'; miniPauseIcon.style.display = 'none';
miniLoadingSpinner.style.display = 'inline-block';
}
}
window.togglePlay = function() {
if (currentSurahIndex === -1) { playTrack(0, true, 0); return; }
if (audio.paused) {
if (!audioContext) initAudioContext();
audio.play().then(() => setPlayingState(true)).catch(() => setPlayingState(false));
} else {
audio.pause();
savePlaybackState();
setPlayingState(false);
}
}
function formatTime(seconds) {
if (isNaN(seconds)) return "00:00";
const min = Math.floor(seconds / 60); const sec = Math.floor(seconds % 60);
return `${min}:${sec < 10 ? '0' + sec : sec}`;
}
playBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', () => { let n = currentSurahIndex + 1; if (n >= surahNames.length) n = 0; playTrack(n, true, 0); });
prevBtn.addEventListener('click', () => { let p = currentSurahIndex - 1; if (p < 0) p = surahNames.length - 1; playTrack(p, true, 0); });
audio.addEventListener('timeupdate', () => {
if (!isDragging) {
const percent = (audio.currentTime / audio.duration) * 100;
const val = isNaN(percent) ? 0 : percent;
progressBar.value = val;
progressBar.style.setProperty('--progress', val + '%');
currentTimeEl.textContent = formatTime(audio.currentTime);
}
if (!audio.paused) updateListeningStats();
});
document.addEventListener("visibilitychange", () => {
if (document.visibilityState === 'hidden') savePlaybackState();
});
audio.addEventListener('loadedmetadata', () => {
durationEl.textContent = formatTime(audio.duration);
setLoadingState(false);
});
audio.addEventListener('waiting', () => setLoadingState(true));
audio.addEventListener('playing', () => setPlayingState(true));
audio.addEventListener('pause', () => setPlayingState(false));
audio.addEventListener('ended', () => {
if (isAutoPlay) {
let n = currentSurahIndex + 1;
if (n < surahNames.length) playTrack(n, true, 0);
} else { setPlayingState(false); }
});
progressBar.addEventListener('mousedown', () => isDragging = true);
progressBar.addEventListener('touchstart', () => isDragging = true);
progressBar.addEventListener('change', () => {
isDragging = false;
audio.currentTime = (progressBar.value / 100) * audio.duration;
savePlaybackState();
});
progressBar.addEventListener('input', () => {
const val = progressBar.value;
progressBar.style.setProperty('--progress', val + '%');
currentTimeEl.textContent = formatTime((val / 100) * audio.duration);
});
initializeApp();
if ('serviceWorker' in navigator) { window.addEventListener('load', () => { navigator.serviceWorker.register('service-worker.js'); }); }