const pt=(x,y)=>{const l=20+70*y;return[l+(180-70*y)*x,20+120*y]};
const frame='<defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0L8,4L0,8z" fill="#FF8F78"/></marker></defs><polygon points="20,20 200,20 200,140 90,140" class="vs"/><text class="lb" x="20" y="12">front</text><text class="lb" x="200" y="12">back</text><text class="lb" x="8" y="80" transform="rotate(-90 8 80)">close → open</text>';
function chartSVG(){let s='<svg class="chart" viewBox="0 0 220 160" role="group" aria-label="Clickable vowel chart of the 12 RP monophthongs">'+frame;
 VOWELS.filter(v=>v.type==='Monophthong').forEach(v=>{const[x,y]=pt(v.x,v.y);
  s+=`<g data-s="${v.s}" tabindex="0" role="button" aria-label="${v.s} as in ${v.w}"><circle class="dot" id="d-${v.s}" cx="${x}" cy="${y}" r="11"/><text x="${x}" y="${y+4}">${v.s}</text></g>`});return s+'</svg>'}
function cardSVG(v){const a=pt(v.x,v.y);let s='<svg class="chart" viewBox="0 0 220 160" role="img" aria-label="Simplified diagram: the tongue position for '+v.s+'">'+frame;
 if(v.x2!=null){const b=pt(v.x2,v.y2);s+=`<line class="glide" x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" marker-end="url(#ar)"/><circle class="dot" cx="${a[0]}" cy="${a[1]}" r="8"/><text class="lb" x="${a[0]}" y="${a[1]-12}">start</text><text class="lb" x="${b[0]}" y="${b[1]+22}">end</text>`}
 else s+=`<circle class="dot on" cx="${a[0]}" cy="${a[1]}" r="12"/><text x="${a[0]}" y="${a[1]+4}">${v.s}</text>`;
 return s+'</svg><p class="note">Simplified learner diagram of the vowel space, not a precise measurement. The dot shows roughly where the highest part of the tongue is.</p>'}
function show(sym){const v=VOWELS.find(x=>x.s===sym),c=document.getElementById('card');
 document.querySelectorAll('.dot').forEach(d=>d.classList.remove('on'));const d=document.getElementById('d-'+sym);if(d)d.classList.add('on');
 document.querySelectorAll('.chip').forEach(b=>b.classList.toggle('on',b.dataset.s===sym));
 c.innerHTML=`<div class="two"><div><div class="sym ipa">/${v.s}/</div><h2>“${v.w}”</h2><p><strong>Category:</strong> ${v.type}${v.type==='Diphthong'?' (moves within one syllable)':' (steady quality)'}</p><p>${v.exp}</p>
 <table><tr><th>Tongue height</th><td>${v.h}</td></tr><tr><th>Tongue position</th><td>${v.p}</td></tr><tr><th>Lip rounding</th><td>${v.l}</td></tr></table>
 <p><strong>Pronunciation tip:</strong> ${v.tip}</p><p><strong>Compare:</strong> ${v.cmp}</p>${sym==='ʊə'?'<p class="note">Academic note: /ʊə/ is a traditional RP diphthong. Many modern British speakers use /ɔː/ in words like “tour” or “sure”, so it is not a distinct diphthong for everyone.</p>':''}</div><div>${cardSVG(v)}</div></div><div id="ac"></div>
 <p class="note">Learner-friendly descriptions are simplified. Terms for tongue height vary slightly between textbooks.</p>`;
 document.getElementById('ac').append(audioControls(v.w));if(window.vqReady)c.focus()}
document.getElementById('chart').innerHTML=chartSVG();
document.querySelectorAll('#chart g').forEach(g=>{g.onclick=()=>show(g.dataset.s);g.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();show(g.dataset.s)}}});
document.getElementById('dipt').innerHTML=VOWELS.filter(v=>v.type==='Diphthong').map(v=>`<button class="chip ipa" data-s="${v.s}" type="button">${v.s}<small>${v.w}</small></button>`).join('');
document.getElementById('mono').innerHTML=VOWELS.filter(v=>v.type==='Monophthong').map(v=>`<button class="chip ipa" data-s="${v.s}" type="button">${v.s}<small>${v.w}</small></button>`).join('');
document.querySelectorAll('.chip').forEach(b=>b.onclick=()=>show(b.dataset.s));
show('iː');window.vqReady=true;
