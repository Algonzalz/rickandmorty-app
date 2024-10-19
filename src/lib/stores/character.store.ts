import { create, StateCreator } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Gender, ICharacter, Species } from '../types';




interface IdataCharacter {
    name: string,
    gender: string,
    type: string,
    species: string,
}

interface ICharacterState {
    characters: ICharacter[];
    setCharactersStore: (transaction: ICharacter[]) => void;
    addCharacter: (newCharacter: IdataCharacter) => void;
    updateCharacter: (characterId: number, newCharacterData: IdataCharacter) => void;
    updateCharacterStatus: (characterId: number, newStatus: string) => void;
    clearCharacters: () => void;
}



const storeApi: StateCreator<ICharacterState> = (set, get) => ({
    characters: [],

    setCharactersStore: (transaction: ICharacter[]) => { set({ characters: transaction }) },
    //agregar nuevo Personaje
    addCharacter: (newCharacter: IdataCharacter) => {
        const newCharacterData = {
            id: Date.now(),
            status: 'unknown',
            ...newCharacter,
            location: '',
            origin: '',
            image: '',
            episode: [],
            url: '',
            created: new Date().toISOString(),
        }
        set((state) => ({ characters: [...state.characters, newCharacterData] }))
    },
    //Actualizar el Personaje
    updateCharacter: (characterId: number, newCharacterData: IdataCharacter) => {
        set((state) => ({
            characters: state.characters.map((character) =>
                character.id === characterId ? { ...character, ...newCharacterData } : character
            ),
        }));
    },
    //Actualizar solo el status 
    updateCharacterStatus: (characterId: number, newStatus: string) => {
        set((state) => ({
            characters: state.characters.map((character) =>
                character.id === characterId ? { ...character, status: newStatus } : character
            ),
        }));
    },
    clearCharacters: () => set({ characters: [] })


})


export const useCharacterStore = create(
    persist(
        storeApi,
        {
            name: 'character-store',
            storage: createJSONStorage(() => localStorage)
        }
    )
);