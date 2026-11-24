const pt=(x,y)=>{const l=30+60*y;return[l+(190-l)*x,26+120*y]};
(function(){let s='<svg class="chart" viewBox="0 0 220 175" role="img" aria-label="Vowel chart with the 12 RP monophthongs"><polygon points="30,26 190,26 190,146 90,146" class="vs"/>';
 [['Close',0],['Close-mid',.33],['Open-mid',.67],['Open',1]].forEach(([n,y])=>{const[a]=pt(0,y),[b]=pt(1,y);s+=`<line x1="${a}" y1="${26+120*y}" x2="${b}" y2="${26+120*y}" stroke="#cfc3f0" stroke-dasharray="3"/><text class="lb" x="16" y="${30+120*y}">${n.replace('Close-mid','Cl-mid').replace('Open-mid','Op-mid')}</text>`});
 s+='<text class="lb" x="30" y="14">Front</text><text class="lb" x="110" y="14">Central</text><text class="lb" x="190" y="14">Back</text>';
 VOWELS.filter(v=>v.type==='Monophthong').forEach(v=>{const[x,y]=pt(v.x,v.y),r=['ɒ','ɔː','ʊ','uː'].includes(v.s);s+=`<circle class="dot" style="fill:${r?'#FF8F78':'#FFD36B'};cursor:default" cx="${x}" cy="${y}" r="11"/><text x="${x}" y="${y+4}">${v.s}</text>`});
 document.getElementById('vchart').innerHTML=s+'</svg>'})();
const fig=(svg,c)=>`<figure>${svg}<figcaption>${c}</figcaption></figure>`;
function tongue(h,b,c){const top=22+h*42,cx=24+b*62;return fig(`<svg viewBox="0 0 120 90" role="img" aria-label="Side view sketch: ${c}"><path d="M10,12 H110" stroke="#7658BD" stroke-width="4"/><path d="M12,84 Q${cx-12},${top} ${cx},${top} T108,84 Z" fill="#FF8F78"/><text x="6" y="48" font-size="9">lips</text><text x="112" y="48" font-size="9" text-anchor="end">throat</text></svg>`,c)}
function lips(rx,ry,c){return fig(`<svg viewBox="0 0 100 70" role="img" aria-label="Front view of lips: ${c}"><ellipse cx="50" cy="35" rx="${rx}" ry="${ry}" fill="#2B2340" stroke="#FF8F78" stroke-width="6"/></svg>`,c)}
document.getElementById('sk1').innerHTML=tongue(0,0,'/iː/ close front')+tongue(.5,.5,'/ə/ mid central')+tongue(1,.9,'/ɑː/ open back');
document.getElementById('sk2').innerHTML=tongue(0,0,'/iː/ front')+tongue(.5,.5,'/ə/ central')+tongue(0,1,'/uː/ back');
document.getElementById('sk3').innerHTML=lips(40,7,'/iː/ spread')+lips(28,12,'/ə/ neutral')+lips(13,13,'/uː/ rounded')+lips(26,24,'/ɑː/ open, unrounded');
