const PAGES=[['index.html','Home'],['world.html','World Map'],['explorer.html','Explorer'],['learn.html','Learn'],['studio.html','Studio'],['practice.html','Practice & Games'],['progress.html','Passport']];
const GROUP={'mouth.html':'learn.html','library.html':'learn.html','flashcards.html':'practice.html','detective.html':'practice.html','game.html':'practice.html'};
const SUB={'learn.html':[['learn.html','Basics'],['mouth.html','Mouth Guide'],['library.html','Vowel Chart']],'practice.html':[['practice.html','Quizzes'],['flashcards.html','Flashcards'],['detective.html','Vowel Detective'],['game.html','Quest Game']]};
const LS='vq3',DEF=()=>({v:3,day:{date:'',ans:0,ok:0,rec:0,fc:0},q:{t:0,c:0},vow:{},scores:{},fc:{seen:{},flag:{},mast:{}},studio:{n:0,v:{}},sec:{},cases:{},badges:[]});
const isO=x=>!!x&&typeof x==='object'&&!Array.isArray(x);
function norm(o){const d=DEF();if(!isO(o))return d;
 for(const k of ['vow','scores','sec','cases'])if(isO(o[k]))d[k]=o[k];
 if(isO(o.q)){d.q.t=+o.q.t||0;d.q.c=+o.q.c||0}
 if(isO(o.fc))for(const k of ['seen','flag','mast'])if(isO(o.fc[k]))d.fc[k]=o.fc[k];
 if(isO(o.studio)){d.studio.n=+o.studio.n||0;if(isO(o.studio.v))d.studio.v=o.studio.v}
 if(isO(o.day))d.day={date:String(o.day.date||''),ans:+o.day.ans||0,ok:+o.day.ok||0,rec:+o.day.rec||0,fc:+o.day.fc||0};
 if(Array.isArray(o.badges))d.badges=o.badges.filter(x=>typeof x==='string');return d}
const legacy=o=>isO(o)?norm({q:{t:o.t,c:o.c},scores:o.s,sec:o.sec,fc:{seen:o.fc},studio:{n:o.rec},badges:o.b}):DEF();
/* One data structure (localStorage key "vq3"); the older "vq" key is migrated on first read. Data is browser/device-specific. */
const VQ={get(){try{const r=localStorage.getItem(LS);if(r)return norm(JSON.parse(r));const l=localStorage.getItem('vq');return l?legacy(JSON.parse(l)):DEF()}catch(e){return DEF()}},
 set(d){try{localStorage.setItem(LS,JSON.stringify(d));return true}catch(e){return false}},
 upd(f){const d=this.get();f(d);this.set(d)},
 save(k,s,m){this.upd(d=>{const o=isO(d.scores[k])?d.scores[k]:{best:0,max:m,plays:0};o.best=Math.max(+o.best||0,s);o.max=m;o.plays=(+o.plays||0)+1;d.scores[k]=o})},
 badge(b){this.upd(d=>{if(!d.badges.includes(b))d.badges.push(b)})},
 daily(d,k){const t=new Date().toLocaleDateString('en-CA');if(d.day.date!==t)d.day={date:t,ans:0,ok:0,rec:0,fc:0};if(k)d.day[k]++},
 rec(t,ch,ok){this.upd(d=>{this.daily(d,'ans');if(ok)d.day.ok++;d.q.t++;if(ok)d.q.c++;if(t){const v=d.vow[t]=isO(d.vow[t])?d.vow[t]:{a:0,c:0,x:{}};v.a=(+v.a||0)+1;if(ok)v.c=(+v.c||0)+1;else if(ch&&ch!==t){v.x=isO(v.x)?v.x:{};v.x[ch]=(v.x[ch]||0)+1}}})},
 mark(g,k){this.upd(d=>{d[g][k]=1})},
 reset(){try{localStorage.removeItem(LS);localStorage.removeItem('vq')}catch(e){}}};
