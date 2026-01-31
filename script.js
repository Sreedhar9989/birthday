/* ==========
  Full JS with 750ms typing, sparkling candles, floating stars, emoji bursts
========= */
const content={
  greet:"Dear Dad, thank you for your love, guidance, and support. You are our strength and joy, and we are so grateful for you. Wishing you all the happiness today and always – we love you!",
  love:"To my love, 20 years with you have been a beautiful journey of trust, care, and togetherness. Thank you for being my strength, my partner, and my forever. I’m grateful for every moment with you.",
  essayPoints:[
    "Dad, I know you hide your pain so I can smile, and I feel your love in every silent sacrifice.",
    "When life feels heavy, you carry me forward with your strength and patience.",
    "You gave up your own dreams so mine could take shape, and I’ll always be thankful.",
    "Your tired hands built my world, and your hard work means everything to me.",
    "Even when you say little, your love protects me every single day."
  ],
  finalLine:"💙 Thank you for being my hero, Dad. I am proud to be your son.",
  finalThank:"Thank you, Dad — if love had a face, it would look like your tired smile that still chose me every single day. I love you always. — Your son"
};

const body=document.body;
const canvas=document.getElementById('bgCanvas');const ctx=canvas.getContext('2d');
function resizeCanvas(){canvas.width=window.innerWidth;canvas.height=window.innerHeight;}
resizeCanvas();window.addEventListener('resize',resizeCanvas);

const stage1=document.getElementById('stage1');const stage2=document.getElementById('stage2');
const stage3=document.getElementById('stage3');const stage4=document.getElementById('stage4');
const stage5=document.getElementById('stage5');
const lightBtn=document.getElementById('lightBtn');const nextFrom1=document.getElementById('nextFrom1');
const nextFrom2=document.getElementById('nextFrom2');const nextFrom3=document.getElementById('nextFrom3');
const t_greet=document.getElementById('t_greet');const t_love=document.getElementById('t_love');const t_final=document.getElementById('t_final');
const revealBtn=document.getElementById('revealBtn');const pointsWrap=document.getElementById('points');
const saveBtn=document.getElementById('saveBtn');const shareBtn=document.getElementById('shareBtn');

function typeWords(el,text,speed=750,onComplete){el.textContent='';const words=text.split(' ');let i=0;const id=setInterval(()=>{el.textContent+=(i?' ':'')+words[i];i++;if(i>=words.length){clearInterval(id);if(onComplete)onComplete();}},speed);}

const floatSets={1:['✨','🕯️','🎂'],2:['🎈','🎉','💐'],3:['💞','🌸','💗'],4:['💙','✨','🌟'],5:['🌟','🎊','💫']};
let floatInterval=null;
function startStageFloating(stage){if(floatInterval)clearInterval(floatInterval);floatInterval=setInterval(()=>{const x=Math.random()*window.innerWidth;const y=window.innerHeight-20;spawnEmoji(x,y,floatSets[stage][Math.floor(Math.random()*floatSets[stage].length)],false);spawnParticle(x,y-30,'255,200,120',2+Math.random()*3,-0.6-Math.random()*0.8,2200);},900);}
function spawnEmoji(x,y,emoji,big=false){const el=document.createElement('div');el.className='emoji';el.textContent=emoji;el.style.left=(x+Math.random()*40-20)+'px';el.style.top=(y+Math.random()*30-15)+'px';el.style.fontSize=(big?36:20)+Math.random()*10+'px';el.style.animationDuration=(big?3.2:4.8)+'s';document.body.appendChild(el);setTimeout(()=>el.remove(),5200);}
const particles=[];function spawnParticle(x,y,clr,size,vy,life){particles.push({x,y,clr,size,vy,life,age:0,dx:(Math.random()-0.5)*0.6});}
function updateParticles(dt){for(let i=particles.length-1;i>=0;i--){const p=particles[i];p.age+=dt;p.x+=p.dx;p.y+=p.vy;if(p.age>p.life)particles.splice(i,1);}}
function drawParticles(){if(!ctx)return;ctx.clearRect(0,0,canvas.width,canvas.height);particles.forEach(p=>{const alpha=1-p.age/p.life;ctx.beginPath();ctx.fillStyle=`rgba(${p.clr},${alpha})`;ctx.globalCompositeOperation='lighter';ctx.arc(p.x,p.y,p.size,0,Math.PI*2);ctx.fill();});ctx.globalCompositeOperation='source-over';}
let lastTime=performance.now();function loop(t){const dt=t-lastTime;lastTime=t;updateParticles(dt);drawParticles();requestAnimationFrame(loop);}requestAnimationFrame(loop);

