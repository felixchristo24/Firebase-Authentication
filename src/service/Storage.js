export const storeUserData = (id)=>{
    localStorage.setItem('idToken',id)
}

export const getUserID = ()=>{
   return localStorage.getItem('idToken')
}

export const gremoveUserID = ()=>{
    return localStorage.removeItem('idToken')
 }
 