import React from 'react'
import { useQuery } from "@apollo/client";
import { MY_FIRST_QUERY } from './queries/MyFirstQuery'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text/dist/LoadingFakeText';

function HelloWorld() {
    
    const { loading, data } = useQuery(MY_FIRST_QUERY)
    if(loading)
        return <LoadingFakeText lines={10}/>

    return data?.myFirstEndpoint
}

export default HelloWorld;