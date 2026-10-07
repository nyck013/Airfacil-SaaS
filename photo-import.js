/* Batch photo management. IndexedDB stores device-local blobs; export publishes them. */
'use strict';
const PhotoManager=(()=>{
 const MAX_FILE=8*1024*1024,MAX_TOTAL=150*1024*1024;
 const imported=new Map(),urls=new Map();let db=null,loading=true,dbError='',pending=[],report=[],busy=false,progress='',imageType='photo';
 const normalize=value=>String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
 const extension=name=>String(name).split('.').pop().toLowerCase();
 const index=new Map();for(const r of RECIPES)for(const key of [normalize(r.id),normalize(r.name)]){if(!index.has(key))index.set(key,new Set());index.get(key).add(r.id)}
 function matchFilename(name){const ext=extension(name);if(!['jpg','jpeg','png','webp'].includes(ext))return null;const base=normalize(String(name).split(/[\\/]/).pop().replace(/\.[^.]+$/,''));const matches=index.get(base);return matches?.size===1?[...matches][0]:null}
 function changed(){if(typeof parseRoute==='function'&&parseRoute().name==='fotos')render()}
 function formatSize(n){return (n/1024/1024).toLocaleString('pt-BR',{maximumFractionDigits:1})+' MB'}
 async function init(){
  try{
   if(!globalThis.indexedDB)throw Error('Este navegador não permite salvar fotos. Abra o aplicativo em um navegador atualizado.');
   db=await new Promise((resolve,reject)=>{const req=indexedDB.open('airfacil-photos-v1',1);req.onupgradeneeded=()=>{if(!req.result.objectStoreNames.contains('photos'))req.result.createObjectStore('photos',{keyPath:'id'})};req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);req.onblocked=()=>reject(Error('Feche outras abas do AirFácil e tente novamente.'))});
   db.onversionchange=()=>{db.close();db=null;dbError='O armazenamento mudou em outra aba. Recarregue a página.'};
   const records=await new Promise((resolve,reject)=>{const tx=db.transaction('photos','readonly');const req=tx.objectStore('photos').getAll();req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error)});
   for(const record of records)if(RECIPES.some(r=>r.id===record.id)&&record.blob instanceof Blob){imported.set(record.id,record);urls.set(record.id,URL.createObjectURL(record.blob))}
  }catch(err){dbError=err.message||'Não foi possível abrir o armazenamento de fotos.'}finally{loading=false}
 }
 function get(id){return imported.get(id)}
 function source(id){return urls.get(id)}
 function stage(files){
  if(busy)return;report=[];pending=Array.from(files).map(file=>({file,id:matchFilename(file.name),error:''}));
  const counts=new Map();for(const p of pending)if(p.id)counts.set(p.id,(counts.get(p.id)||0)+1);
  for(const p of pending){if(!p.id)p.error='Nome não reconhecido';else if(p.file.size>MAX_FILE)p.error='Arquivo maior que 8 MB';else if(!p.file.size)p.error='Arquivo vazio';else if(counts.get(p.id)>1)p.error='Há mais de uma foto para esta receita no lote';else if(p.file.type&&!['image/jpeg','image/png','image/webp'].includes(p.file.type))p.error='Formato não aceito'}
  const selected=pending.filter(p=>!p.error),newIds=new Set(selected.map(p=>p.id));let total=[...imported.values()].filter(p=>!newIds.has(p.id)).reduce((s,p)=>s+p.blob.size,0)+selected.reduce((s,p)=>s+p.file.size,0);
  if(total>MAX_TOTAL)for(const p of selected)p.error='O lote ultrapassa 150 MB no total; use imagens menores';
  changed();return pending.map(p=>({name:p.file.name,id:p.id,error:p.error}));
 }
 async function validImage(blob){
  if(globalThis.createImageBitmap){const bitmap=await createImageBitmap(blob);if(!bitmap.width||!bitmap.height)throw Error('Imagem sem dimensões');bitmap.close();return}
  await new Promise((resolve,reject)=>{const url=URL.createObjectURL(blob),img=new Image();img.onload=()=>{URL.revokeObjectURL(url);resolve()};img.onerror=()=>{URL.revokeObjectURL(url);reject(Error('Imagem inválida'))};img.src=url});
 }
 function save(record){return new Promise((resolve,reject)=>{const tx=db.transaction('photos','readwrite');tx.objectStore('photos').put(record);tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error||Error('Gravação cancelada'))})}
 async function importStaged(){
  if(busy||loading||!db)return;const list=pending.filter(p=>!p.error);if(!list.length)return;
  busy=true;report=pending.filter(p=>p.error).map(p=>({name:p.file.name,id:p.id,status:p.error,ok:false}));
  for(let i=0;i<list.length;i++){
   const p=list[i];progress=`Importando ${i+1} de ${list.length}…`;changed();
   try{
    await validImage(p.file);const record={id:p.id,blob:p.file,extension:extension(p.file.name)==='jpeg'?'jpg':extension(p.file.name),name:p.file.name,status:imageType};
    await save(record);if(urls.has(p.id))URL.revokeObjectURL(urls.get(p.id));imported.set(p.id,record);urls.set(p.id,URL.createObjectURL(p.file));report.push({name:p.file.name,id:p.id,status:'Importada',ok:true});
   }catch(err){report.push({name:p.file.name,id:p.id,status:err?.name==='QuotaExceededError'?'Espaço insuficiente no navegador':'Não foi possível salvar esta imagem',ok:false})}
  }
  pending=[];busy=false;progress='';changed();toast(`${report.filter(r=>r.ok).length} fotos importadas`);
 }
 function download(blob,name){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000)}
 function downloadNames(){const rows=[['receita','nome_do_arquivo','caminho'],...RECIPES.map(r=>[r.name,r.id+'.jpg','assets/recipes/'+r.id+'.jpg'])];const csv='\uFEFF'+rows.map(row=>row.map(s=>'"'+String(s).replace(/"/g,'""')+'"').join(';')).join('\r\n');download(new Blob([csv],{type:'text/csv;charset=utf-8'}),'AirFacil-Nomes-das-Fotos.csv')}
 // ZIP without compression: no CDN or third-party runtime required. Blob parts avoid
 // copying all image bytes together in memory. Standard CRC and central directory.
 const crcTable=new Uint32Array(256);for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=(c&1)?0xedb88320^(c>>>1):c>>>1;crcTable[n]=c>>>0}
 async function crcBlob(blob){let crc=0xffffffff;for(let offset=0;offset<blob.size;offset+=1024*1024){const bytes=new Uint8Array(await blob.slice(offset,offset+1024*1024).arrayBuffer());for(const b of bytes)crc=crcTable[(crc^b)&255]^(crc>>>8)}return (crc^0xffffffff)>>>0}
 async function makeZip(entries,onProgress=()=>{}){
  const encoder=new TextEncoder(),local=[],central=[];let offset=0,centralSize=0;const now=new Date(),date=((Math.max(now.getFullYear(),1980)-1980)<<9)|((now.getMonth()+1)<<5)|now.getDate(),time=(now.getHours()<<11)|(now.getMinutes()<<5)|(now.getSeconds()>>1);
  if(entries.length>65535)throw Error('Arquivos demais para o ZIP');
  for(let i=0;i<entries.length;i++){
   const [path,blob]=entries[i];if(blob.size>0xffffffff)throw Error('Arquivo grande demais');const name=encoder.encode(path),crc=await crcBlob(blob);
   const header=new Uint8Array(30+name.length),h=new DataView(header.buffer);h.setUint32(0,0x04034b50,true);h.setUint16(4,20,true);h.setUint16(6,0x800,true);h.setUint16(10,time,true);h.setUint16(12,date,true);h.setUint32(14,crc,true);h.setUint32(18,blob.size,true);h.setUint32(22,blob.size,true);h.setUint16(26,name.length,true);header.set(name,30);local.push(header,blob);
   const dir=new Uint8Array(46+name.length),d=new DataView(dir.buffer);d.setUint32(0,0x02014b50,true);d.setUint16(4,20,true);d.setUint16(6,20,true);d.setUint16(8,0x800,true);d.setUint16(12,time,true);d.setUint16(14,date,true);d.setUint32(16,crc,true);d.setUint32(20,blob.size,true);d.setUint32(24,blob.size,true);d.setUint16(28,name.length,true);d.setUint32(42,offset,true);dir.set(name,46);central.push(dir);centralSize+=dir.length;offset+=header.length+blob.size;
   if(offset+centralSize>0xffffffff)throw Error('ZIP grande demais');onProgress(i+1,entries.length);await new Promise(resolve=>setTimeout(resolve,0));
  }
  const end=new Uint8Array(22),e=new DataView(end.buffer);e.setUint32(0,0x06054b50,true);e.setUint16(8,entries.length,true);e.setUint16(10,entries.length,true);e.setUint32(12,centralSize,true);e.setUint32(16,offset,true);return new Blob([...local,...central,end],{type:'application/zip'});
 }
 async function exportSite(){
  if(busy||loading)return;if(location.protocol==='file:'){toast('Abra pelo Live Server ou pela versão online para baixar o site com as fotos.');return}
  busy=true;progress='Reunindo os arquivos do aplicativo…';changed();
  try{
   const entries=[];const baseFiles=['index.html','style.css','script.js','photo-import.js','menus.js','assets/lucide.min.js','assets/LICENSE-lucide.txt','assets/airfacil-logo.png'];
   for(const file of baseFiles){const response=await fetch(new URL(file,location.href.split('#')[0]),{cache:'no-store'});if(!response.ok)throw Error('Não foi possível carregar '+file);const blob=await response.blob();entries.push([file,blob])}
   const data=RECIPES.map(r=>{const copy={...r},record=imported.get(r.id);if(record){copy.image='assets/recipes/'+r.id+'.'+record.extension;copy.imageStatus=record.status}return copy});
   entries.push(['recipes.js',new Blob(['// AirFácil: receitas com as fotos importadas.\nconst RECIPES = ',JSON.stringify(data,null,2),';\n'],{type:'text/javascript'})]);
   for(const r of data){const record=imported.get(r.id);if(record)entries.push([r.image,record.blob]);else if(r.imageStatus!=='placeholder'){const response=await fetch(new URL(r.image,location.href.split('#')[0]));if(!response.ok)throw Error('Não foi possível carregar a foto de '+r.name);entries.push([r.image,await response.blob()])}}
   entries.push(['LEIA-ME.txt',new Blob(['AirFácil com fotos\n\nExtraia o ZIP e envie todos os arquivos para a raiz pública da hospedagem.\nO index.html deve ficar na raiz. As fotos incluídas são públicas para quem acessar esta versão.\nAs demais receitas continuam com placeholders.\nNão inclui seus favoritos, lista de compras ou outros dados pessoais.\n'],{type:'text/plain;charset=utf-8'})]);
   const zip=await makeZip(entries,(n,total)=>{progress=`Preparando download: ${n} de ${total} arquivos…`;const status=document.getElementById('photo-progress');if(status)status.textContent=progress});download(zip,'AirFacil-Com-Fotos.zip');toast('Site com as fotos preparado para download');
  }catch(err){toast(err.message||'Não foi possível preparar o download. Tente novamente.')}finally{busy=false;progress='';changed()}
 }
 function page(){
  const matched=pending.filter(p=>!p.error),missing=RECIPES.filter(r=>!imported.has(r.id)&&r.imageStatus==='placeholder');
  return heading('Importar fotos em lote','Selecione várias imagens e associe cada uma pelo nome do arquivo.','FOTOS DAS RECEITAS')+`
  <div class="note">As imagens ficam salvas neste navegador. Para disponibilizá-las aos compradores, clique em <strong>Baixar site com as fotos</strong> e publique o ZIP gerado na sua hospedagem.</div>
  ${dbError?`<div class="storage-notice">${esc(dbError)}</div>`:''}
  <section class="panel photo-import-panel"><h2>1. Organize os nomes</h2><p>Use o nome da receita ou seu identificador. Exemplo: <strong>omelete-de-queijo-e-tomate.jpg</strong> ou <strong>Omelete de queijo e tomate.png</strong>.</p><p class="muted">JPG, PNG e WebP · até 8 MB por imagem · 150 MB de fotos importadas no total. Nomes genéricos, como IMG_001.jpg, precisam ser renomeados.</p><button class="button secondary" data-photo-names>${icon('download')}Baixar lista de nomes</button></section>
  <section class="panel photo-import-panel"><h2>2. Selecione suas fotos</h2><label class="photo-type">Tipo das imagens<select id="photo-image-type" ${busy?'disabled':''}><option value="photo" ${imageType==='photo'?'selected':''}>Fotografias</option><option value="illustrative" ${imageType==='illustrative'?'selected':''}>Ilustrações</option></select></label>
  <label class="button secondary photo-file-label" for="photo-files">${icon('images')}Selecionar várias imagens</label><input type="file" id="photo-files" class="photo-file-input" accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp" multiple ${busy||loading||dbError?'disabled':''}>
  <p class="muted">No computador, use Ctrl ou Shift para selecionar várias fotos. No celular, selecione várias imagens no gerenciador de arquivos.</p>
  ${pending.length?`<p class="photo-count"><strong>${matched.length}</strong> reconhecidas · <strong>${pending.length-matched.length}</strong> precisam de ajuste</p><div class="photo-results">${pending.map(p=>`<div class="photo-result ${p.error?'photo-error':''}"><strong>${esc(p.file.name)}</strong><span>${p.error?esc(p.error):esc(RECIPES.find(r=>r.id===p.id).name)+(imported.has(p.id)?' · substituirá a foto importada':'')}</span></div>`).join('')}</div><button class="button" data-photo-import ${!matched.length||busy||loading||!db?'disabled':''}>${icon('upload')}Importar ${matched.length} fotos reconhecidas</button>`:''}
  ${report.length?`<div class="photo-results" aria-label="Resultado da importação">${report.map(p=>`<div class="photo-result ${p.ok?'':'photo-error'}"><strong>${esc(p.name)}</strong><span>${esc(p.status)}</span></div>`).join('')}</div>`:''}
  <p id="photo-progress" role="status" aria-live="polite">${esc(progress||(loading?'Abrindo suas fotos salvas…':''))}</p></section>
  <section class="panel photo-import-panel"><h2>3. Baixe para publicar</h2><p><strong>${imported.size}</strong> fotos importadas neste navegador · <strong>${missing.length}</strong> receitas ainda sem foto.</p><p class="muted">O download inclui o aplicativo completo e as fotos. Receitas, favoritos e lista continuam funcionando; seus dados pessoais não entram no arquivo.</p><button class="button" data-photo-export ${busy||loading?'disabled':''}>${icon('download')}Baixar site com as fotos</button></section>
  ${imported.size?`<div class="section-head"><h2>Fotos importadas</h2></div><div class="recipe-grid">${RECIPES.filter(r=>imported.has(r.id)).map(card).join('')}</div>`:''}`;
 }
 document.addEventListener('change',e=>{if(e.target.id==='photo-files')stage(e.target.files);else if(e.target.id==='photo-image-type'&&!busy)imageType=e.target.value==='illustrative'?'illustrative':'photo'});
 document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b||b.disabled)return;if(b.hasAttribute('data-photo-import'))void importStaged();else if(b.hasAttribute('data-photo-names'))downloadNames();else if(b.hasAttribute('data-photo-export'))void exportSite()});
 return {init,page,get,source,matchFilename,stage,importStaged,makeZip};
})();
