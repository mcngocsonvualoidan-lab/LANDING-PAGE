const previewOverlay=document.querySelector('#devicePreview');
const previewFrame=document.querySelector('#devicePreviewFrame');
const previewSize=document.querySelector('#devicePreviewSize');
const previewTrigger=document.querySelector('#openDevicePreview');
const previewClose=document.querySelector('#closeDevicePreview');
const sizeLabels={desktop:'1440 × toàn màn hình',tablet:'768 × 1024',mobile:'390 × 844'};

if(new URLSearchParams(location.search).has('embedded')) previewTrigger?.remove();

function openPreview(){previewOverlay.classList.add('show');previewOverlay.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}
function closePreview(){previewOverlay.classList.remove('show');previewOverlay.setAttribute('aria-hidden','true');document.body.style.overflow=''}

previewTrigger?.addEventListener('click',openPreview);
previewClose?.addEventListener('click',closePreview);
previewOverlay?.addEventListener('click',event=>{if(event.target===previewOverlay)closePreview()});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&previewOverlay?.classList.contains('show'))closePreview()});
document.querySelectorAll('[data-preview-mode]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('[data-preview-mode]').forEach(item=>item.classList.remove('active'));
  button.classList.add('active');
  const mode=button.dataset.previewMode;
  previewFrame.className='device-preview-frame '+(mode==='desktop'?'':mode);
  previewSize.textContent=sizeLabels[mode];
}));
