import { Badge, Box, Button, Container, HStack, Image, Progress, Radio, RadioGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react'
import axios from 'axios';
import React ,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { server } from '..';
import Loader from './Loader';
import Error from './Error';
import Chart from './Chart';

const CoinsDetails = () => {
  // id lina lai hamile useparams use gareko
  const params = useParams()
  const [coinDetail, setCoinDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [error ,setError] = useState("")
  const [currency, setCurrency] = useState("usd")
  const [days,setDays] =useState("24h")
  const [chartArray,setChartArray] = useState([])

  const currencySymbol = currency==="usd"?"$":"€"
  
  //yaha hamile hr wise category garera btn rakhna ko lagi time ko array banako.
  const btn = ["24h","7d","14d","30d","60d","200d","1y","max"]

  const switchChartDays =(key)=>{
        switch (key) {
          case "24h":
            setDays("24h");
            setLoading(true)
            break;

            case "7d":
              setDays("7d");
              setLoading(true)
              break;

              case "14d":
                setDays("14d");
                setLoading(true)
                break;

                case "30d":
                  setDays("30d");
                  setLoading(true)
                  break;

                  case "60d":
                    setDays("60d");
                    setLoading(true)
                    break;

                    case "200d":
                      setDays("200d");
                      setLoading(true)
                      break;

                      case "1y":
                        setDays("365d");
                        setLoading(true)
                        break;

                        case "max":
                          setDays("max");
                          setLoading(true)
                          break;
        
          default:
            setDays("24h");
            setLoading(true)
            break;
        }
  }

useEffect(()=>{
  const fetchDetails =async()=>{
    try{
      const {data} = await axios.get(`${server}/coins/${params.id}`);
      const {data:chartData} = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);
    setCoinDetail(data);
    setChartArray(chartData.prices)
   
    setLoading(false);
    }
    catch(error){
          setError(true);
          setLoading(false)
    }
  };
  fetchDetails();
}, [params.id, currency,days]);

if(error) return (<Error message={"404: data not found"}/>)
  
  return (
    <Container maxW={"container.xl"}>
        {
          loading?<Loader/>:(
            <>
              <Box width={"full"} borderWidth={1}>
                <Chart arr={chartArray} currency={currencySymbol} days={days}/>
              </Box>


              <HStack p={"4"} overflowX={"auto"}>
                {
                  btn.map((i)=>(
                    <Button key={i} onClick={()=>(switchChartDays(i))}>{i}</Button>
                  )

                  )
                }

              </HStack>

              <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
                <HStack spacing={"4"}>
                  <Radio value={"usd"}>USD</Radio>
                  <Radio value={"eur"}>EUR</Radio>
                </HStack>
              </RadioGroup>

              <VStack spacing={"4"} alignItems={"flex-start"} p="16">
              <Text fontSize={"small"} alignSelf={"center"}>
                Last Updated On {" "} {Date(coinDetail.market_data.last_updated).split("G")[0]}
              </Text>
              <Image src={coinDetail.image.large} w={"16"} h={"16"} objectFit={"contain"}/>

              <Stat >
                <StatLabel>{coinDetail.name}</StatLabel>
                <StatNumber>{currencySymbol}{coinDetail.market_data.current_price[currency]}</StatNumber>
                <StatHelpText>
                <StatArrow type={coinDetail.market_data.price_change_percentage_24h>coinDetail.market_data.low_24h?"increase":"decrease"}/>
                {coinDetail.market_data.price_change_percentage_24h}%
              </StatHelpText>
              </Stat>

            <Badge fontSize={"xl"} >
              {`#${coinDetail.market_cap_rank}`}
            </Badge>
             
             <CustomBar 
             high={`${currencySymbol}${coinDetail.market_data.high_24h[currency]}`} 
             low={`${currencySymbol}${coinDetail.market_data.low_24h[currency]}`}/>

             <Box w={"full"} p={"4"} >
              <Item  title={"Max Supply"} value={coinDetail.market_data.max_supply}/>
              <Item title={"Cirulating Supply"} value={coinDetail.market_data.circulating_supply}/>
              <Item title={"Market Capital"} value={`${currencySymbol}${coinDetail.market_data.market_cap[currency]}`}/>
              <Item title={"All Time Low"} value={`${currencySymbol}${coinDetail.market_data.atl[currency]}`}/>
              <Item title={"All Time High"} value={`${currencySymbol}${coinDetail.market_data.ath[currency]}`}/>

             </Box>

              </VStack>
            </>

          )
        }

    </Container>
  )
}


const CustomBar =({high,low})=>(
    <VStack w={"full"}>
      <Progress w={"full"} value={50} colorScheme={"purple"}/>
      <HStack justifyContent={"space-between"} w={"full"}>
        <Badge children={low} colorScheme={"red"}/>
          <Text fontSize={"sm"}>24hr</Text>
          
          <Badge children={high} colorScheme={"green"} /> 
        
      </HStack>
    </VStack>
)

const Item =({title,value})=>(
  <HStack justifyContent={"space-between"} w={'full'}>
    <Text fontWeight={"bold"}>{title}</Text>
    <Text>{value}</Text>
  </HStack>
)
export default CoinsDetails