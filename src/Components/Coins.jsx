import { Button, Container, HStack, Radio, RadioGroup } from '@chakra-ui/react'
import React ,{useState,useEffect} from 'react'
import Loader from './Loader';
import CoinCard from './CoinCard';
import axios from 'axios';
import { server } from "../index";
import Error from './Error';


const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error ,setError] = useState("")
  const [page,setPage] = useState(1)
  const [currency, setCurrency] = useState("usd")


  const changePage =(page)=>{
    setPage(page)
    setLoading(true)
  }

  const currencySymbol = currency==="usd"?"$":"€"

  const nxtbtn = new Array(132).fill(1)


  //yaha hamile data lai fetch gareko from axios
useEffect(()=>{
      const fetchCoins =async()=>{ 

        try{
              const {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)
              setCoins(data);
              console.log(data);
              setLoading(false)
        }
        catch(eror){
          setError(true)
          setLoading(false)
        }
      };
      fetchCoins();

      
},[currency,page])
//if incase there is problem in url 
if(error) return (<Error message={"Error : 404 not found"}/>)
  
  return (
   <Container maxW={"container.xl"}>
      {loading?(<Loader/>):(
        <>

        
          <RadioGroup value={currency} onChange={setCurrency}>
            <HStack spacing={"8"} p={"8"}>
          <Radio value={"usd"}>USD</Radio>
          <Radio value={"eur"}>EUR</Radio>

            </HStack>
      
          </RadioGroup>
        

        <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
          {
            coins.map((i)=>(
              <CoinCard 
              id={i.id}
              key={i.id}
              img={i.image}
              name={i.name}
              symbol={i.symbol}
              price={i.current_price}
              currencySymbol={currencySymbol}
              />
            ))
          }

        </HStack>

        <HStack w={"full"} p={'8'} overflowX={"auto"}>
          {
            nxtbtn.map((items,index)=>(
              <Button bgColor={"blackAlpha.700"} color={"white"} onClick={()=>changePage(index+1)}>{index +1}</Button>
            ))
          }
        </HStack>
        </>
      )}

   </Container>
  )
}

export default Coins