document.querySelectorAll('details').forEach(x=>x.addEventListener('toggle',()=>{if(x.open)VQ.mark('sec',x.querySelector('summary').textContent.trim())}));
function vowelState(d){const o={};VOWELS.forEach(v=>{const x=d.vow[v.s],a=x?+x.a||0:0,c=x?+x.c||0:0,acc=a?c/a:null;o[v.s]={a,c,acc,st:(a>=2&&acc<.6)?'need':((a>=2&&acc>=.8)||d.fc.mast[v.s])?'strong':(a>0||d.fc.seen[v.s])?'learning':'new'}});return o}
function recommend(d){const st=vowelState(d),r=[],cf=(a,b)=>((d.vow[a]&&d.vow[a].x&&d.vow[a].x[b])||0)+((d.vow[b]&&d.vow[b].x&&d.vow[b].x[a])||0);
 if(d.q.t<10)r.push(['Answer at least 10 questions so your recommendations can be based on your results.','practice.html','Go to Practice Zone']);
 if(cf('ɪ','iː')>=2)r.push(['You mixed up /ɪ/ and /iː/ '+cf('ɪ','iː')+' times. Try the ship/sheep case.','detective.html','Open Case 01']);
 const di=VOWELS.filter(v=>v.type==='Diphthong'),da=di.reduce((t,v)=>t+st[v.s].a,0),dc=di.reduce((t,v)=>t+st[v.s].c,0);
 if(da>=4&&dc/da<.7)r.push(['Diphthongs are tricky so far ('+Math.round(dc/da*100)+'% correct). Review diphthong flashcards, then listen again.','flashcards.html','Diphthong flashcards']);
 let top=null;for(const t in d.vow){const x=d.vow[t].x||{};for(const c in x)if(!['ɪiː','iːɪ'].includes(t+c)&&(!top||x[c]>top[2]))top=[t,c,x[c]]}
 if(top&&top[2]>=3)r.push(['You often answer /'+top[1]+'/ when the answer is /'+top[0]+'/ ('+top[2]+' times). Compare them in the Library.','library.html','Open Vowel Library']);
 const need=VOWELS.filter(v=>st[v.s].st==='need');
 need.slice(0,3).forEach(v=>r.push(['/'+v.s+'/ needs practice ('+st[v.s].c+' of '+st[v.s].a+' correct).','flashcards.html','Review flashcards']));
 if(need.length&&!d.studio.n)r.push(['Record yourself saying a weak sound and compare it with the reference.','studio.html','Open Studio']);
 if(!r.length)r.push(['No weak sounds found. Try the Vowel Detective cases or the Game.','detective.html','Vowel Detective']);return r}
(function(){const cur=location.pathname.split('/').pop()||'index.html',c2=GROUP[cur]||cur,h=document.getElementById('site-header');
 if(h){h.innerHTML=`<a class="logo" href="index.html">✦ Vowel Quest</a><button class="menu" aria-label="Toggle menu" aria-expanded="false">☰</button><nav aria-label="Main">${PAGES.map(([u,n])=>`<a href="${u}"${u===c2?' aria-current="page"':''}>${n}</a>`).join('')}</nav>`;
 const b=h.querySelector('.menu'),n=h.querySelector('nav');b.onclick=()=>b.setAttribute('aria-expanded',n.classList.toggle('open'));if(SUB[c2])h.insertAdjacentHTML('afterend','<nav class="sub" aria-label="Section">'+SUB[c2].map(([u,t])=>`<a href="${u}"${u===cur?' aria-current="page"':''}>${t}</a>`).join('')+'</nav>')}
 const f=document.getElementById('site-footer');if(f)f.innerHTML='<p>Vowel Quest: Astral Phonetics Academy · Traditional British English (RP) model · Built for an English Phonetics (EPPP) project.<br>Browser text-to-speech is only an approximation of RP, not an authentic recording.</p>'})();
