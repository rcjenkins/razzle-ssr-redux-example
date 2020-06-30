import {useEffect} from 'react';
import { useStore} from 'react-redux';

// run the initialFetchData function on the client only
const useClientInitialFetchData= (initialFetchData) => {
    const store = useStore()
    const hasWindow = (typeof window !== 'undefined')
    useEffect(()=>{
        if(hasWindow){
            initialFetchData({...store})
        }
    }, [])
}

export default useClientInitialFetchData;