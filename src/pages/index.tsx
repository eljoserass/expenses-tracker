import React from "react"
import Layout from "../components/Layout"
import { HStack, Text ,Container,VStack, Select ,Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Textarea, Flex, Spacer, AbsoluteCenter, Box, Center } from "@chakra-ui/react"
import { useSession } from "next-auth/react";



export default function Home() {

  const { data: session, status } = useSession(); 
  return (
    <Layout>
    { session ? 
    <Container paddingStart={5}>
      <VStack p={3} spacing={3}>
        <HStack>
          <NumberInput variant={"filled"} defaultValue={15} precision={2} step={0.1}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Select variant='filled' placeholder='Label' >
              <option value='Mansion'>Mansion</option>
              <option value='Mobility'>Mobility</option>
              <option value='Meals'>Meals</option>
          </Select>
        </HStack>
        <Box borderRadius='md' w='90%'>
          <Textarea size={"sm"} resize={"vertical"} variant="filled" placeholder='Reason of the expense' />
        </Box>
      </VStack>
      </Container>:
      <Container>
        <Center>Login to use features</Center>
      </Container> 
      }
    </Layout>
  )
  
}
