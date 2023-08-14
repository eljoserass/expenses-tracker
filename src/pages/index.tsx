import React, { useState } from "react"
import Layout from "../components/Layout"
import { HStack, Text ,Container,VStack, Select ,Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Textarea, Flex, Spacer, AbsoluteCenter, Box, Center, Button, useToast } from "@chakra-ui/react"
import { useSession } from "next-auth/react";
import Router from 'next/router';



export default function Home() {

  const [amount, setAmount] = useState(0.0);

  const [reason, setReason] = useState("");

  const [labelId, setLabelId] = useState(-1)

  const toast = useToast()

  const submitData = async (e: React.SyntheticEvent) => {
    
    e.preventDefault();
  
    if (amount <= 0.1 || labelId === -1) {
      toast({
        title: 'Expense Could not be created',
        description: "Enter amount or Label",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      return
    }
    try {
      
      const body = { amount, reason, labelId };
  
      const res = await fetch('/api/transactions', {
  
        method: 'POST',
  
        headers: { 'Content-Type': 'application/json' },
  
        body: JSON.stringify(body),
  
      });
  
      await Router.push('/');
      toast({
        title: 'Expense Created',
        description: "Expense Added in the database",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
  
    } catch (error) {
      toast({
        title: 'Expense Could not be created',
        description: "server reason: " + error,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      console.error(error);
      alert(error)
    }
  
  };

  const { data: session, status } = useSession(); 
  return (
    <Layout>
    { session ? 
    <Container paddingStart={5}>
      <VStack p={3} spacing={3}>
        <HStack>
          <NumberInput onChange={(e) => {setAmount(Number(e))}} variant={"filled"} defaultValue={0.0} precision={2} step={0.1}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Select onChange={(e) => {setLabelId(Number(e))}} variant='filled' placeholder='Label' >
              <option value={0}>Mansion</option>
              <option value={1}>Mobility</option>
              <option value={2}>Meals</option>
              <option value={3}>Income</option>
          </Select>
        </HStack>
        <Box borderRadius='md' w='90%'>
          <Textarea value={reason} onChange={(e) => {
            let inputValue = e.target.value
            setReason(inputValue)
          }} size={"sm"} resize={"vertical"} variant="filled" placeholder='Reason of the expense' />
        </Box>
        <Box>
          <Button onClick={submitData}>
            Submit
          </Button>
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
