const context = new AudioContext();
const nodes = new Map();
 
const osc = context.createOscillator();
osc.frequency.value = 220;
osc.type = 'square';
osc.start();
 
const amp = context.createGain();
amp.gain.value = 0.5;
 
const out = context.destination;
 
nodes.set('a', osc);
nodes.set('b', amp);
nodes.set('c', out);

export function updateAudioNode(id:string, data:Record<string,any>) {
  const node = nodes.get(id);
 
  for (const [key, val] of Object.entries(data)) {
    if (node[key] instanceof AudioParam) {
      node[key].value = val;
    } 
    // else {
    //   node[key] = val;
    // }
  }
}

export function removeAudioNode(id:string){
    const node = nodes.get(id);
    node.disconnect();
    node.stop?.();
    nodes.delete(id);
}

export function connect(sourceId:string, targetId:string){
    const source = nodes.get(sourceId);
    const target = nodes.get(targetId);
    source.connect(target);
}

export function disconnect(sourceId:string, targetId:string) {
    const source = nodes.get(sourceId);
    const target = nodes.get(targetId);
    source.disconnect(target);
}