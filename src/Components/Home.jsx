import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react'
import coin from "../Assets/coin2.png"
import { motion } from 'framer-motion'

const Home = () => {
  return (
    <Box bgColor={"purple.400"} w={"full"} h={"85vh"}>

     <motion.div style={{
      height:"80vh",
     }}
     animate={{
      translateY:"20px",
     }}

     transition={{
      duration:2,
      repeat: Infinity,
      repeatType:"reverse",
     }}
     >

     <Image src={coin} w={"full"} h={"full"} objectFit="contain" filter={"grayscale(0.6)"}/>
     </motion.div>

      <Text fontSize={"6xl"} textAlign="center" fontWeight={"thin"}
      color={"black.400"}
      mt={"-20"}
      >CryptoZenes</Text>
    </Box>
  )
}

export default Home