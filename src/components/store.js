import { create } from 'zustand'

const useStore = create((set)=>({
    SideMenuStatus:false,
    ComposeStatus:false,
    ErrorbarStatus:false,
    MainCheckboxStatus:false,
    refreshscreenstate:true,
    error:"",
    togglefunction: (key) => set((state) => ({ [key]: !state[key] })),
    falsemark: (key) => set((state) => ({ [key]: false })),
    setStringValue: (newValue) => set({ error: newValue }),
}));

export default useStore