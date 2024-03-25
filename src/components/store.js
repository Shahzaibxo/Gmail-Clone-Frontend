import { create } from 'zustand'

const useStore = create((set) => ({
    themestatus: false,
    SideMenuStatus: false,
    ComposeStatus: false,
    ComposeStatus2:false,
    ErrorbarStatus: false,
    MainCheckboxStatus: false,
    refreshscreenstate: true,
    error: "",
    selectedarray: [],
    clearSelectedArray: () => set({ selectedarray: [] }),
    removeFromStringArray: (stringToRemove) => set((state) => ({
        selectedarray: state.selectedarray?.filter(item => item !== stringToRemove) // Remove the string if it is present
    })),
    appendToStringArray: (newString) => set((state) => {
        if (!state.selectedarray.includes(newString)) {
            return { selectedarray: [...state.selectedarray, newString] };
        }
        return state; // If the string is already in the array, return the current state
    }),
    togglefunction: (key) => set((state) => ({ [key]: !state[key] })),
    falsemark: (key) => set((state) => ({ [key]: false })),
    truemark: (key) => set((state) => ({ [key]: true })),
    setStringValue: (newValue) => set({ error: newValue }),
}));

export default useStore