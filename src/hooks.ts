import { type Store, useStore } from "./store";
import { togglePlay } from "./audio";
import { shallow } from "zustand/shallow";

const selector = (id: string) => (store: Store) => ({
    tooglePlay: (e: React.ChangeEvent<HTMLInputElement>) => store.updateNode(id, { play: e.target.checked })
});

export const usePlay = (id: string) =>  {
    const store = useStore(selector(id),shallow);
    const togglePlayButton = ()=>async (e:React.ChangeEvent<HTMLInputElement>)=>{
        store.tooglePlay(e);
        await togglePlay();
    }
    return {togglePlayButton};
}