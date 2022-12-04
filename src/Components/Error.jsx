import { Alert, AlertIcon } from '@chakra-ui/react'
import React from 'react'

const Error = ({message}) => {
  return (
    <Alert status='error'  position={"fixed"} justifyContent={"center"}>

    <AlertIcon/>
        {message}
    </Alert>
  )
}

export default Error