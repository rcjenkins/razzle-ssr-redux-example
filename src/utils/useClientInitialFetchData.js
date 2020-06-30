import { useEffect } from 'react';
import { useStore } from 'react-redux';
import { useLocation } from 'react-router-dom'

// run the initialFetchData function on the client only
const useClientInitialFetchData= (initialFetchData) => {
    const store = useStore()
    let location = useLocation();
    
    const hasWindow = (typeof window !== 'undefined')
    useEffect(()=>{
        if(hasWindow){
            initialFetchData({...store, path:location.pathname})
        }
    }, [])
}

export default useClientInitialFetchData;