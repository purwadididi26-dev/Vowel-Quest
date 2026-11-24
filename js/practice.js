const first10=a=>sh(a).slice(0,12);
const sets={
 A:()=>first10(VOWELS).map((v,i)=>i%2?Q.word2sym(v,i):Q.sym2word(v,i)),
 B:()=>first10(VOWELS).map((v,i)=>Q.listen(v,i)),
 C:()=>first10(PAIRS).map((p,i)=>Q.pair(p,i)),
 D:()=>{const dp=sh(VOWELS.filter(v=>v.type==='Diphthong')).slice(0,4),c=sh(VOWELS).slice(0,8);return sh([...c.map((v,i)=>Q.cat(v,i)),...dp.map((v,i)=>Q.diph(v,i))])}};
sets.E=()=>first10(CONS).map((v,i)=>i%2?Q.cclass(v,i):Q.clisten(v,i));
const info={A:'IPA symbol recognition: match vowel symbols with example words.',B:'Listening quiz: play the word, then choose its vowel symbol.',C:'Minimal pair challenge: listen and choose the word you hear (ship/sheep, sit/seat, full/fool, bed/bad and more).',D:'Monophthong vs diphthong: steady vowel quality or a glide?',E:'Consonants: match sounds with symbols and classify them by voicing, place and manner.'};
function load(k){document.querySelectorAll('.tabs .btn').forEach(b=>b.setAttribute('aria-pressed',b.dataset.k===k));
 document.getElementById('intro').textContent=info[k];quiz(document.getElementById('quiz'),sets[k],'practice-'+k)}
document.querySelectorAll('.tabs .btn').forEach(b=>b.onclick=()=>load(b.dataset.k));load('A');
