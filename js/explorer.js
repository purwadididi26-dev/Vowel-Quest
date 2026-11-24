const $=id=>document.getElementById(id);let grp='all';
function grid(){const d=VQ.get();$('grid').innerHTML=SOUNDS.filter(v=>grp==='all'||v.type===grp).map(v=>`<button class="chip ipa ${collected(d,v.s)?'got':''}" data-s="${v.s}" type="button">${v.s}<small>${collected(d,v.s)?'✦ ':''}${v.w}</small></button>`).join('');
 $('grid').querySelectorAll('.chip').forEach(b=>b.onclick=()=>card(b.dataset.s));document.querySelectorAll('.tabs .btn').forEach(b=>b.setAttribute('aria-pressed',b.dataset.g===grp))}
function card(s){const v=SOUNDS.find(x=>x.s===s)||SOUNDS[0],c=$('card'),vow=v.type!=='Consonant';
 document.querySelectorAll('#grid .chip').forEach(b=>b.classList.toggle('on',b.dataset.s===v.s));
 c.innerHTML=`<div class="sym ipa">/${v.s}/</div><h2>“${v.w}”</h2><p><strong>Category:</strong> ${v.type}</p><p>${v.exp}</p>
 <table>${vow?`<tr><th>Tongue height</th><td>${v.h}</td></tr><tr><th>Tongue position</th><td>${v.p}</td></tr><tr><th>Lip rounding</th><td>${v.l}</td></tr>`:`<tr><th>Voicing</th><td>${v.voice}</td></tr><tr><th>Place</th><td>${v.place}</td></tr><tr><th>Manner</th><td>${v.manner}</td></tr><tr><th>Position in example</th><td>${v.pos}</td></tr>`}</table>
 <p><strong>Pronunciation tip:</strong> ${v.tip}</p>${vow?`<p><strong>Compare:</strong> ${v.cmp}</p>`:''}<div id="ac"></div>`;
 $('ac').append(audioControls(v.w))}
document.querySelectorAll('.tabs .btn').forEach(b=>b.onclick=()=>{grp=b.dataset.g;grid()});
grid();card(decodeURIComponent(location.hash.slice(1))||'iː');
