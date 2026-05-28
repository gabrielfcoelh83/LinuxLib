let activeCat='all', activeLvl='all', q='';

document.addEventListener('DOMContentLoaded',()=>{
  document.getElementById('search').addEventListener('input',e=>{
    q=e.target.value.toLowerCase().trim();
    if(q){activeCat='all';syncCat('all')}
    filter();
  });
  document.addEventListener('keydown',e=>{
    if(e.key==='/'&&document.activeElement.tagName!=='INPUT'){
      e.preventDefault();document.getElementById('search').focus();
    }
  });
  filter();
});

function setCategory(cat,btn){activeCat=cat;syncCat(cat);filter();window.scrollTo({top:0,behavior:'smooth'})}
function syncCat(cat){document.querySelectorAll('.cat-btn').forEach(b=>b.classList.toggle('active',b.dataset.cat===cat))}

function setLevel(lvl,btn){
  activeLvl=lvl;
  document.querySelectorAll('.lvl').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  filter();
}

function filter(){
  const cards=document.querySelectorAll('.cmd-card');
  let total=0;
  cards.forEach(c=>{
    const mc=activeCat==='all'||c.dataset.category===activeCat;
    const ml=activeLvl==='all'||(c.dataset.levels||'').split(',').includes(activeLvl);
    const mq=!q||(c.textContent||'').toLowerCase().includes(q)||(c.dataset.tags||'').toLowerCase().includes(q);
    const show=mc&&ml&&mq;
    c.style.display=show?'':'none';
    if(show)total++;
  });
  document.querySelectorAll('.cat-sec').forEach(s=>{
    const vis=[...s.querySelectorAll('.cmd-card')].some(c=>c.style.display!=='none');
    s.style.display=vis?'':'none';
  });
  const em=document.getElementById('empty');
  if(em)em.style.display=total===0?'':'none';
  const rc=document.getElementById('rc');
  if(rc)rc.textContent=total;
}

function toggleAcc(btn){
  const body=btn.nextElementSibling;
  const ic=btn.querySelector('.aic');
  const open=body.style.maxHeight&&body.style.maxHeight!=='0px';
  body.style.maxHeight=open?'0px':body.scrollHeight+'px';
  body.style.opacity=open?'0':'1';
  btn.setAttribute('aria-expanded',!open);
  if(ic)ic.style.transform=open?'rotate(0deg)':'rotate(180deg)';
}

function switchTab(tabId,groupId){
  const g=document.getElementById(groupId);
  if(!g)return;
  g.querySelectorAll('.tab-p').forEach(p=>p.classList.remove('active'));
  g.querySelectorAll('.tab-t').forEach(t=>t.classList.remove('active'));
  const p=g.querySelector('#p-'+tabId),t=g.querySelector('[data-tab="'+tabId+'"]');
  if(p)p.classList.add('active');
  if(t)t.classList.add('active');
}

function copyCmd(btn,text){
  const c=text.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&').replace(/&#39;/g,"'");
  navigator.clipboard.writeText(c).then(()=>{
    const prev=btn.innerHTML;
    btn.innerHTML='✓';btn.style.color='var(--pr)';btn.style.borderColor='var(--pr)';
    setTimeout(()=>{btn.innerHTML=prev;btn.style.color='';btn.style.borderColor=''},1800);
  });
}
