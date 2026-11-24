const $=id=>document.getElementById(id),sel=$('v'),st=$('st'),au=$('mine');
let rec=null,stream=null,chunks=[],url=null,t0=0,tm=null,cur=null;
sel.innerHTML=SOUNDS.map(v=>`<option value="${v.s}">/${v.s}/ as in “${v.w}”</option>`).join('');
function target(){cur=SOUNDS.find(v=>v.s===sel.value);$('big').textContent='/'+cur.s+'/ “'+cur.w+'”';$('ref').innerHTML='';$('ref').append(audioControls(cur.w));$('cmp').textContent=cur.cmp}
const isRec=()=>rec&&rec.state==='recording';
function sync(){$('rb').disabled=isRec()||!supported;$('sb').disabled=!isRec();['pb','db','cb'].forEach(i=>$(i).disabled=!url);sel.disabled=isRec();$('empty').hidden=!!url||isRec();$('ind').hidden=!isRec()}
const tick=()=>{const s=Math.floor((Date.now()-t0)/1000);$('time').textContent=Math.floor(s/60)+':'+String(s%60).padStart(2,'0')};
const supported=!!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia&&window.MediaRecorder);
if(!supported)st.textContent='Recording is not supported in this browser. Try a recent Chrome, Edge, Firefox or Safari, opened from https or localhost.';
function del(){au.pause();if(url)URL.revokeObjectURL(url);url=null;au.removeAttribute('src');au.hidden=true;sync()}
$('rb').onclick=async()=>{stopAll();st.textContent='';
 try{stream=await navigator.mediaDevices.getUserMedia({audio:true})}catch(e){
  st.textContent=(e.name==='NotAllowedError'||e.name==='SecurityError')?'Microphone permission was denied. Allow microphone access in your browser settings, then press Record again.':e.name==='NotFoundError'?'No microphone was found on this device.':'The microphone could not start: '+e.message;return}
 try{rec=new MediaRecorder(stream)}catch(e){stream.getTracks().forEach(t=>t.stop());st.textContent='This browser could not start recording: '+e.message;return}
 del();chunks=[];rec.ondataavailable=e=>{if(e.data.size)chunks.push(e.data)};
 rec.onstop=()=>{stream.getTracks().forEach(t=>t.stop());clearInterval(tm);
  if(chunks.length){url=URL.createObjectURL(new Blob(chunks,{type:rec.mimeType||'audio/webm'}));au.src=url;au.hidden=false;VQ.upd(d=>{d.studio.n++;VQ.daily(d,'rec');d.studio.v[cur.s]=(d.studio.v[cur.s]||0)+1});st.textContent='Recording ready. Replay it, compare it with the reference, then complete the checklist.'}else st.textContent='Nothing was recorded. Please try again.';sync()};
 rec.start();t0=Date.now();tick();tm=setInterval(tick,250);sync()};
$('sb').onclick=()=>{if(isRec())rec.stop()};
$('pb').onclick=()=>{stopAll();au.currentTime=0;au.play()};
$('db').onclick=()=>{del();st.textContent='Recording deleted.'};
$('cb').onclick=async()=>{stopAll();const mine=()=>{au.currentTime=0;au.play()};
 if(await probe(cur.w)){const a=new Audio(aurl(cur.w));curAudio=a;a.onended=mine;a.play().catch(mine);return}
 st.textContent='No verified recording yet, so the browser voice (not authentic RP) plays first, then your recording.';
 if(!('speechSynthesis' in window)){mine();return}const u=new SpeechSynthesisUtterance(cur.w);u.lang='en-GB';u.rate=.85;u.onend=mine;u.onerror=mine;speechSynthesis.speak(u)};
function fbk(){const a=$('c1').checked,b=$('c2').checked,c=$('c3').checked;
 $('fbk').textContent=c?'Good honesty! Try the Flashcards or Mouth Guide, then record again.':(a&&b)?'Great work! Try another vowel or a minimal pair in the Practice Zone.':(a||b)?'Nice start. Compare again with the reference and focus on the difference from a similar vowel.':''}
['c1','c2','c3'].forEach(i=>$(i).onchange=fbk);
sel.onchange=()=>{del();target()};target();sync();
