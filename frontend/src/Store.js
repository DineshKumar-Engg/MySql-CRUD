import { createContext, useState } from "react";

export const Store = createContext(); 

export function StoreProvider(props){
    const [user,Setuser]=useState([])



    const dispatchEvent = (action,payload)=>{
        switch(action){
            case "DATA":
                Setuser(payload.userId)
                return

            default:
                return
        }
    }

    const   value ={user,dispatchEvent}
    return <Store.Provider value={value}>
                {props.children}
            </Store.Provider>
}


















// import { createContext,useReducer, useState } from "react";

// export const Store = createContext(); //------------ over


// export function StoreProvider(props){

// const [id,setId]=useState([])

// const dispatchEvent =(action,payload)=>{


//         switch(action.type){
//                     case "DATA":
//                         setId([payload.user])    
//                     return;
                    
//                     default:
//                     return 
//                 }
//     }

//     const initialState = {
//         user:id
//     }
//     const [state,dispatch]=useReducer(dispatchEvent,initialState)
   
//     const   value ={state,dispatch}
//     return <Store.Provider value={value}>{props.children}</Store.Provider>
// }


