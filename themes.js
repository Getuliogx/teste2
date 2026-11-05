// Estilo do chat por gênero. id = id de gênero do TMDB (filmes e séries)
const T = {
  action:{accent:'#ff4d1a',accent2:'#ffb300',bg:'rgba(30,8,0,.78)',font:'Bebas Neue',emoji:'💥',radius:'3px'},
  adventure:{accent:'#e0a526',accent2:'#2e8b57',bg:'rgba(30,22,5,.75)',font:'Cinzel',emoji:'🧭',radius:'8px'},
  animation:{accent:'#ff6bcb',accent2:'#5bd6ff',bg:'rgba(40,20,70,.72)',font:'Fredoka',emoji:'✨',radius:'22px'},
  comedy:{accent:'#ffd400',accent2:'#ff5e5e',bg:'rgba(50,40,0,.72)',font:'Bangers',emoji:'😂',radius:'16px'},
  crime:{accent:'#c0c0c0',accent2:'#b30000',bg:'rgba(10,10,10,.85)',font:'Special Elite',emoji:'🕵️',radius:'2px'},
  documentary:{accent:'#7fb069',accent2:'#d9d9d9',bg:'rgba(15,25,15,.75)',font:'Roboto Condensed',emoji:'🎥',radius:'4px'},
  drama:{accent:'#b08968',accent2:'#e6ccb2',bg:'rgba(30,18,12,.78)',font:'Playfair Display',emoji:'🎭',radius:'6px'},
  family:{accent:'#4cc9f0',accent2:'#f9c74f',bg:'rgba(10,35,55,.72)',font:'Baloo 2',emoji:'🏠',radius:'20px'},
  fantasy:{accent:'#a855f7',accent2:'#34d399',bg:'rgba(25,10,50,.78)',font:'MedievalSharp',emoji:'🧙',radius:'12px'},
  history:{accent:'#c9a66b',accent2:'#7a5c3a',bg:'rgba(35,25,12,.8)',font:'IM Fell English',emoji:'📜',radius:'3px'},
  horror:{accent:'#d10000',accent2:'#4a0000',bg:'rgba(8,0,0,.88)',font:'Creepster',emoji:'🩸',radius:'0px'},
  music:{accent:'#ff3cac',accent2:'#784ba0',bg:'rgba(20,5,40,.75)',font:'Righteous',emoji:'🎵',radius:'14px'},
  mystery:{accent:'#6c8ebf',accent2:'#9d7bd8',bg:'rgba(8,12,28,.82)',font:'Cormorant Garamond',emoji:'🔍',radius:'6px'},
  romance:{accent:'#ff5d8f',accent2:'#ffc2d1',bg:'rgba(50,10,25,.7)',font:'Dancing Script',emoji:'💕',radius:'18px'},
  scifi:{accent:'#00e5ff',accent2:'#7c4dff',bg:'rgba(0,12,28,.8)',font:'Orbitron',emoji:'🚀',radius:'2px'},
  thriller:{accent:'#ff2e2e',accent2:'#ffffff',bg:'rgba(5,5,5,.88)',font:'Oswald',emoji:'⚡',radius:'0px'},
  war:{accent:'#7d8f4e',accent2:'#c2a14d',bg:'rgba(18,22,10,.85)',font:'Black Ops One',emoji:'🎖️',radius:'0px'},
  western:{accent:'#d97706',accent2:'#92400e',bg:'rgba(40,22,5,.8)',font:'Rye',emoji:'🤠',radius:'4px'},
  default:{accent:'#7200ff',accent2:'#0077ff',bg:'rgba(0,0,0,.35)',font:'Montserrat',emoji:'🎬',radius:'8px'}
};
const MAP = {28:'action',12:'adventure',16:'animation',35:'comedy',80:'crime',99:'documentary',18:'drama',
  10751:'family',14:'fantasy',36:'history',27:'horror',10402:'music',9648:'mystery',10749:'romance',
  878:'scifi',53:'thriller',10752:'war',37:'western',
  10759:'action',10762:'family',10765:'scifi',10768:'war',10764:'default',10766:'drama',10767:'default',10763:'documentary',10770:'default'};

function buildTheme(genres){
  const keys = genres.map(g => MAP[g.id]).filter(Boolean);
  const main = T[keys[0] || 'default'];
  const second = T[keys[1]] || main;
  return { key: keys[0] || 'default', ...main, accent2: keys[1] ? second.accent : main.accent2 };
}
module.exports = { buildTheme, T };
