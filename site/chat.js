/* DevPixel chat engine, shared by both pages.
   The page defines window.DP = { act(action,label), rerender() } for navigation (go:/p:/back). */
const LOGO='work/assets/Logo%20Final.svg';
const $=id=>document.getElementById(id);
const ARROW='<i class="ph ph-arrow-right"></i>';
const BACK='<i class="ph ph-arrow-left"></i>';
const thread=$('thread'), body=$('ctxBody'), sugg=$('sugg');

/* a follow-up: questions are plain, navigation is gold with an arrow */
const chip=([l,a])=>{const nav=!a.startsWith('q:'); return `<button class="chip ${nav?'go':''}" data-a="${a}" data-l="${l}">${l}${nav?ARROW:''}</button>`;};
const chips=acts=>acts&&acts.length?`<div class="chips">${acts.map(chip).join('')}</div>`:'';

/* context + the follow-up strip above the input. Questions already asked in this chat are left out. */
const asked=new Set();
let swapT=null;
function render(html,acts){
  body.classList.add('swap'); sugg.classList.add('swap'); clearTimeout(swapT);
  swapT=setTimeout(()=>{body.innerHTML=html; sugg.innerHTML=(acts||[]).filter(([,a])=>!asked.has(a)).map(chip).join('');
    body.classList.remove('swap'); sugg.classList.remove('swap'); body.parentElement.scrollTop=0;},200);
}

/* once a conversation starts, the context folds to its title so the thread has room */
const ctxEl=document.querySelector('.ctx'), tg=$('ctxTg');
function setCompact(c){ctxEl.classList.toggle('compact',c); tg.setAttribute('aria-expanded',String(!c)); tg.setAttribute('aria-label',c?'Show details':'Hide details');}
tg.addEventListener('click',e=>{e.stopPropagation(); setCompact(!ctxEl.classList.contains('compact'));});
ctxEl.addEventListener('click',e=>{if(ctxEl.classList.contains('compact')&&!e.target.closest('.prog')) setCompact(false);});

/* thread */
function emptyState(){thread.innerHTML='<div class="empty"><i class="ph ph-chat-circle"></i><b>Ask me anything</b>Or pick a question below.</div>';
  asked.clear(); ctxEl.classList.remove('has-chat'); setCompact(false);}
function add(el){const e=thread.querySelector('.empty'); if(e) e.remove(); thread.appendChild(el); thread.scrollTop=thread.scrollHeight;
  if(!ctxEl.classList.contains('has-chat')){ctxEl.classList.add('has-chat'); setCompact(true);}}
function userMsg(t){const d=document.createElement('div');d.className='m me';d.textContent=t;add(d);}
function aiMsg(html,acts){const d=document.createElement('div');d.className='m ai';d.innerHTML=`<span class="av"><img src="${LOGO}" alt=""></span><div class="tx">${html}${chips(acts)}</div>`;add(d);}
const goLabel=go=>go.startsWith('p:')?`Show me ${P[go.slice(2)].name}`:'Take me there';
function answer(text,key){
  if(!key){const r=ROUTES.find(([re])=>re.test(text)); key=r&&r[1];}
  const t=document.createElement('div');t.className='m ai';t.innerHTML=`<span class="av"><img src="${LOGO}" alt=""></span><div class="typing"><i></i><i></i><i></i></div>`;add(t);
  setTimeout(()=>{t.remove(); const qa=QA[key];
    const go=qa&&qa.go&&!(window.DP.here&&qa.go==='p:'+window.DP.here())?qa.go:null; /* no "Show me X" when X is already open */
    qa?aiMsg(qa.a,go?[[goLabel(go),go]]:null):aiMsg(`I don't have a page on that yet. Want me to pass your question to the team?`,[['Yes, get in touch','go:contact']]);},750);
}
function ask(label,key){setMin(false);
  if(key){asked.add('q:'+key); const c=sugg.querySelector(`[data-a="q:${key}"]`); if(c) c.remove();}
  userMsg(label); answer(label,key);}

/* live previews: scale 1440px designs to their frame */
function fit(){document.querySelectorAll('.screen .vp').forEach(v=>{const f=v.querySelector('iframe'); if(f) f.style.transform=`scale(${v.clientWidth/1440})`;});}
addEventListener('resize',fit);
document.querySelector('.show').addEventListener('transitionend',fit);

/* minimise: the toggle stays top-right in both states */
function setMin(m){document.body.classList.toggle('min',m); try{localStorage.setItem('dp-chat-min',m?'1':'0')}catch(e){}}
try{ if(localStorage.getItem('dp-chat-min')==='1') document.body.classList.add('min'); }catch(e){}
$('minBtn').addEventListener('click',()=>{setFull(false); setMin(true);});

/* full-page chat */
const isFull=()=>document.body.classList.contains('full');
function setFull(f){document.body.classList.toggle('full',f); const b=$('fullBtn');
  b.innerHTML=`<i class="ph ${f?'ph-arrows-in-simple':'ph-arrows-out-simple'}"></i>`; b.dataset.tip=f?'Exit full screen':'Full screen';
  b.setAttribute('aria-label',b.dataset.tip); if(f) setMin(false);
  if(location.hash==='#chat'&&!f) history.replaceState(null,'',location.pathname+location.search);}
$('fullBtn').addEventListener('click',()=>setFull(!isFull()));
addEventListener('keydown',e=>{if(e.key==='Escape'&&isFull()) setFull(false);});
if(location.hash==='#chat') setFull(true);
$('launch').addEventListener('click',()=>setMin(false));

/* events */
document.querySelector('.chat').addEventListener('click',e=>{const b=e.target.closest('[data-a]'); if(!b) return; const a=b.dataset.a;
  if(a.startsWith('q:')) ask(b.dataset.l,a.slice(2));
  else if(a.startsWith('go:')&&isFull()){setFull(false); setTimeout(()=>window.DP.act(a,b.dataset.l),420);}
  else window.DP.act(a,b.dataset.l);});
document.querySelector('.show').addEventListener('click',e=>{
  const a=e.target.closest('[data-ask]'); if(a){ask(a.dataset.ask,a.dataset.q); return;}
  if(e.target.closest('[data-open-chat]')){setMin(false); setFull(true); setTimeout(()=>q.focus(),450);}
});
const q=$('q'), send=$('send');
const grow=()=>{q.style.height='auto'; q.style.height=Math.min(q.scrollHeight,140)+'px';};
q.addEventListener('input',()=>{send.disabled=!q.value.trim(); grow();});
q.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();$('f').requestSubmit();}});
$('f').addEventListener('submit',e=>{e.preventDefault();const v=q.value.trim();if(!v)return;q.value='';q.style.height='';send.disabled=true;userMsg(v);answer(v);});
$('newChat').addEventListener('click',()=>{emptyState(); window.DP.rerender(); q.focus();});
emptyState();

/* reveal sections as they scroll in */
const rvo=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in'); rvo.unobserve(e.target);}}),{rootMargin:'0px 0px -8% 0px'});
document.querySelectorAll('.rv').forEach(el=>rvo.observe(el));
