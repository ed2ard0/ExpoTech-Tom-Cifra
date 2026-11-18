const songs = [
 {id:1,title:"Tempo Perdido",artist:"Legião Urbana",genre:"Rock",tone:"D",capo:"Sem capotraste",difficulty:"Intermediário",sections:[
  ["INTRO / VERSO",["D","A","Bm","G"],"Repetir a sequência com levada constante."],
  ["REFRÃO",["D","A","Bm","G"],"Manter a mesma harmonia da base."]
 ],link:"https://www.cifraclub.com.br/legiao-urbana/tempo-perdido/"},
 {id:2,title:"Boate Azul",artist:"Bruno & Marrone",genre:"Sertanejo",tone:"G",capo:"Sem capotraste",difficulty:"Fácil",sections:[
  ["INTRO / VERSO",["G","D","Em","Bm","C","G","A7","D7"],"Progressão simplificada para acompanhamento."],
  ["REFRÃO",["G","D","Em","Bm","C","G","D7","G"],"Repetir conforme a estrutura da gravação."]
 ],link:"https://www.cifraclub.com.br/bruno-e-marrone/boate-azul/"},
 {id:3,title:"Evidências",artist:"Chitãozinho & Xororó",genre:"Sertanejo",tone:"A",capo:"Sem capotraste",difficulty:"Intermediário",sections:[
  ["INTRO / VERSO",["A","E","F#m","C#m","D","A","Bm","E"],"Base harmônica simplificada."],
  ["REFRÃO",["A","E","F#m","C#m","D","A","Bm","E","A"],"Acompanhe as mudanças ouvindo a gravação."]
 ],link:"https://www.cifraclub.com.br/chitaozinho-e-xororo/evidencias/"},
 {id:4,title:"Borboletas",artist:"Victor & Leo",genre:"Sertanejo",tone:"G",capo:"Sem capotraste",difficulty:"Fácil",sections:[
  ["INTRO / VERSO",["G","D","Em","C"],"Repetir a sequência na maior parte da estrofe."],
  ["REFRÃO",["G","D","Em","C","G","D","C","D"],"Ajuste a duração dos acordes conforme o canto."]
 ],link:"https://www.cifraclub.com.br/victor-e-leo/borboletas/"},
 {id:5,title:"Só Os Loucos Sabem",artist:"Charlie Brown Jr.",genre:"Rock",tone:"C",capo:"Sem capotraste",difficulty:"Fácil",sections:[
  ["INTRO / VERSO",["C","G","Am","F"],"Ciclo de quatro acordes para estudo."],
  ["REFRÃO",["C","G","Am","F"],"Repita a progressão mantendo a dinâmica."]
 ],link:"https://www.cifraclub.com.br/charlie-brown-jr/so-os-loucos-sabem/"},
 {id:6,title:"Pais e Filhos",artist:"Legião Urbana",genre:"Rock",tone:"D",capo:"Sem capotraste",difficulty:"Intermediário",sections:[
  ["INTRO",["D","A","G","D"],"Toque com dinâmica suave."],
  ["VERSO / REFRÃO",["D","A","G","D","A","G"],"A sequência é uma referência simplificada; confira as viradas na gravação."]
 ],link:"https://www.cifraclub.com.br/legiao-urbana/pais-e-filhos/"},
 {id:7,title:"Sozinho",artist:"Caetano Veloso",genre:"MPB",tone:"A",capo:"Sem capotraste",difficulty:"Intermediário",sections:[
  ["INTRO / VERSO",["A7M","G#m7","C#m7","F#m7","Bm7","E7"],"Acordes com sétima maior e menor dão a cor da harmonia."],
  ["REFRÃO",["D7M","C#m7","Bm7","E7","A7M"],"Use batida leve ou dedilhado."]
 ],link:"https://www.cifraclub.com.br/caetano-veloso/sozinho/"},
 {id:8,title:"Flor e o Beija-Flor",artist:"Henrique & Juliano (part. Marília Mendonça)",genre:"Sertanejo",tone:"G",capo:"Sem capotraste",difficulty:"Fácil",sections:[
  ["INTRO / VERSO",["G","D","Em","C"],"Progressão simplificada."],
  ["REFRÃO",["G","D","Em","C","G","D","C","D"],"Repita conforme a estrutura da música."]
 ],link:"https://www.cifraclub.com.br/henrique-e-juliano/flor-e-o-beija-flor/"},
 {id:9,title:"Céu Azul",artist:"Charlie Brown Jr.",genre:"Pop Rock",tone:"G",capo:"Sem capotraste",difficulty:"Fácil",sections:[
  ["INTRO / VERSO",["G","D","Em","C"],"Base simplificada para violão."],
  ["REFRÃO",["G","D","Em","C"],"Mantenha a pulsação e destaque o refrão."]
 ],link:"https://www.cifraclub.com.br/charlie-brown-jr/ceu-azul/"},
 {id:10,title:"Só Hoje",artist:"Jota Quest",genre:"Pop Rock",tone:"G",capo:"Sem capotraste",difficulty:"Fácil",sections:[
  ["INTRO / VERSO",["G","D","Em","C"],"Ciclo simplificado para acompanhar."],
  ["REFRÃO",["G","D","Em","C","G","D","C","D"],"Ajuste a levada para combinar com a gravação."]
 ],link:"https://www.cifraclub.com.br/jota-quest/so-hoje/"}
];

