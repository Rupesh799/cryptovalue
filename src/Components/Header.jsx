import { Button, HStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <HStack
    p={"4"}
    shadow={"base"}
    bgColor={"purple.400"}
    >
      <Button variant={"ghost"} textTransform={"uppercase"}  >
        <Link to={"/"}>Home</Link>
      </Button>
      <Button variant={"ghost"} textTransform={"uppercase"}  >
        <Link to={"/exchanges"}>Exchanges</Link>
      </Button>
      <Button variant={"ghost"} textTransform={"uppercase"}  >
        <Link to={"/coins"}>Coins</Link>
      </Button>
    </HStack>
  )
}

export default Header