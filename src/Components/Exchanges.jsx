import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import { Container, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import Loader from "./Loader";
import Error from "./Error";

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error ,setError] = useState("")

  useEffect(() => {
    const fetchExchanges = async () => {
     try {
      const { data } = await axios.get(`${server}/exchanges`);

      setExchanges(data);
      setLoading(false);
     } catch (error) {
        setError(true)
      setLoading(false)
     }
    
    };
    fetchExchanges();
  }, []);

  if(error) return(<Error message={"Error : 404 not found"}/>)
  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {exchanges.map((i) => (
              <ExchangeCard
              key={i.id}
                name={i.name}
                img={i.image}
                rank={i.trust_score_rank}
                url={i.url}
              />
           
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

const ExchangeCard = ({ name, img, url, rank }) => (
  <a href={url} target={'blank'}>

    <VStack w={['52']} borderRadius={"lg"} shadow={"lg"} p={"8"} m={"4"} transition={"all 0.3s"}
    css={{
          "&:hover":{
            transform:"scale(1.1)"
          }
    }}
    >

    <Image src={img} w={"10"} h={"10"} objectFit={"contain"}/>
    <Heading size={"md"} noOfLines={1}>{rank}</Heading>
    <Text noOfLines={1}>{name}</Text>
    </VStack>
  </a>
);

export default Exchanges;
