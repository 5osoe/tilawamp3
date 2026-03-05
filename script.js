const AUDIO_SERVERS = [
    "https://server12.mp3quran.net/",
    "https://server8.mp3quran.net/",
    "https://server6.mp3quran.net/",
    "https://server13.mp3quran.net/",
    "https://server11.mp3quran.net/",
    "https://server10.mp3quran.net/",
    "https://server7.mp3quran.net/",
    "https://server16.mp3quran.net/"
];
const SERVER_STORAGE_KEY = "preferred_audio_server";
const allRecitersSource = [
    { id:'shatri', name:'أبو بكر الشاطري',        path:'shatri/',  server:null, availableSurahs:null },
    { id:'ajm',    name:'أحمد العجمي',             path:'ajm/',     server:null, availableSurahs:null },
    { id:'nufais', name:'أحمد النفيس',             path:'nufais/Rewayat-Hafs-A-n-Assem/', server:'https://server16.mp3quran.net/', availableSurahs:null },
    { id:'husr',   name:'الحصري',                  path:'husr/',    server:null, availableSurahs:null },
    { id:'minsh',  name:'المنشاوي',                path:'minsh/',   server:null, availableSurahs:null },
    { id:'basit',  name:'عبد الباسط عبد الصمد',   path:'basit/',   server:null, availableSurahs:null },
    { id:'sds',    name:'عبد الرحمن السديس',       path:'sds/',     server:null, availableSurahs:null },
    { id:'jhn',    name:'عبدالله عواد الجهني',     path:'jhn/',     server:null, availableSurahs:null },
    { id:'a_jbr',  name:'علي جابر',                path:'a_jbr/',   server:null, availableSurahs:null },
    { id:'frs_a',  name:'فارس عباد',               path:'frs_a/',   server:null, availableSurahs:null },
    { id:'maher',  name:'ماهر المعيقلي',           path:'maher/',   server:null, availableSurahs:null },
    { id:'ayyub',  name:'محمد أيوب',               path:'ayyub/',   server:null, availableSurahs:null },
    { id:'lhdan',  name:'محمد اللحيدان',           path:'lhdan/',   server:null, availableSurahs:null },
    { id:'afs',    name:'مشاري العفاسي',           path:'afs/',     server:null, availableSurahs:null },
    { id:'qtm',    name:'ناصر القطامي',            path:'qtm/',     server:null, availableSurahs:null },
    { id:'s_gmd',  name:'سعد الغامدي',             path:'s_gmd/',   server:null, availableSurahs:null },
    { id:'shur',   name:'سعود الشريم',             path:'shur/',    server:null, availableSurahs:null },
    { id:'yasser', name:'ياسر الدوسري',            path:'yasser/',  server:null, availableSurahs:null },
    { id:'kurdi',  name:'رعد محمد الكردي',         path:'kurdi/',   server:null, availableSurahs:null },
    { id:'bsfr',   name:'عبدالله بصفر',            path:'bsfr/',    server:null, availableSurahs:null },
    { id:'hazza',  name:'هزاع البلوشي',            path:'hazza/',   server:'https://server11.mp3quran.net/', availableSurahs:[1,6,13,14,15,18,19,20,25,29,30,31,32,34,35,36,37,38,39,40,41,42,44,47,49,50,51,52,53,54,55,56,57,61,63,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114] },
    { id:'bader',  name:'بدر التركي',              path:'bader/',   server:null, availableSurahs:null },
    { id:'islam',  name:'إسلام صبحي',              path:'islam/',   server:null, availableSurahs:null }
];
const surahNames = [
    "الفاتحة","البقرة","آل عمران","النساء","المائدة","الأنعام","الأعراف","الأنفال","التوبة","يونس",
    "هود","يوسف","الرعد","إبراهيم","الحجر","النحل","الإسراء","الكهف","مريم","طه",
    "الأنبياء","الحج","المؤمنون","النور","الفرقان","الشعراء","النمل","القصص","العنكبوت","الروم",
    "لقمان","السجدة","الأحزاب","سبأ","فاطر","يس","الصافات","ص","الزمر","غافر",
    "فصلت","الشورى","الزخرف","الدخان","الجاثية","الأحقاف","محمد","الفتح","الحجرات","ق",
    "الذاريات","الطور","النجم","القمر","الرحمن","الواقعة","الحديد","المجادلة","الحشر","الممتحنة",
    "الصف","الجمعة","المنافقون","التغابن","الطلاق","التحريم","الملك","القلم","الحاقة","المعارج",
    "نوح","الجن","المزمل","المدثر","القيامة","الإنسان","المرسلات","النبأ","النازعات","عبس",
    "التكوير","الانفطار","المطففين","الانشقاق","البروج","الطارق","الأعلى","الغاشية","الفجر","البلد",
    "الشمس","الليل","الضحى","الشرح","التين","العلق","القدر","البينة","الزلزلة","العاديات",
    "القارعة","التكاثر","العصر","الهمزة","الفيل","قريش","الماعون","الكوثر","الكافرون","النصر",
    "المسد","الإخلاص","الفلق","الناس"
];
let reciters=[],currentReciterIndex=0,currentSurahIndex=-1,isDragging=false,isFullPlayerOpen=false,deferredInstallPrompt=null;
const audio=document.getElementById('audioPlayer');
const miniPlayer=document.getElementById('miniPlayer');
const miniSurahName=document.getElementById('miniSurahName');
const miniPlayIcon=document.getElementById('miniPlayIcon');
const miniPauseIcon=document.getElementById('miniPauseIcon');
const miniLoadingSpinner=document.getElementById('miniLoadingSpinner');
const fullPlayerModal=document.getElementById('fullPlayerModal');
const fpSurahName=document.getElementById('fpSurahName');
const fpReciterName=document.getElementById('fpReciterName');
const playBtn=document.getElementById('playBtn');
const playIcon=document.getElementById('playIcon');
const pauseIcon=document.getElementById('pauseIcon');
const loadingSpinner=document.getElementById('loadingSpinner');
const nextBtn=document.getElementById('nextBtn');
const prevBtn=document.getElementById('prevBtn');
const progressBar=document.getElementById('progressBar');
const currentTimeEl=document.getElementById('currentTime');
const durationEl=document.getElementById('duration');
const btnComfort=document.getElementById('btnComfort');
const btnAutoPlay=document.getElementById('btnAutoPlay');
const listeningStatsEl=document.getElementById('listeningStats');
const surahListContainer=document.getElementById('surahList');
const selectedReciterText=document.getElementById('selectedReciterText');
const reciterTriggerBtn=document.getElementById('reciterTriggerBtn');
const reciterModal=document.getElementById('reciterModal');
const modalReciterList=document.getElementById('modalReciterList');
const closeModalBtn=document.getElementById('closeModalBtn');
const initLoader=document.getElementById('initLoader');
const surahSearchInput=document.getElementById('surahSearch');
const infoModal=document.getElementById('infoModal');
const shortcutsModal=document.getElementById('shortcutsModal');
const sidebarOverlay=document.getElementById('sidebarOverlay');
const sidebar=document.getElementById('sidebar');
const menuBtn=document.getElementById('menuBtn');
const closeSidebarBtn=document.getElementById('closeSidebarBtn');
const installBtn=document.getElementById('installAppBtn');
let isComfortMode=false,isAutoPlay=false,isDarkMode=false;
let audioContext=null,audioSource=null,compressorNode=null,gainNode=null,lastTimeUpdate=0;

