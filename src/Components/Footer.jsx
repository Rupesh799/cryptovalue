import { Avatar, Box, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  return (
    <Box
      bgColor={"purple.400"}
      color={"whiteAlpha.400"}
      minH={"45vh"}
      px={"16"}
      py={["16", "8"]}
      
    >

        <Stack direction={["column","row"]} height={"full"} alignItems={"center"} mt={'16'} >

            <VStack w={"full"} alignItems={["center","flex-start"]} >
            <Text fontWeight={"bold"} fontSize={"5xl"} color={"blackAlpha.800"}>About Us</Text>
            <Text color={"blackAlpha.800"} letterSpacing={"widest"} textAlign={["center","left"]}>We privide the fastest trading market of cryptocurrency in realtime.</Text>
            </VStack>

            <VStack>
                <Avatar boxSize={"32"} mt={["4","0"]}/>
                <Text color={"blackAlpha.700"}>Our Founder</Text>
            </VStack>

        </Stack>
    </Box>
  );
};

export default Footer;