/* ---------- Audio (edit AUDIO_DIR / AUDIO_EXT to change where recordings live) ---------- */
const AUDIO_DIR='assets/audio/',AUDIO_EXT='.mp3',NOTE='Browser voice is generated by your device and is not guaranteed to be authentic RP.';let curAudio=null;const RC={};
const aurl=w=>AUDIO_DIR+encodeURIComponent(w)+AUDIO_EXT;
function stopAll(){if(curAudio){curAudio.pause();curAudio=null}if('speechSynthesis' in window)speechSynthesis.cancel()}
function probe(w){if(!RC[w])RC[w]=new Promise(res=>{const a=new Audio(),t=setTimeout(()=>res(false),4000);a.preload='metadata';a.onloadedmetadata=()=>{clearTimeout(t);res(true)};a.onerror=()=>{clearTimeout(t);res(false)};a.src=aurl(w)});return RC[w]}
async function playRec(w,st){stopAll();st.textContent='Checking for a recording…';
 if(!(await probe(w))){st.textContent='No verified recording for “'+w+'” yet. Use Browser voice (en-GB) instead.';return}
 const a=new Audio(aurl(w));curAudio=a;a.onended=()=>{st.textContent=''};a.onerror=()=>{st.textContent='The recording could not be played.'};
 try{await a.play();st.textContent='▶ Playing recording'}catch(e){st.textContent='Playback was blocked or failed. Press the button again.'}}
function speak(w,st){stopAll();st.textContent='';if(!('speechSynthesis' in window)){st.textContent='Text-to-speech is not supported in this browser.';return}
 const u=new SpeechSynthesisUtterance(w);u.lang='en-GB';u.rate=.85;const v=speechSynthesis.getVoices().find(x=>x.lang.replace('_','-')==='en-GB');
 if(v)u.voice=v;u.onstart=()=>{st.textContent=v?'🔊 Browser voice (en-GB). Not authentic RP.':'🔊 No en-GB voice found, so your default voice is used. Not authentic RP.'};
 u.onend=()=>{st.textContent=''};u.onerror=()=>{st.textContent='The browser voice could not play. Check your volume or browser settings.'};speechSynthesis.speak(u)}
function audioControls(w){const d=document.createElement('div');d.className='audio';
 d.innerHTML='<button class="btn sm alt" type="button">🎧 Recorded audio</button><button class="btn sm" type="button">🔊 Browser voice (en-GB)</button><button class="btn sm" type="button" aria-label="Stop audio">⏹ Stop</button><p class="status" role="status"></p><p class="hint">'+NOTE+'</p>';
 const [a,b,c]=d.querySelectorAll('button'),s=d.querySelector('.status');
 probe(w).then(ok=>{if(!ok){a.classList.add('na');a.textContent='🎧 Recording not available';a.setAttribute('aria-disabled','true');s.textContent='No verified recording yet. Use Browser voice (en-GB).'}});
 a.onclick=()=>playRec(w,s);b.onclick=()=>speak(w,s);c.onclick=()=>{stopAll();s.textContent=''};return d}
/* ---------- Quiz engine ---------- */
const sh=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const symOf=o=>typeof o!=='string'?null:o.startsWith('/')?o.slice(1,-1):((VOWELS.find(v=>v.w===o)||{}).s||null);
const sl=s=>'/'+s+'/';
function mk(i,c,others,n){const o=sh(others.filter(x=>x!==c)).slice(0,n-1);o.splice(i%n,0,c);return{o,a:i%n}}
const Q={
 listen:(v,i)=>({t:v.s,q:'Listen to the word. Which vowel sound does it contain?',w:v.w,...mk(i,sl(v.s),VOWELS.map(x=>sl(x.s)),4),why:`“${v.w}” contains ${sl(v.s)} (${v.type.toLowerCase()}).`}),
 sym2word:(v,i)=>({t:v.s,q:`Which word contains the vowel ${sl(v.s)}?`,...mk(i,v.w,VOWELS.map(x=>x.w),4),why:`${sl(v.s)} is the vowel in “${v.w}”.`}),
 word2sym:(v,i)=>({t:v.s,q:`Which symbol shows the vowel sound in “${v.w}”?`,...mk(i,sl(v.s),VOWELS.map(x=>sl(x.s)),4),why:`“${v.w}” has ${sl(v.s)}. ${v.exp}`}),
 cat:(v,i)=>({t:v.s,q:`Is ${sl(v.s)} (as in “${v.w}”) a monophthong or a diphthong?`,w:v.w,...mk(i,v.type,['Monophthong','Diphthong'],2),why:v.type==='Monophthong'?`${sl(v.s)} is a monophthong: its quality stays relatively steady.`:`${sl(v.s)} is a diphthong: it glides (${v.h.replace('Glide: ','')}) within one syllable.`}),
 diph:(v,i)=>({t:v.s,q:'Which word contains a diphthong (a vowel glide)?',...mk(i,v.w,VOWELS.filter(x=>x.type==='Monophthong').map(x=>x.w),4),why:`“${v.w}” has the diphthong ${sl(v.s)}, which glides. The other words have steady monophthongs.`}),
 clisten:(v,i)=>({t:v.s,q:`Listen. Which symbol shows the ${v.pos} consonant sound in this word?`,w:v.w,...mk(i,sl(v.s),CONS.map(x=>sl(x.s)),4),why:`“${v.w}” has ${sl(v.s)} (${v.voice} ${v.place} ${v.manner}).`}),
 cclass:(v,i)=>{const ds=x=>`${x.voice} ${x.place} ${x.manner}`;return{t:v.s,q:`Which description fits ${sl(v.s)} as in “${v.w}”?`,w:v.w,...mk(i,ds(v),CONS.map(ds),4),why:`${sl(v.s)} is ${ds(v)}. ${v.tip}`}},
 pair:(p,i)=>{const k=Math.random()<.5?0:1,w=p[k],ow=p[1-k];return{t:p[4+k],alt:p[5-k],q:'Listen. Which word did you hear?',w,...mk(i,w,[ow],2),why:`You heard “${w}” /${p[2+k]}/. Its partner “${ow}” /${p[3-k]}/ differs only in the vowel, so the meaning changes.`}}};