window.openFullPlayer=function(){fullPlayerModal.classList.add('active');document.body.style.overflow='hidden';isFullPlayerOpen=true;}
window.closeFullPlayer=function(){fullPlayerModal.classList.remove('active');document.body.style.overflow='';isFullPlayerOpen=false;}

function openSidebar(){sidebar.classList.add('active');sidebarOverlay.classList.add('active');document.body.style.overflow='hidden';}
function closeSidebar(){sidebar.classList.remove('active');sidebarOverlay.classList.remove('active');document.body.style.overflow='';}
menuBtn.addEventListener('click',openSidebar);
closeSidebarBtn.addEventListener('click',closeSidebar);
sidebarOverlay.addEventListener('click',closeSidebar);
document.getElementById('sidebarInfoBtn').addEventListener('click',()=>{closeSidebar();setTimeout(()=>openInfoModal(),150);});
document.getElementById('sidebarDarkBtn').addEventListener('click',()=>{toggleDarkMode();});
installBtn.addEventListener('click',async()=>{
    if(deferredInstallPrompt){
        deferredInstallPrompt.prompt();
        const{outcome}=await deferredInstallPrompt.userChoice;
        if(outcome==='accepted'){deferredInstallPrompt=null;installBtn.style.display='none';}
    }else{showInstallGuide();}
});
window.addEventListener('beforeinstallprompt',(e)=>{e.preventDefault();deferredInstallPrompt=e;installBtn.style.display='flex';});
window.addEventListener('appinstalled',()=>{deferredInstallPrompt=null;installBtn.style.display='none';});

