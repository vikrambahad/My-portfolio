(function(){
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  const body=document.body, mode=$('#mode'), menu=$('.menu'), panel=$('#mobilePanel'), closeMenu=$('#closeMenu');
  let dynamic=localStorage.getItem('vikram-dynamic')!=='false';
  function setDynamic(value){dynamic=!!value;localStorage.setItem('vikram-dynamic',String(dynamic));body.classList.toggle('static',!dynamic);if(mode){mode.textContent=dynamic?'✦ Dynamic':'○ Static';mode.setAttribute('aria-pressed',String(dynamic));}if($('#mobileMode')){$('#mobileMode').textContent=dynamic?'✦ Dynamic mode':'○ Static mode';$('#mobileMode').setAttribute('aria-pressed',String(dynamic));}}
  if(mode)mode.addEventListener('click',()=>setDynamic(!dynamic));
  function openMenu(){if(!panel)return;panel.classList.add('open');panel.setAttribute('aria-hidden','false');if(menu)menu.setAttribute('aria-expanded','true');body.classList.add('menu-open');}
  function closeMobileMenu(){if(!panel)return;panel.classList.remove('open');panel.setAttribute('aria-hidden','true');if(menu)menu.setAttribute('aria-expanded','false');body.classList.remove('menu-open');}
  if(menu)menu.addEventListener('click',openMenu); if(closeMenu)closeMenu.addEventListener('click',closeMobileMenu);
  $$('.mobile-panel a').forEach(a=>a.addEventListener('click',closeMobileMenu));
  const mobileMode=$('#mobileMode'); if(mobileMode)mobileMode.addEventListener('click',()=>{setDynamic(!dynamic);closeMobileMenu();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMobileMenu();closeCert();}});
  const revealEls=$$('.reveal');
  // Replay skill progress lines every time the card enters the viewport.
  function animateSkill(card){
    const fill=$('.fill',card);
    if(!fill)return;
    const target=Math.max(0,Math.min(100,Number(card.dataset.p)||0));
    fill.style.transition='none';
    fill.style.width='0%';
    requestAnimationFrame(()=>requestAnimationFrame(()=>{
      fill.style.transition='width .9s cubic-bezier(.22,.61,.36,1)';
      fill.style.width=target+'%';
    }));
  }
  if('IntersectionObserver' in window){
    const ob=new IntersectionObserver(entries=>entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('show');
        if(e.target.classList.contains('skill'))animateSkill(e.target);
      }else if(e.target.classList.contains('skill')){
        const fill=$('.fill',e.target);
        if(fill){fill.style.transition='none';fill.style.width='0%';}
      }
    }),{threshold:.28,rootMargin:'0px 0px -5% 0px'});
    revealEls.forEach(x=>ob.observe(x));
  }else{
    revealEls.forEach(x=>x.classList.add('show'));
    $$('.skill').forEach(animateSkill);
  }
  $$('.certificates-grid .cert').forEach(x=>x.classList.add('show'));
  $$('.certificates-grid img').forEach(img=>img.addEventListener('error',()=>{img.style.display='block';}, {once:true}));
  $$('.filter').forEach(btn=>btn.addEventListener('click',()=>{
    $$('.filter').forEach(x=>x.classList.remove('active'));btn.classList.add('active');
    const f=btn.dataset.f||'All';
    $$('.project').forEach(card=>{const show=f==='All'||card.dataset.c===f;card.hidden=!show;card.style.display=show?'flex':'none';});
  }));
  const form=$('#form'), success=$('#success');
  if(form)form.addEventListener('submit',e=>{e.preventDefault();const btn=form.querySelector('.submit');const inputs=form.querySelectorAll('input,textarea');const name=inputs[0]?.value.trim()||'';const email=inputs[1]?.value.trim()||'';const message=inputs[2]?.value.trim()||'';const subject=encodeURIComponent('Portfolio enquiry from '+name);const bodyText=encodeURIComponent('Name: '+name+'\nEmail: '+email+'\n\nMessage:\n'+message);if(btn)btn.disabled=true;window.location.href='mailto:vikrambahad@gmail.com?subject='+subject+'&body='+bodyText;if(success){success.style.display='block';success.textContent='Opening your email app… ✨';}form.reset();setTimeout(()=>{if(success)success.style.display='none';if(btn)btn.disabled=false;},4000);});
  const modal=$('#certModal'), modalImg=$('#certModalImage'), newTab=$('#certNewTab');
  function openCert(src){if(!modal||!modalImg)return;modalImg.src=src;newTab.href=src;modal.classList.add('open');modal.setAttribute('aria-hidden','false');body.classList.add('modal-open');}
  function closeCert(){if(!modal)return;modal.classList.remove('open');modal.setAttribute('aria-hidden','true');body.classList.remove('modal-open');if(modalImg)modalImg.removeAttribute('src');}
  window.closeCert=closeCert;
  $$('.cert-preview,.cert-open').forEach(b=>b.addEventListener('click',()=>{
    const preview=b.closest('.cert')?.querySelector('.cert-preview');
    const src=b.dataset.certificate || preview?.querySelector('img')?.src || '';
    if(src)openCert(src);
  }));
  $$('[data-close-cert]').forEach(x=>x.addEventListener('click',closeCert));
  const year=$('#year');if(year)year.textContent=new Date().getFullYear();
  // Make every internal navigation link reliable on mobile and desktop.
  $$('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>closeMobileMenu()));
  setDynamic(dynamic);
})();

// New UX polish: active section + scroll progress
(function(){
 const bar=document.createElement('div');bar.style.cssText='position:fixed;top:0;left:0;width:0;height:2px;background:linear-gradient(90deg,#61e8ff,#9b7cff,#ff75c8);z-index:9999;box-shadow:0 0 14px rgba(97,232,255,.6);transition:width .08s linear';document.body.appendChild(bar);
 const links=[...document.querySelectorAll('.links a')]; const sections=[...document.querySelectorAll('main section[id]')];
 let ticking=false;
 function update(){
   const doc=document.documentElement;
   const max=Math.max(1,doc.scrollHeight-innerHeight);
   const pct=Math.max(0,Math.min(100,(scrollY/max)*100));
   bar.style.width=pct+'%';
   let current='';
   sections.forEach(sec=>{if(scrollY+180>=sec.getBoundingClientRect().top+scrollY)current=sec.id});
   links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+current));
   ticking=false;
 }
 function requestUpdate(){if(!ticking){ticking=true;requestAnimationFrame(update)}}
 addEventListener('scroll',requestUpdate,{passive:true});
 addEventListener('resize',requestUpdate,{passive:true});
 addEventListener('orientationchange',()=>setTimeout(requestUpdate,80),{passive:true});
 addEventListener('load',requestUpdate);
 requestUpdate();
})();
