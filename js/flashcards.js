const $=id=>document.getElementById(id);let deck=[],name='',i=0,flip=false;
const review=()=>{const d=VQ.get(),st=vowelState(d);return VOWELS.filter(v=>d.fc.flag[v.s]||st[v.s].st==='need')};
const sets={Monophthongs:()=>VOWELS.filter(v=>v.type==='Monophthong'),Diphthongs:()=>VOWELS.filter(v=>v.type==='Diphthong'),'Mixed Review':()=>sh(VOWELS),Review:review};
function stats(){const d=VQ.get(),m=Object.keys(d.fc.mast).length,s=Object.keys(d.fc.seen).length;
 $('tf').textContent='Review ('+review().length+')';$('prog').textContent=`Mastered ${m} of 20 · Viewed ${s} of 20 · Still learning ${Object.keys(d.fc.flag).length}`;$('fp').style.width=m/20*100+'%'}
function draw(){const v=deck[i],c=$('fcard'),d=VQ.get(),tag=d.fc.mast[v.s]?'✔ Mastered':d.fc.flag[v.s]?'Still learning':'';
 c.innerHTML=flip?`<div class="sym">/${v.s}/</div><h2>“${v.w}”</h2><p><strong>${v.type}</strong></p><p>${v.exp}</p>`:`<div class="sym" style="font-size:5rem">/${v.s}/</div><p>Say the sound, then tap to flip.</p>`;
 c.classList.remove('turn');void c.offsetWidth;c.classList.add('turn');
 $('cnt').textContent=`${name} · card ${i+1} of ${deck.length}${tag?' · '+tag:''}`;$('fa').innerHTML='';$('fa').append(audioControls(v.w));
 if(flip&&!d.fc.seen[v.s])VQ.upd(x=>{x.fc.seen[v.s]=1});stats()}
function load(n){name=n;deck=sets[n]();i=0;flip=false;document.querySelectorAll('.tabs .btn').forEach(b=>b.setAttribute('aria-pressed',b.dataset.n===n));
 if(!deck.length){$('fcard').innerHTML='<h2>Nothing to review yet</h2><p>Mark cards as Still learning, or practise in the Practice Zone. Sounds you get wrong will appear here.</p>';$('fa').innerHTML='';$('cnt').textContent='Review collection is empty';stats();return}draw()}
const ok=f=>()=>{if(deck.length)f()};
const turn=ok(()=>{flip=!flip;draw()});
$('fcard').onclick=turn;$('fcard').onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();turn()}};$('fl').onclick=turn;
$('nx').onclick=ok(()=>{i=(i+1)%deck.length;flip=false;draw()});$('pv').onclick=ok(()=>{i=(i-1+deck.length)%deck.length;flip=false;draw()});
$('shf').onclick=ok(()=>{deck=sh(deck);i=0;flip=false;draw()});
$('ms').onclick=ok(()=>{const s=deck[i].s;VQ.upd(d=>{if(!d.fc.mast[s])VQ.daily(d,'fc');d.fc.mast[s]=1;delete d.fc.flag[s];d.fc.seen[s]=1});draw()});
$('sl').onclick=ok(()=>{const s=deck[i].s;VQ.upd(d=>{d.fc.flag[s]=1;delete d.fc.mast[s];d.fc.seen[s]=1});draw()});
$('ra').onclick=()=>load('Review');
document.querySelectorAll('.tabs .btn').forEach(b=>b.onclick=()=>load(b.dataset.n));load('Monophthongs');
