(()=>{
 document.querySelectorAll('.project-cover-image,.gallery-image').forEach(img=>{
   const ok=()=>{img.classList.add('is-loaded');};
   if(img.complete&&img.naturalWidth)ok();else img.addEventListener('load',ok,{once:true});
   img.addEventListener('error',()=>{img.classList.remove('is-loaded');},{once:true});
 });
 document.querySelectorAll('.app-gallery').forEach(gallery=>{
   const track=gallery.querySelector('.gallery-track');
   const delta=()=>track.querySelector('.gallery-shot').getBoundingClientRect().width+16;
   gallery.querySelector('.gallery-prev').addEventListener('click',()=>track.scrollBy({left:-delta(),behavior:'smooth'}));
   gallery.querySelector('.gallery-next').addEventListener('click',()=>track.scrollBy({left:delta(),behavior:'smooth'}));
   const box=document.createElement('div');box.className='lightbox';box.hidden=true;box.setAttribute('role','dialog');box.setAttribute('aria-modal','true');box.setAttribute('aria-label','Screenshot preview');
   box.innerHTML='<button class="lightbox-close" type="button" aria-label="Close preview">×</button><button class="lightbox-prev" type="button" aria-label="Previous image">‹</button><img alt="Expanded app screenshot"><button class="lightbox-next" type="button" aria-label="Next image">›</button><span class="lightbox-caption"></span>';
   document.body.appendChild(box);let current=0;let loaded=[];let restoreFocus=null;
   const show=i=>{if(!loaded.length)return;current=(i+loaded.length)%loaded.length;box.querySelector('img').src=loaded[current].src;box.querySelector('img').alt=loaded[current].alt;box.querySelector('.lightbox-caption').textContent=`${current+1} / ${loaded.length}`;};
   const close=()=>{box.hidden=true;document.body.style.overflow='';restoreFocus?.focus();};
   gallery.querySelectorAll('.gallery-image').forEach(img=>img.addEventListener('click',()=>{loaded=[...gallery.querySelectorAll('.gallery-image.is-loaded')];if(!loaded.includes(img))return;restoreFocus=document.activeElement;show(loaded.indexOf(img));box.hidden=false;document.body.style.overflow='hidden';box.querySelector('.lightbox-close').focus();}));
   box.querySelector('.lightbox-close').addEventListener('click',close);box.querySelector('.lightbox-prev').addEventListener('click',()=>show(current-1));box.querySelector('.lightbox-next').addEventListener('click',()=>show(current+1));
   box.addEventListener('click',e=>{if(e.target===box)close();});
   document.addEventListener('keydown',e=>{if(box.hidden)return;if(e.key==='Escape')close();if(e.key==='ArrowRight')show(current+1);if(e.key==='ArrowLeft')show(current-1);});
 });
})();