function showInstallGuide(){
    const isIOS=/iphone|ipad|ipod/i.test(navigator.userAgent);
    const msg=isIOS?'لتثبيت التطبيق على iOS: اضغط زر المشاركة ثم "إضافة إلى الشاشة الرئيسية"':'يمكنك تثبيت الموقع من قائمة المتصفح (إضافة إلى الشاشة الرئيسية).';
    showToast(msg,4000);
}

function toggleDarkMode(){
    isDarkMode=!isDarkMode;
    localStorage.setItem('quran_dark',isDarkMode);
    applyDarkMode();
    const label=document.querySelector('#sidebarDarkBtn .sidebar-item-label');
    if(label)label.textContent=isDarkMode?'الوضع النهاري':'الوضع الليلي';
}
function applyDarkMode(){
    if(isDarkMode)document.documentElement.setAttribute('data-theme','dark');
    else document.documentElement.removeAttribute('data-theme');
}

function showToast(msg,duration=2500){
    let t=document.getElementById('toastMsg');
    if(!t){t=document.createElement('div');t.id='toastMsg';document.body.appendChild(t);}
    t.textContent=msg;t.classList.add('visible');
    clearTimeout(t._timer);t._timer=setTimeout(()=>t.classList.remove('visible'),duration);
}

async function findWorkingServer(reciterPath,paddedSurah,fixedServer){
    if(fixedServer)return fixedServer+reciterPath+paddedSurah+".mp3";
    const preferred=localStorage.getItem(SERVER_STORAGE_KEY);
    const generalServers=AUDIO_SERVERS.filter(s=>s!=='https://server16.mp3quran.net/');
    let serversToTest=[...generalServers];
    if(preferred&&generalServers.includes(preferred))serversToTest=[preferred,...generalServers.filter(s=>s!==preferred)];
    const controller=new AbortController();
    const timeout=setTimeout(()=>controller.abort(),4000);
    try{
        const checks=serversToTest.map(server=>{
            const url=server+reciterPath+paddedSurah+".mp3";
            return fetch(url,{method:"GET",headers:{"Range":"bytes=0-1"},signal:controller.signal})
                .then(res=>(res.ok||res.status===206)?{ok:true,server,url}:null)
                .catch(()=>null);
        });
        const results=await Promise.all(checks);
        const valid=results.find(r=>r&&r.ok);
        if(valid){localStorage.setItem(SERVER_STORAGE_KEY,valid.server);return valid.url;}
        return "https://server8.mp3quran.net/"+reciterPath+paddedSurah+".mp3";
    }catch(e){return "https://server8.mp3quran.net/"+reciterPath+paddedSurah+".mp3";}
    finally{clearTimeout(timeout);}
}

