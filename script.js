const form=document.querySelector('#orderForm');
const modal=document.querySelector('#thanks');
document.querySelectorAll('.plan input').forEach(input=>input.addEventListener('change',()=>{document.querySelectorAll('.plan').forEach(x=>x.classList.remove('selected'));input.closest('.plan').classList.add('selected')}));
form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const data=new FormData(form);const code='KK'+Date.now().toString().slice(-6);document.querySelector('#orderCode').textContent='#'+code;document.querySelector('#summary').innerHTML=`<b>${data.get('plan')}</b><br>${data.get('name')} · ${data.get('phone')}<br>${data.get('address')}`;modal.classList.add('show');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'});
function closeModal(){modal.classList.remove('show');modal.setAttribute('aria-hidden','true');document.body.style.overflow=''}
document.querySelector('#closeThanks').addEventListener('click',closeModal);document.querySelector('#backHome').addEventListener('click',()=>{closeModal();scrollTo({top:0,behavior:'smooth'})});modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});
