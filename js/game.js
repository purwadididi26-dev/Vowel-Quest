const LV=[
 {k:'L1',n:'Level 1: Sound Detective',e:'🕵️',b:'Sound Detective',d:'Identify IPA symbols and match them with example words.',f:()=>sh(VOWELS).slice(0,5).map((v,i)=>i%2?Q.sym2word(v,i):Q.word2sym(v,i))},
 {k:'L2',n:'Level 2: Listen Closely',e:'👂',b:'Close Listener',d:'Listen to each word and identify its vowel sound.',f:()=>sh(VOWELS).slice(0,5).map((v,i)=>Q.listen(v,i))},
 {k:'L3',n:'Level 3: Minimal Pair Mystery',e:'🧩',b:'Pair Solver',d:'Hear which word of a minimal pair was spoken.',f:()=>sh(PAIRS).slice(0,5).map((p,i)=>Q.pair(p,i))},
 {k:'L4',n:'Level 4: Vowel Master',e:'🏆',b:'Vowel Master',d:'A mixed final quiz: monophthongs, diphthongs, symbols and minimal pairs.',f:()=>{const m=sh(VOWELS.filter(v=>v.type==='Monophthong')),d=sh(VOWELS.filter(v=>v.type==='Diphthong'));
  return sh([Q.listen(m[0],0),Q.word2sym(m[1],1),Q.sym2word(m[2],2),Q.listen(d[0],3),Q.word2sym(d[1],0),Q.sym2word(d[2],1),Q.pair(PAIRS[Math.floor(Math.random()*6)],2),Q.pair(PAIRS[6+Math.floor(Math.random()*6)],3),Q.listen(d[3],0),Q.word2sym(m[3],2)])}}];
const root=document.getElementById('game');
function menu(){const d=VQ.get(),s=d.scores;
 root.innerHTML='<div class="grid">'+LV.map((l,i)=>`<div class="card ${['y','m','c',''][i]}"><div style="font-size:2.2rem">${l.e}</div><h3>${l.n}</h3><p>${l.d}</p><p>${s[l.k]?'Best: '+s[l.k].best+' / '+s[l.k].max:'Not played yet'}</p><button class="btn sm" data-i="${i}" type="button">${s[l.k]?'Replay':'Start'}</button></div>`).join('')+'</div>';
 root.querySelectorAll('button').forEach(b=>b.onclick=()=>play(+b.dataset.i))}
function play(i){const l=LV[i],el=document.createElement('div');el.className='card';root.innerHTML=`<h2>${l.n}</h2><p>${l.d} Each correct answer on the first try is worth 10 points.</p>`;root.append(el);
 quiz(el,l.f,l.k,{back:menu,end:(s,m)=>{let t='';if(s>=m*.6){VQ.badge(l.k);t+=`🎖️ Badge earned: ${l.e} ${l.b}! `}else t+='Score at least 60% to earn this level’s badge. ';
  if(s===m){VQ.badge('perfect');t+='⭐ Perfect Round badge earned!'}return t}})}
menu();