async function initializeApp(){
    reciters=allRecitersSource;
    const savedId=localStorage.getItem('quran_reciter_id');
    let idx=reciters.findIndex(r=>r.id===savedId);
    if(idx===-1)idx=0;
    currentReciterIndex=idx;
    isComfortMode=localStorage.getItem('quran_comfort')==='true';
    isAutoPlay=localStorage.getItem('quran_autoplay')==='true';
    isDarkMode=localStorage.getItem('quran_dark')==='true';
    applyDarkMode();
    updateUIState();
    renderSurahs();
    updateReciterUI(currentReciterIndex);
    updateListeningStatsDisplay();
    const label=document.querySelector('#sidebarDarkBtn .sidebar-item-label');
    if(label)label.textContent=isDarkMode?'الوضع النهاري':'الوضع الليلي';
    initLoader.classList.add('hidden');
}

document.addEventListener('keydown',(e)=>{
    if(['INPUT','TEXTAREA'].includes(document.activeElement.tagName))return;
    switch(e.code){
        case'Space':e.preventDefault();togglePlay();break;
        case'ArrowRight':e.preventDefault();if(audio.duration)audio.currentTime=Math.min(audio.duration,audio.currentTime+5);break;
        case'ArrowLeft':e.preventDefault();if(audio.duration)audio.currentTime=Math.max(0,audio.currentTime-5);break;
        case'ArrowUp':e.preventDefault();audio.volume=Math.min(1,audio.volume+0.05);break;
        case'ArrowDown':e.preventDefault();audio.volume=Math.max(0,audio.volume-0.05);break;
        case'KeyM':audio.muted=!audio.muted;break;
        case'KeyN':{let n=currentSurahIndex+1;if(n>=surahNames.length)n=0;playTrack(n,true,0);break;}
        case'KeyB':{let p=currentSurahIndex-1;if(p<0)p=surahNames.length-1;playTrack(p,true,0);break;}
    }
});

window.openShortcutsModal=function(){shortcutsModal.classList.add('active');document.body.style.overflow='hidden';}
window.closeShortcutsModal=function(){shortcutsModal.classList.remove('active');document.body.style.overflow='';}
shortcutsModal.addEventListener('click',(e)=>{if(e.target===shortcutsModal)closeShortcutsModal();});

function savePlaybackState(){
    if(currentSurahIndex===-1)return;
    localStorage.setItem('quran_playback_state',JSON.stringify({reciterId:reciters[currentReciterIndex].id,surahIndex:currentSurahIndex,time:audio.currentTime}));
}

function initAudioContext(){
    if(!audioContext){
        try{
            const AC=window.AudioContext||window.webkitAudioContext;
            audioContext=new AC();
            audioSource=audioContext.createMediaElementSource(audio);
            compressorNode=audioContext.createDynamicsCompressor();
            gainNode=audioContext.createGain();
            audioSource.connect(compressorNode);compressorNode.connect(gainNode);gainNode.connect(audioContext.destination);
            applyComfortSettings();
        }catch(e){}
    }else if(audioContext.state==='suspended')audioContext.resume();
}

function applyComfortSettings(){
    if(!compressorNode||!gainNode)return;
    if(isComfortMode){compressorNode.threshold.value=-24;compressorNode.knee.value=30;compressorNode.ratio.value=12;compressorNode.attack.value=0.003;compressorNode.release.value=0.25;gainNode.gain.value=1.4;}
    else{compressorNode.threshold.value=0;compressorNode.ratio.value=1;gainNode.gain.value=1;}
}
function toggleComfort(){isComfortMode=!isComfortMode;localStorage.setItem('quran_comfort',isComfortMode);if(!audioContext)initAudioContext();else applyComfortSettings();updateUIState();}
function toggleAutoPlay(){isAutoPlay=!isAutoPlay;localStorage.setItem('quran_autoplay',isAutoPlay);updateUIState();}
function updateUIState(){btnComfort.classList.toggle('active',isComfortMode);btnAutoPlay.classList.toggle('active',isAutoPlay);}

