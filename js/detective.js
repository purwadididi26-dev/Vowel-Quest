const C=(i,q,clue,c,oth,why,t,alt)=>({q,clue,t,alt,...mk(i,c,oth,oth.length+1),why});
const clue=(a,c)=>a.map(x=>({...x,clue:c}));
const CASES=[
{k:'case1',n:'Case 01: The Missing Sheep',s:'The school mascot has vanished! The only clue is a note: “Look for the ship… or was it the sheep?” To crack the case you must tell /ɪ/ from /iː/.',
 b:()=>[{...Q.pair(PAIRS[0],0),clue:'Listen for a short, relaxed vowel or a long, tense one.'},
  C(1,'Which vowel is in “sheep”?','The vowel is long and tense, with slightly spread lips.','/iː/',['/ɪ/'],'“sheep” /ʃiːp/ has the long vowel /iː/. “ship” /ʃɪp/ has the short vowel /ɪ/.','iː','ɪ'),
  {...Q.pair(PAIRS[1],1),clue:'The witness says “sit” or “seat”. Which one did you hear?'},
  C(1,'Which word has the short vowel /ɪ/?','Short and relaxed, like the vowel in “sit”.','ship',['sheep'],'“ship” has /ɪ/. “sheep” has the longer vowel /iː/.','ɪ','iː'),
  {...Q.pair(PAIRS[6],0),clue:'Length matters: bit /bɪt/ is short, beat /biːt/ is long.'}]},
{k:'case2',n:'Case 02: The Wrong Passenger',s:'On the Vowel Express, three passengers share one vowel sound, but one passenger is travelling under a false sound. Spot the odd one out!',
 b:()=>sh([['bed','e',['cat','hat','bad'],'æ'],['sit','ɪ',['see','tree','key'],'iː'],['book','ʊ',['food','moon','blue'],'uː'],['cup','ʌ',['car','farm','park'],'ɑː'],['law','ɔː',['hot','dog','box'],'ɒ']]).map(([o,s,ot,cs],i)=>({q:'Which passenger has a different vowel sound?',clue:'Say all four words aloud. Three have the same vowel.',t:s,alt:cs,...mk(i,o,ot,4),why:`“${o}” has /${s}/. ${ot.join(', ')} have /${cs}/.`}))},
{k:'case3',n:'Case 03: The Diphthong Mystery',s:'Something strange is gliding through the garden at night. Diphthongs glide from one vowel sound to another, so look for the words that move!',
 b:()=>{const d=sh(VOWELS.filter(v=>v.type==='Diphthong'));return[...d.slice(0,4).map((v,i)=>({...Q.diph(v,i),clue:'A diphthong glides: the tongue and lips move within one syllable.'})),
  C(2,'In “go” /gəʊ/, how does the vowel move?','Say “go” slowly and feel your lips.','from /ə/ towards /ʊ/',['from /ʊ/ towards /ə/','it stays steady as /ɔː/','from /e/ towards /ɪ/'],'/əʊ/ starts near /ə/ and glides towards /ʊ/ in one syllable. The lips become more rounded.','əʊ',null)]}},
{k:'case4',n:'Case 04: The Secret Sound',s:'A mystery voice left one spoken word on tape. Listen closely, then name the vowel sound it contains using its IPA symbol.',
 b:()=>sh(VOWELS).slice(0,5).map((v,i)=>({...Q.listen(v,i),q:'Listen to the secret sound. Which IPA symbol is the vowel?',clue:'Is the vowel long, short, or a glide? Say the word aloud.'}))}];
const root=document.getElementById('cases');
function menu(){const d=VQ.get(),pts=CASES.reduce((s,c)=>s+(d.scores[c.k]?+d.scores[c.k].best||0:0),0);
 document.getElementById('pts').textContent='Detective points: '+pts;
 root.innerHTML='<div class="grid">'+CASES.map((c,i)=>{const done=d.cases[c.k],open=i===0||d.cases[CASES[i-1].k],sc=d.scores[c.k];
  return `<div class="card ${done?'m':open?'y':''}"><h3>${done?'✅':open?'📂':'🔒'} ${c.n}</h3><p>${open?c.s:'Solve the previous case to unlock this one.'}</p><p>${sc?'Best: '+sc.best+' / '+sc.max+' points':''}</p>${open?`<button class="btn sm" data-i="${i}" type="button">${done?'Replay case':'Open case'}</button>`:''}</div>`}).join('')+'</div>';
 root.querySelectorAll('button').forEach(b=>b.onclick=()=>play(+b.dataset.i))}
function play(i){const c=CASES[i],el=document.createElement('div');el.className='card';root.innerHTML=`<h2>${c.n}</h2><p class="id">${c.s}</p>`;root.append(el);
 quiz(el,c.b,c.k,{back:menu,end:(s,m)=>{if(s>=m*.6){VQ.mark('cases',c.k);const all=CASES.every(x=>VQ.get().cases[x.k]);if(all)VQ.badge('detective');
   return `🔓 Case solved! +${s} detective points.${i<3?' The next case is unlocked.':''}${all?' You are a Master Detective!':''}`}return 'Case not solved yet. Score at least 60% to solve it.'}})}
menu();