function quiz(el,build,key,o={}){let qs,i,score,tries,missed=[],retry=false;
 const start=()=>{qs=build();missed=[];retry=false;i=0;score=0;show()};
 function show(){const q=qs[i];tries=0;stopAll();el.innerHTML='';
  const m=document.createElement('p');m.className='meta';m.textContent=`Question ${i+1} of ${qs.length} · Score: ${score}`;
  const bar=document.createElement('div');bar.className='bar';bar.innerHTML=`<span style="width:${i/qs.length*100}%"></span>`;
  const h=document.createElement('h3');h.textContent=q.q;el.append(m,bar,h);if(q.clue){const cl=document.createElement('p');cl.className='note';cl.textContent='🔎 Clue: '+q.clue;el.append(cl)}if(q.w)el.append(audioControls(q.w));
  const g=document.createElement('div');g.className='opts';
  const fb=document.createElement('p');fb.className='fb';fb.setAttribute('role','status');
  const nx=document.createElement('button');nx.className='btn';nx.hidden=true;nx.textContent=i+1<qs.length?'Next question':'See results';
  nx.onclick=()=>{i++;i<qs.length?show():end()};
  q.o.forEach((t,k)=>{const b=document.createElement('button');b.className='opt ipa';b.textContent=t;
   b.onclick=()=>{tries++;if(tries===1&&!retry){VQ.rec(q.t,k===q.a?null:(q.alt||symOf(q.o[k])),k===q.a);if(k!==q.a)missed.push(q)}if(k===q.a){b.classList.add('ok');if(tries===1)score+=10;fb.className='fb good';
    fb.textContent=(tries===1?'✔ Correct! +10 points. ':'✔ Correct! (No points on a retry.) ')+q.why;[...g.children].forEach(x=>x.disabled=true);nx.hidden=false;nx.focus()}
    else{b.classList.add('bad');b.disabled=true;fb.className='fb badfb';fb.textContent='✘ Not quite. Listen or think again, then try another answer.'}};g.append(b)});
  el.append(g,fb,nx)}
 function end(){const max=qs.length*10;if(!retry)VQ.save(key,score,max);const msg=(o.end&&!retry)?o.end(score,max):'';
  el.innerHTML=`<div class="result"><h3>Finished!</h3><p class="big">${score} / ${max}</p><p>${score===max?'Perfect score! Excellent listening.':score>=max*.6?'Well done, you are making good progress.':'Good effort. Review the Vowel Library, then try again.'}</p><p>${msg}</p></div>`;
  const r=document.createElement('button');r.className='btn';r.textContent='Play again';r.onclick=start;el.append(r);
  if(missed.length&&!retry){const rb=document.createElement('button');rb.className='btn alt';rb.textContent='Retry '+missed.length+' missed question'+(missed.length>1?'s':'');rb.onclick=()=>{qs=missed.slice();missed=[];retry=true;i=0;score=0;show()};el.append(rb)}
  if(o.back){const b=document.createElement('button');b.className='btn alt';b.textContent='Back to levels';b.onclick=o.back;el.append(b)}}
 start()}

