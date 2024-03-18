import { create } from 'zustand'

const useStore = create((set)=>({
    SideMenuStatus:false,
    ComposeStatus:false,
    ErrorbarStatus:false,
    MainCheckboxStatus:false,
    refreshscreenstate:true,
    payload:{
        to:"",
        from:"samiiwork1@gmail.com",
        subject:"",
        body: "",
        date: new Date(),
        image:"",
        name: "Shahzaib uddin",
        starred: false,
        type:"sent",
        checked:false,
        inbox:false
    },
    togglefunction: (key) => set((state) => ({ [key]: !state[key] })),
    falsemark: (key) => set((state) => ({ [key]: false })),
    setpayloadData: (newpayload) => set((state) => ({payload: { ...state.payload, ...newpayload } })),
}));

export default useStore