function updateListeningStats(){
    const now=Date.now();
    if(now-lastTimeUpdate>1000){
        const today=new Date().toLocaleDateString('en-CA');
        let stats=JSON.parse(localStorage.getItem('quran_stats')||'{"date":"","today":0}');
        if(stats.date!==today){stats.date=today;stats.today=0;}
        stats.today+=1;localStorage.setItem('quran_stats',JSON.stringify(stats));
        lastTimeUpdate=now;updateListeningStatsDisplay(stats);
    }
}
function updateListeningStatsDisplay(stats){
    if(!stats)stats=JSON.parse(localStorage.getItem('quran_stats')||'{"today":0}');
    listeningStatsEl.textContent=`وقت الاستماع اليوم: ${Math.floor(stats.today/60)} دقيقة`;
}

function getAudioUrl(reciterIdx,surahIdx){
    const reciter=reciters[reciterIdx];
    const padded=String(surahIdx+1).padStart(3,'0');
    if(reciter.server)return reciter.server+reciter.path+padded+".mp3";
    const stored=localStorage.getItem(SERVER_STORAGE_KEY);
    const generalServers=AUDIO_SERVERS.filter(s=>s!=='https://server16.mp3quran.net/');
    const server=stored&&generalServers.includes(stored)?stored:AUDIO_SERVERS[0];
    return server+reciter.path+padded+".mp3";
}
function isSurahAvailable(reciterIdx,surahIdx){
    const reciter=reciters[reciterIdx];
    if(!reciter.availableSurahs)return true;
    return reciter.availableSurahs.includes(surahIdx+1);
}

function changeReciter(newIndex){
    if(currentReciterIndex===newIndex)return;
    currentReciterIndex=newIndex;
    localStorage.setItem('quran_reciter_id',reciters[currentReciterIndex].id);
    audio.pause();audio.currentTime=0;
    updateReciterUI(newIndex);renderSurahs();updatePlayerInfo();
}

async function playTrack(index,autoPlay=true,startTime=0){
    if(!audio)return;
    if(index<0||index>=surahNames.length)return;
    if(!isSurahAvailable(currentReciterIndex,index)){showToast('هذه السورة غير متاحة لهذا القارئ');return;}
    const isSameSurah=(currentSurahIndex===index);
    currentSurahIndex=index;
    localStorage.setItem('quran_reciter_id',reciters[currentReciterIndex].id);
    updatePlayerInfo();highlightActiveSurah();setLoadingState(true);
    try{
        const padded=String(currentSurahIndex+1).padStart(3,"0");
        const reciter=reciters[currentReciterIndex];
        const url=await findWorkingServer(reciter.path,padded,reciter.server);
        if(audio.src!==url){audio.src=url;audio.currentTime=startTime;}
        else if(!isSameSurah)audio.currentTime=startTime;
        if(autoPlay){
            if(!audioContext)initAudioContext();
            const p=audio.play();
            if(p!==undefined)p.then(()=>{setPlayingState(true);savePlaybackState();}).catch(()=>setPlayingState(false));
        }
    }catch(err){setPlayingState(false);}
}

function renderSurahs(){
    surahListContainer.innerHTML='';
    const fragment=document.createDocumentFragment();
    surahNames.forEach((name,index)=>{
        const li=document.createElement('li');
        li.className='surah-item';
        li.dataset.name=name;li.dataset.id=index+1;
        const available=isSurahAvailable(currentReciterIndex,index);
        if(!available)li.classList.add('unavailable');
        const audioUrl=getAudioUrl(currentReciterIndex,index);
        const fileName=`سورة-${name.replace(/\s+/g,'_')}-${reciters[currentReciterIndex].name.replace(/\s+/g,'_')}.mp3`;
        li.innerHTML=`
            <div class="item-right">
                <span class="surah-num">${index+1}</span>
                <span class="surah-name">سورة ${name}</span>
            </div>
            <div class="item-actions">
                ${available
                    ?`<button class="btn-download" title="تحميل" onclick="downloadWithProgress(event,'${audioUrl}','${fileName}')"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg></button>`
                    :`<span class="unavailable-badge">غير متاح</span>`
                }
            </div>`;
        li.onclick=(e)=>{if(!e.target.closest('.btn-download')&&!e.target.closest('.unavailable-badge'))playTrack(index,true,0);};
        fragment.appendChild(li);
    });
    surahListContainer.appendChild(fragment);
    highlightActiveSurah();
}

