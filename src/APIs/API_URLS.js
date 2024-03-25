export const API_URLS={
    saveSentEmail:{
        method: "POST",
        endpoint: "saveEmail"
    },
    getEmailfromparam:{
        method:"GET",
        endpoint:"emails"
    },
    saveDraftEmail:{
        method:"POST",
        endpoint:"Savedraft"
    },
    movetobin:{
        method:"DELETE",
        endpoint:"movetobin"
    },
    togglestar:{
        method:"PUT",
        endpoint:"starmark"
    },
    updatedraft:{
        method:"PUT",
        endpoint:"updatedraft"
    },
    sentfromdraft:{
        method:"POSt",
        endpoint:"sentfromdraft"
    }
}