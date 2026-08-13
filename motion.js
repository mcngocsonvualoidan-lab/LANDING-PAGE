const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealTargets=[
  ...document.querySelectorAll('.benefit-strip div,.story-copy,.story-visual,.visual-card,.detail-feature,.versatile>div,.trusted-grid article,.quote,.offer,.order-card')
];
revealTargets.forEach((element,index)=>{
  element.classList.add('reveal');
  if(element.matches('.story-copy,.offer')||index%3===0)element.classList.add('from-left');
  if(element.matches('.story-visual,.order-card')||index%3===2)element.classList.add('from-right');
});

if(reduceMotion){revealTargets.forEach(element=>element.classList.add('is-visible'))}else{
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}
  }),{threshold:.12,rootMargin:'0px 0px -7%'});
  revealTargets.forEach(element=>observer.observe(element));
}

const parallaxBlocks=[...document.querySelectorAll('.story-visual,.visual-card,.detail-feature figure,.trusted-grid article')];
parallaxBlocks.forEach(element=>element.classList.add('parallax-media'));
let ticking=false;
function updateParallax(){
  const viewport=innerHeight;
  parallaxBlocks.forEach(block=>{
    const image=block.querySelector('img'); if(!image)return;
    const rect=block.getBoundingClientRect();
    if(rect.bottom<0||rect.top>viewport)return;
    const progress=(rect.top+rect.height/2-viewport/2)/viewport;
    image.style.transform=`scale(1.06) translate3d(0,${Math.max(-18,Math.min(18,-progress*26))}px,0)`;
  });
  const hero=document.querySelector('.hero>img');
  if(hero&&scrollY<innerHeight)hero.style.transform=`scale(1.035) translate3d(0,${scrollY*.07}px,0)`;
  ticking=false;
}
if(!reduceMotion){addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(updateParallax);ticking=true}},{passive:true});updateParallax()}