/* ---------- Tap bursts ---------- */
document.addEventListener('click',ev=>{const x=ev.clientX,y=ev.clientY;const stageNum=parseInt(body.className.replace('stage',''))||1;spawnEmoji(x,y,floatSets[stageNum][Math.floor(Math.random()*floatSets[stageNum].length)],true);spawnParticle(x,y,'255,200,120',2+Math.random()*3,-0.8-Math.random()*0.5,1800);if(navigator.vibrate)navigator.vibrate(8);});

/* ---------- Stage switching ---------- */
function showStage(n){[stage1,stage2,stage3,stage4,stage5].forEach(s=>s.classList.add('hidden'));body.className=`stage${n}`;switch(n){case 1:stage1.classList.remove('hidden');startStageFloating(1);break;case 2:stage2.classList.remove('hidden');startStageFloating(2);typeWords(t_greet,content.greet,750);break;case 3:stage3.classList.remove('hidden');startStageFloating(3);typeWords(t_love,content.love,750);break;case 4:stage4.classList.remove('hidden');startStageFloating(4);preparePoints();break;case 5:stage5.classList.remove('hidden');startStageFloating(5);t_final.textContent=content.finalThank;break;}}

/* ---------- Candle logic ---------- */
const candles=document.querySelectorAll('.candle .flame');const cakePlate=document.querySelector('.cake-plate');
function lightCandles(){candles.forEach((f,idx)=>{setTimeout(()=>{f.classList.add('lit');for(let i=0;i<6;i++){spawnParticle(f.getBoundingClientRect().left+f.offsetWidth/2+(Math.random()*30-15),f.getBoundingClientRect().top,'255,180,60',2+Math.random()*2,-0.9-Math.random()*0.8,1400);spawnEmoji(f.getBoundingClientRect().left+f.offsetWidth/2,f.getBoundingClientRect().top,'✨',false);}},idx*300);});setTimeout(()=>nextFrom1.classList.remove('hidden'),1100);}
lightBtn.addEventListener('click',()=>lightCandles());
nextFrom1.addEventListener('click',()=>showStage(2));
nextFrom2?.addEventListener('click',()=>showStage(3));
nextFrom3?.addEventListener('click',()=>showStage(4));

/* ---------- Stage 4 points ---------- */
let pointIndex=0;
function preparePoints(){pointIndex=0;pointsWrap.innerHTML='';content.essayPoints.forEach(()=>{const p=document.createElement('div');p.className='point';p.style.display='none';pointsWrap.appendChild(p);});const finalPlaceholder=document.createElement('div');finalPlaceholder.className='point';finalPlaceholder.id='finalStage4Shown';finalPlaceholder.style.display='none';pointsWrap.appendChild(finalPlaceholder);revealBtn.classList.remove('hidden');}
revealBtn.addEventListener('click',()=>{if(pointIndex<content.essayPoints.length){const p=pointsWrap.querySelectorAll('.point')[pointIndex];p.style.display='block';typeWords(p,content.essayPoints[pointIndex],750,()=>{pointIndex++;if(pointIndex===content.essayPoints.length)revealBtn.textContent='Final Thank You ➜';});p.scrollIntoView({behavior:'smooth',block:'end'});}else if(pointIndex===content.essayPoints.length){const finalNode=document.getElementById('finalStage4Shown');finalNode.style.display='block';finalNode.textContent=content.finalLine;revealBtn.textContent='Proceed to final note ➜';pointIndex++;finalNode.scrollIntoView({behavior:'smooth',block:'end'});}else{showStage(5);}});

/* ---------- Stage5 save/share ---------- */
saveBtn?.addEventListener('click',()=>{const text=[content.greet,content.love,...content.essayPoints,content.finalLine,content.finalThank].join('\n\n');const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type:'text/plain'}));a.download='HappyBirthday_Dad.txt';document.body.appendChild(a);a.click();a.remove();});
shareBtn?.addEventListener('click',()=>{const text=[content.greet,content.love,...content.essayPoints,content.finalThank].join('\n\n');if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(text).then(()=>alert('Copied to clipboard. Paste to share ❤️'));}else{alert('Clipboard not available — select and copy manually.')}});

/* ---------- Init ---------- */
showStage(1);
