import { create } from 'zustand'

const useStore = create((set)=>({
    MenuStatus:false,
    ComposeStatus:false,
    Data:{To:"",Subject:"", Body:""},
    toggleMenustatus:()=> set((state)=>({MenuStatus:!state.MenuStatus})),
    toggleComposestatus:()=> set((state)=>({ComposeStatus:!state.ComposeStatus})),
    setInputData: (newData) => set((state) => ({Data: { ...state.Data, ...newData } })),
}));

export default useStore