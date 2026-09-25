function renderLearn(){
 const el=document.getElementById('learn');
 el.innerHTML=modules.map((m)=>`<article class="card unit">
 <h2>${m.title}</h2><div class="source">${m.source}</div>
 <div class="support"><span>ÎMPREUNĂ</span><span>ACUM TU</span><span>POȚI SINGUR</span></div>
 ${Object.entries(m.steps).map(([k,v])=>`<div class="step"><b>${k}</b><div>${v}</div></div>`).join('')}
 <h3>Subiecte de eseu / antrenament</h3>
 <div class="essay">${m.essays.map(x=>`<div>${x}</div>`).join('')}</div>
 </article>`).join('');
}
renderLearn();

document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{
 document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active')); b.classList.add('active');
 ['learn','quiz','method'].forEach(id=>document.getElementById(id).classList.toggle('hidden',id!==b.dataset.view));
});

let test=[], pos=0, points=0, answered=false;
const shuffle=a=>[...a].sort(()=>Math.random()-.5);
document.getElementById('startBtn').onclick=()=>{
 const unit=document.getElementById('unitSel').value;
 const level=document.getElementById('levelSel').value;
 const count=+document.getElementById('countSel').value;
 let pool=questions.filter(q=>(unit==='all'||q.unit==unit)&&(level==='Mix'||q.level===level));
 if(pool.length<count) pool=questions.filter(q=>(unit==='all'||q.unit==unit));
 test=shuffle(pool).slice(0,Math.min(count,pool.length)); pos=0; points=0;
 document.getElementById('quizArea').classList.remove('hidden'); showQ();
};
function showQ(){
 answered=false; document.getElementById('nextBtn').classList.add('hidden');
 const fb=document.getElementById('feedback'); fb.style.display='none'; fb.className='feedback';
 if(pos>=test.length){
  document.getElementById('qtext').innerHTML=`Test terminat: ${points} / ${test.length}`;
  document.getElementById('opts').innerHTML='';
  document.getElementById('meta').textContent=points===test.length?'Excelent. Reia pe nivel Olimpiadă pentru consolidare.':'Reia întrebările greșite și recitește explicațiile.';
  document.getElementById('score').textContent=`Scor final: ${Math.round(points/test.length*100)}%`;
  return;
 }
 const q=test[pos]; document.getElementById('score').textContent=`Scor: ${points} | Întrebarea ${pos+1}/${test.length}`;
 document.getElementById('meta').textContent=`Unitatea ${q.unit} • Nivel: ${q.level}`;
 document.getElementById('qtext').textContent=q.q;
 const opts=document.getElementById('opts'); opts.innerHTML='';
 q.options.forEach((o,i)=>{
  const b=document.createElement('button'); b.className='opt'; b.textContent=String.fromCharCode(65+i)+'. '+o;
  b.onclick=()=>answer(i,b); opts.appendChild(b);
 });
}
function answer(i,btn){
 if(answered)return; answered=true; const q=test[pos];
 document.querySelectorAll('.opt').forEach((b,j)=>{ if(j===q.answer)b.classList.add('correct'); });
 const fb=document.getElementById('feedback'); fb.style.display='block';
 if(i===q.answer){points++; fb.classList.add('good'); fb.innerHTML=`<b>Corect.</b> ${q.explanation}`;}
 else{btn.classList.add('wrong'); fb.classList.add('bad'); fb.innerHTML=`<b>Răspunsul corect este ${String.fromCharCode(65+q.answer)}: ${q.options[q.answer]}.</b><br>${q.explanation}`;}
 document.getElementById('score').textContent=`Scor: ${points} | Întrebarea ${pos+1}/${test.length}`;
 document.getElementById('nextBtn').classList.remove('hidden');
}
document.getElementById('nextBtn').onclick=()=>{pos++; showQ();};