const list = document.getElementById('songList');
const sheet = document.getElementById('sheet');
const search = document.getElementById('searchInput');
const genre = document.getElementById('genreFilter');
const favButton = document.getElementById('favoritesFilter');
let selected = songs[0].id, favorites = JSON.parse(localStorage.getItem('tc-favorites') || '[]');
let semitones = 0, onlyFavorites = false;

const NOTES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
const ENHARMONIC = {'Db':'C#','Eb':'D#','Gb':'F#','Ab':'G#','Bb':'A#'};
function transposeChord(chord, amount){
 const match = chord.match(/^([A-G](?:#|b)?)(.*)$/); if(!match) return chord;
 let root = ENHARMONIC[match[1]] || match[1], idx = NOTES.indexOf(root);
 if(idx < 0) return chord;
 return NOTES[(idx + amount + 120) % 12] + match[2];
}
function renderList(){
 const q = search.value.toLocaleLowerCase('pt-BR');
 const filtered = songs.filter(s => (s.title+' '+s.artist).toLocaleLowerCase('pt-BR').includes(q) && (genre.value==='all'||s.genre===genre.value) && (!onlyFavorites||favorites.includes(s.id)));
 document.getElementById('resultCount').textContent = `${filtered.length} ${filtered.length===1?'música':'músicas'}`;
 list.innerHTML = filtered.length ? '' : '<div class="no-results">Nenhuma música encontrada.</div>';
 filtered.forEach(s=>{
  const card=document.createElement('button'); card.className='song-card'+(s.id===selected?' selected':''); card.type='button';
  card.innerHTML=`<span class="song-number">${String(s.id).padStart(2,'0')}</span><span class="song-info"><strong>${s.title}</strong><small>${s.artist}</small></span><span class="song-tag">${s.genre}</span><span class="heart ${favorites.includes(s.id)?'fav':''}" role="button" aria-label="Favoritar">${favorites.includes(s.id)?'♥':'♡'}</span>`;
  card.addEventListener('click',e=>{if(e.target.classList.contains('heart')){e.stopPropagation();toggleFavorite(s.id);return;} selected=s.id;semitones=0;renderList();renderSheet();});
  list.appendChild(card);
 });
}
function toggleFavorite(id){favorites=favorites.includes(id)?favorites.filter(x=>x!==id):[...favorites,id];localStorage.setItem('tc-favorites',JSON.stringify(favorites));renderList();}
function renderSheet(){
 const s=songs.find(x=>x.id===selected); if(!s){sheet.innerHTML='<div class="empty-state"><div>♫</div><h3>Escolha uma cifra</h3></div>';return;}
 const sections=s.sections.map(([name,chords,note])=>`<div class="section-label">${name}</div><div class="chord-line">${chords.map(c=>`<div class="chord"><b>${transposeChord(c,semitones)}</b><small>acorde</small></div>`).join('')}</div><div class="note">${note}</div>`).join('');
 sheet.innerHTML=`<div class="sheet-head"><div><span class="eyebrow">${s.genre.toUpperCase()} · CIFRA SIMPLIFICADA</span><h3>${s.title}</h3><p>${s.artist}</p></div><div class="sheet-actions"><div class="transpose"><button id="down" aria-label="Diminuir tom">−</button><span>${semitones>0?'+':''}${semitones}</span><button id="up" aria-label="Aumentar tom">+</button></div><button class="small-btn" id="print">Imprimir</button><button class="small-btn" id="official">Cifra completa ↗</button></div></div><div class="song-meta"><span>TOM: <b>${transposeChord(s.tone,semitones)}</b></span><span>NÍVEL: <b>${s.difficulty}</b></span><span>${s.capo.toUpperCase()}</span></div><div class="chord-content">${sections}<div class="note"><b>Observação:</b> esta é uma sugestão harmônica simplificada, sem reprodução da letra. A versão original pode ter variações, baixos e acordes adicionais.</div></div>`;
 document.getElementById('down').onclick=()=>{semitones--;renderSheet();};
 document.getElementById('up').onclick=()=>{semitones++;renderSheet();};
 document.getElementById('print').onclick=()=>window.print();
 document.getElementById('official').onclick=()=>window.open(s.link,'_blank','noopener');
}
search.addEventListener('input',renderList);genre.addEventListener('change',renderList);
favButton.addEventListener('click',()=>{onlyFavorites=!onlyFavorites;favButton.classList.toggle('active',onlyFavorites);renderList();});
document.getElementById('themeToggle').addEventListener('click',()=>document.body.classList.toggle('dark'));
renderList();renderSheet();