function updateReciterUI(index){
    if(reciters[index]){selectedReciterText.textContent=reciters[index].name;fpReciterName.textContent=reciters[index].name;}
}
function updatePlayerInfo(){
    if(currentSurahIndex!==-1&&reciters[currentReciterIndex]){
        const text=`سورة ${surahNames[currentSurahIndex]}`;
        miniSurahName.textContent=text;fpSurahName.textContent=text;fpReciterName.textContent=reciters[currentReciterIndex].name;
        if('mediaSession' in navigator)navigator.mediaSession.metadata=new MediaMetadata({title:text,artist:reciters[currentReciterIndex].name,album:'القرآن الكريم'});
    }
}
function highlightActiveSurah(){
    document.querySelectorAll('.surah-item').forEach(el=>el.classList.remove('active'));
    const items=Array.from(surahListContainer.children);
    const activeItem=items.find(item=>parseInt(item.querySelector('.surah-num').textContent)===currentSurahIndex+1);
    if(activeItem){activeItem.classList.add('active');activeItem.scrollIntoView({behavior:'smooth',block:'nearest'});}
}

function populateReciterModal(){
    modalReciterList.innerHTML='';
    const fragment=document.createDocumentFragment();
    reciters.forEach((r,index)=>{
        const div=document.createElement('div');
        div.className='modal-list-item';
        div.dataset.name=r.name;
        if(index===currentReciterIndex)div.classList.add('selected');
        div.innerHTML=`<span>${r.name}</span>${r.availableSurahs?'<span class="reciter-partial-badge">83 سورة</span>':''}`;
        div.onclick=()=>{changeReciter(index);closeReciterModal();};
        fragment.appendChild(div);
    });
    modalReciterList.appendChild(fragment);
}

function openReciterModal(){populateReciterModal();reciterModal.classList.add('active');document.body.style.overflow='hidden';}
function closeReciterModal(){reciterModal.classList.remove('active');document.body.style.overflow='';}
window.openInfoModal=()=>{infoModal.classList.add('active');document.body.style.overflow='hidden';}
window.closeInfoModal=()=>{infoModal.classList.remove('active');document.body.style.overflow='';}

reciterTriggerBtn.addEventListener('click',openReciterModal);
closeModalBtn.addEventListener('click',closeReciterModal);
reciterModal.addEventListener('click',(e)=>{if(e.target===reciterModal)closeReciterModal();});
infoModal.addEventListener('click',(e)=>{if(e.target===infoModal)closeInfoModal();});
btnComfort.addEventListener('click',toggleComfort);
btnAutoPlay.addEventListener('click',toggleAutoPlay);
surahSearchInput.addEventListener('input',(e)=>{
    const q=e.target.value.trim();
    document.querySelectorAll('.surah-item').forEach(item=>{
        const match=q===''||item.dataset.name.includes(q)||item.dataset.id===q;
        item.classList.toggle('hidden',!match);
    });
});

