import { create, StateCreator } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { IEpisode } from '../types/episodes';




interface IdataEpisode {
    name: string,
    episode: string
}

interface IEpisodeState {
    episodes: IEpisode[];
    setEpisodesStore: (transaction: IEpisode[]) => void;
    addEpisode: (newEpisode: IdataEpisode) => void;
    updateEpisode: (episodeId: number, newEpisodeData: IdataEpisode) => void;
    clearEpisode: () => void;
    // updateEpisodeStatus: (episodeId: number, newStatus: string) => void; // (No existe en el api de rick and morty status para 'episodio')
}



const storeApi: StateCreator<IEpisodeState> = (set, get) => ({
    episodes: [],

    setEpisodesStore: (Episodes: IEpisode[]) => { set({ episodes: Episodes }) },
    //agregar nuevo episodio
    addEpisode: (newEpisode: IdataEpisode) => {
        const newEpisodeData = {
            id: Date.now(),
            ...newEpisode,
            air_date: 'unknown',
            characters: [],
            url: '',
            created: new Date().toISOString(),
        }
        set((state) => ({ episodes: [...state.episodes, newEpisodeData] }))
    },
    //Actualizar el episodio
    updateEpisode: (episodeId: number, newEpisodeData: IdataEpisode) => {
        set((state) => ({
            episodes: state.episodes.map((episode) =>
                episode.id === episodeId ? { ...episode, ...newEpisodeData } : episode
            ),
        }));
    },
    clearEpisode: () =>set({ episodes: [] })
    //Actualizar solo el status (No existe en el api de rick and morty status para 'episodio')
    // updateEpisodeStatus: (episodeId: number, newStatus: string) => {
    //     set((state) => ({
    //         episodes: state.episodes.map((episode) =>
    //             episode.id === episodeId ? { ...episode, status: newStatus } : episode
    //         ),
    //     }));
    // }

})


export const useEpisodeStore = create(
    persist(
        storeApi,
        {
            name: 'episode-store',
            storage: createJSONStorage(() => localStorage)
        }
    )
);