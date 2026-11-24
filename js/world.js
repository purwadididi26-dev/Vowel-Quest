function show(id){const w=WORLDS.find(x=>x.id===id)||WORLDS[0],d=VQ.get(),s=worldStat(d,w);
 document.querySelectorAll('.map g').forEach(g=>g.classList.toggle('on',g.dataset.w===w.id));
 document.getElementById('panel').innerHTML=`<div style="display:flex;gap:12px;align-items:center">${chibi(w.hair,'#EBCB87',64)}<div><h2 style="margin:0">${w.n}</h2><p style="margin:0">${w.sub} · Guide: ${w.g}</p></div></div><p>${w.intro}</p>
 <h3>Sound collection: ${s.n} of ${s.t}</h3><div class="pbar" role="progressbar" aria-valuenow="${s.n}" aria-valuemin="0" aria-valuemax="${s.t}"><span style="width:${s.n/s.t*100}%"></span></div>
 <div class="vgrid" style="margin:12px 0">${w.list().map(v=>`<a class="chip ipa ${collected(d,v.s)?'got':'lock'}" style="text-decoration:none;color:inherit" href="explorer.html#${encodeURIComponent(v.s)}">${v.s}<small>${collected(d,v.s)?'✦ '+v.w:v.w}</small></a>`).join('')}</div>
 <p>${s.done?'🌟 World cleared! Every sound here has been collected.':'🏁 Clear this world by collecting every sound: answer each one correctly twice in quizzes.'}</p>${w.links.map(l=>`<a class="btn sm" href="${l[0]}">${l[1]}</a>`).join('')}`}
document.querySelectorAll('.map g').forEach(g=>{g.onclick=()=>{show(g.dataset.w);history.replaceState(null,'','#'+g.dataset.w)};g.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();g.onclick()}}});
show(location.hash.slice(1));