async function downloadWithProgress(event,url,filename){
    event.preventDefault();event.stopPropagation();
    const btn=event.currentTarget;
    if(btn.dataset.downloading==="true")return;
    btn.dataset.downloading="true";const orig=btn.innerHTML;
    try{
        const response=await fetch(url,{method:"GET",headers:{Range:"bytes=0-"}});
        if(!response.ok)throw new Error(response.status);
        const total=parseInt(response.headers.get('content-length'),10)||0;
        let loaded=0;const reader=response.body.getReader();const chunks=[];
        while(true){const{done,value}=await reader.read();if(done)break;chunks.push(value);loaded+=value.length;
            btn.innerHTML=total>0?`<span style="font-size:10px;font-weight:700;">${Math.round((loaded/total)*100)}%</span>`:`<div class="progress-spinner"></div>`;}
        const blob=new Blob(chunks);const blobUrl=window.URL.createObjectURL(blob);
        const a=document.createElement('a');a.style.display='none';a.href=blobUrl;a.download=filename;
        document.body.appendChild(a);a.click();window.URL.revokeObjectURL(blobUrl);document.body.removeChild(a);
    }catch(error){window.open(url,'_blank');}
    finally{btn.innerHTML=orig;btn.dataset.downloading="false";}
}

function setPlayingState(playing){
    loadingSpinner.style.display='none';miniLoadingSpinner.style.display='none';
    playIcon.style.display=playing?'none':'block';pauseIcon.style.display=playing?'block':'none';
    miniPlayIcon.style.display=playing?'none':'block';miniPauseIcon.style.display=playing?'block':'none';
}
function setLoadingState(loading){
    if(loading){playIcon.style.display='none';pauseIcon.style.display='none';loadingSpinner.style.display='inline-block';
        miniPlayIcon.style.display='none';miniPauseIcon.style.display='none';miniLoadingSpinner.style.display='inline-block';}
}

window.togglePlay=function(){
    if(currentSurahIndex===-1){playTrack(0,true,0);return;}
    if(audio.paused){if(!audioContext)initAudioContext();audio.play().then(()=>setPlayingState(true)).catch(()=>setPlayingState(false));}
    else{audio.pause();savePlaybackState();setPlayingState(false);}
}
function skipToNextAvailable(from,dir){
    let n=from;
    for(let i=0;i<surahNames.length;i++){
        n=(n+dir+surahNames.length)%surahNames.length;
        if(isSurahAvailable(currentReciterIndex,n))return n;
    }
    return from;
}
function formatTime(s){if(isNaN(s))return"00:00";const m=Math.floor(s/60),sc=Math.floor(s%60);return`${m}:${sc<10?'0'+sc:sc}`;}

playBtn.addEventListener('click',togglePlay);
nextBtn.addEventListener('click',()=>{const n=skipToNextAvailable(currentSurahIndex,1);playTrack(n,true,0);});
prevBtn.addEventListener('click',()=>{const p=skipToNextAvailable(currentSurahIndex,-1);playTrack(p,true,0);});

audio.addEventListener('timeupdate',()=>{
    if(!isDragging){const pct=(audio.currentTime/audio.duration)*100;const val=isNaN(pct)?0:pct;progressBar.value=val;progressBar.style.setProperty('--progress',val+'%');currentTimeEl.textContent=formatTime(audio.currentTime);}
    if(!audio.paused)updateListeningStats();
});
document.addEventListener("visibilitychange",()=>{if(document.visibilityState==='hidden')savePlaybackState();});
audio.addEventListener('loadedmetadata',()=>{durationEl.textContent=formatTime(audio.duration);setLoadingState(false);});
audio.addEventListener('waiting',()=>setLoadingState(true));
audio.addEventListener('playing',()=>setPlayingState(true));
audio.addEventListener('pause',()=>setPlayingState(false));
audio.addEventListener('ended',()=>{
    if(isAutoPlay){const n=skipToNextAvailable(currentSurahIndex,1);if(n!==currentSurahIndex)playTrack(n,true,0);else setPlayingState(false);}
    else setPlayingState(false);
});
progressBar.addEventListener('mousedown',()=>isDragging=true);
progressBar.addEventListener('touchstart',()=>isDragging=true);
progressBar.addEventListener('change',()=>{isDragging=false;audio.currentTime=(progressBar.value/100)*audio.duration;savePlaybackState();});
progressBar.addEventListener('input',()=>{const val=progressBar.value;progressBar.style.setProperty('--progress',val+'%');currentTimeEl.textContent=formatTime((val/100)*audio.duration);});

initializeApp();
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('service-worker.js'));
