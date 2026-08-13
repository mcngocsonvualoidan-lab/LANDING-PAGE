(()=>{
  const slider=document.querySelector('.hero-slider');
  if(!slider)return;
  const slides=[...slider.querySelectorAll('.hero-slide')];
  const dots=[...slider.querySelectorAll('.hero-dots button')];
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let index=0,timer=null,paused=false,startX=0;
  function restartProgress(){slider.classList.remove('is-playing');void slider.offsetWidth;if(!paused&&!reduced)slider.classList.add('is-playing')}
  function show(next,userAction=false){index=(next+slides.length)%slides.length;slides.forEach((slide,i)=>{const active=i===index;slide.classList.toggle('is-active',active);slide.setAttribute('aria-hidden',String(!active))});dots.forEach((dot,i)=>{const active=i===index;dot.classList.toggle('is-active',active);dot.setAttribute('aria-selected',String(active))});restartProgress();if(userAction)schedule()}
  function schedule(){clearInterval(timer);if(!paused&&!reduced)timer=setInterval(()=>show(index+1),5000)}
  function pause(){paused=true;slider.classList.add('is-paused');slider.classList.remove('is-playing');clearInterval(timer)}
  function resume(){paused=false;slider.classList.remove('is-paused');restartProgress();schedule()}
  slider.querySelector('.hero-prev').addEventListener('click',()=>show(index-1,true));
  slider.querySelector('.hero-next').addEventListener('click',()=>show(index+1,true));
  dots.forEach((dot,i)=>dot.addEventListener('click',()=>show(i,true)));
  slider.addEventListener('mouseenter',pause);slider.addEventListener('mouseleave',resume);
  slider.addEventListener('focusin',pause);slider.addEventListener('focusout',e=>{if(!slider.contains(e.relatedTarget))resume()});
  slider.addEventListener('touchstart',e=>{startX=e.touches[0].clientX;pause()},{passive:true});
  slider.addEventListener('touchend',e=>{const delta=e.changedTouches[0].clientX-startX;if(Math.abs(delta)>45)show(index+(delta<0?1:-1),true);resume()},{passive:true});
  slider.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')show(index-1,true);if(e.key==='ArrowRight')show(index+1,true)});
  show(0);schedule();
})();
