const d=VQ.get();document.getElementById('echo').innerHTML=echo(130);
document.getElementById('cmd').innerHTML='<div class="two"><div>'+expBlock(d)+'</div><div>'+questBlock(d)+'</div></div>';
document.getElementById('worlds').innerHTML=WORLDS.map(w=>{const s=worldStat(d,w);return `<a class="card ${s.done?'m':''}" href="world.html#${w.id}"><div style="display:flex;gap:10px;align-items:center">${chibi(w.hair,'#EBCB87',48)}<div><h3 style="margin:0">${w.n}</h3><small>${w.sub}</small></div></div><p>${s.n} of ${s.t} sounds collected${s.done?' · 🌟 cleared':''}</p></a>`}).join('');