/* ---------- Sound collection, EXP, quests (all derived from saved answers and activities) ---------- */
const collected=(d,s)=>!!(d.vow[s]&&+d.vow[s].c>=2);
const TITLES=['Star Cadet','Moon Scout','Sound Seeker','Aether Adept','Vowel Knight','Astral Scholar','Phonetic Sage'];
function expOf(d){const n=SOUNDS.filter(v=>collected(d,v.s)).length,cs=['case1','case2','case3','case4'].filter(k=>d.cases[k]).length;
 return d.q.c*10+n*20+cs*40+Math.min(d.studio.n,10)*15+Object.keys(d.fc.mast).length*10}
function lvl(e){const L=Math.floor(e/150)+1;return{L,t:TITLES[Math.min(L-1,TITLES.length-1)],into:e%150,next:150}}
function chibi(hair,acc,sz){sz=sz||56;return `<svg width="${sz}" height="${sz}" viewBox="0 0 64 64" role="img" aria-hidden="true"><circle cx="32" cy="36" r="20" fill="#FFE2CC"/><path d="M10 36C8 14 56 14 54 36C48 24 16 24 10 36Z" fill="${hair}"/><circle cx="25" cy="38" r="3" fill="#11152C"/><circle cx="39" cy="38" r="3" fill="#11152C"/><path d="M28 46Q32 49 36 46" stroke="#c4624f" fill="none" stroke-width="2"/><path d="M32 3l3 7h7l-6 4 2 7-6-4-6 4 2-7-6-4h7z" fill="${acc}"/></svg>`}
const echo=sz=>`<svg class="echo" width="${sz||90}" height="${sz||90}" viewBox="0 0 90 90" role="img" aria-label="Echo, the floating mascot"><defs><radialGradient id="eg"><stop offset="0" stop-color="#bdf2ee"/><stop offset="1" stop-color="#73D6D0"/></radialGradient></defs><circle cx="45" cy="48" r="30" fill="url(#eg)"/><circle cx="35" cy="46" r="4" fill="#11152C"/><circle cx="55" cy="46" r="4" fill="#11152C"/><path d="M38 58Q45 63 52 58" stroke="#11152C" stroke-width="3" fill="none"/><path d="M45 6l4 9h9l-7 6 3 9-9-6-9 6 3-9-7-6h9z" fill="#EBCB87"/></svg>`;
function expBlock(d){const e=expOf(d),l=lvl(e);return `<div class="card" style="display:flex;gap:14px;align-items:center">${chibi('#EBCB87','#73D6D0',64)}<div style="flex:1"><h2 style="margin:0">Explorer Lv ${l.L} · ${l.t}</h2><p style="margin:0">Sound EXP: ${e} (next level in ${l.next-l.into})</p><div class="pbar" role="progressbar" aria-valuenow="${l.into}" aria-valuemin="0" aria-valuemax="150"><span style="width:${l.into/1.5}%"></span></div><p class="hint">EXP comes from correct first-try answers, collected sounds (2 correct answers each), solved cases, Studio recordings (up to 10) and mastered flashcards.</p></div></div>`}
function questBlock(d){const y=d.day.date===new Date().toLocaleDateString('en-CA')?d.day:{ans:0,ok:0,rec:0,fc:0},Qs=[['Answer 10 quiz questions',y.ans,10],['Get 7 answers right first try',y.ok,7],['Record 1 pronunciation',y.rec,1],['Master 1 flashcard',y.fc,1]];
 return `<div class="card y"><h2>Daily quests</h2>${Qs.map(q=>`<p>${q[1]>=q[2]?'✅':'⬜'} ${q[0]} (${Math.min(q[1],q[2])}/${q[2]})</p>`).join('')}<p class="hint">Quests reset each day on this device.</p></div>`}
function worldStat(d,w){const l=w.list(),n=l.filter(v=>collected(d,v.s)).length;return{n,t:l.length,done:n===l.length}}
