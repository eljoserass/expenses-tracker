import React, { useEffect, useState } from "react"
import Layout from "../components/Layout"
import { HStack, Text ,Container,VStack, Select ,Input, FormErrorMessage, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Textarea, Flex, Spacer, AbsoluteCenter, Box, Center, Button, useToast, FormControl } from "@chakra-ui/react"
import { useSession } from "next-auth/react";
import Router from 'next/router';
import { Form, Formik, Field} from "formik";



export default function Home() {

  const [isSuccess, setisSuccess] = useState(true)
  const validateAmount = (value) => {
    let error = ""
    if (!value) {
      error = "amount is required"
    } else if (isNaN(value) === true) {
      error = "amount must be a number"
    } else if (Number(value) === 0) {
      error = "amount should be different than 0"
    }
    return (error)
  }

  const validateReason = (value) => {

  }

  const validateLabel = (value) => {

  }

  const toast = useToast()

  const submitData = async ({amount, reason, label, actions}) => {
  
      const body = { amount, reason, label };
      
      fetch('/api/transactions', {
  
        method: 'POST',
  
        headers: { 'Content-Type': 'application/json' },
  
        body: JSON.stringify(body),
        
      }).then(() => {
        setisSuccess(true)
       
      }).catch(() => {
        setisSuccess(false)

      })
      
      
  };

  const { data: session, status } = useSession(); 
  return (
    <Layout>
    { session ? 
    <Container paddingStart={5}>
      <Formik 
        initialValues={{amount: 0.00, reason: "", label: "Label"}}
        onSubmit={(values, actions) => {
            
            setTimeout (() => {
              submitData({amount: values.amount, reason: values.reason, label: values.label, actions: actions})
              actions.setSubmitting(false)
              toast({
                title: 'Transaction Added',
                description: "",
                status: 'success',
                duration: 9000,
                isClosable: true,
              })
            }, 2000)

            
        }}
      >
      {(props) => (
        <Form>
        <VStack p={3} spacing={3}>
          <HStack>
            <Field name="amount" validate={validateAmount}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.amount && form.touched.amount}>
                <NumberInput variant={"filled"} precision={2} step={0.1}>
                  <NumberInputField  placeholder="amount" {...field} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
            </Field>
            
            <Field name="label" validate={validateLabel}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.label && form.touched.label}>
                <Select variant='filled' placeholder='label' {...field}>
                  <option value="Mansion">Mansion</option>
                  <option value="Mobility">Mobility</option>
                  <option value="Meals">Meals</option>
                  <option value="Income">Income</option>
                </Select>
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
              )}
            </Field>
          </HStack>
          <Box borderRadius='md' w='90%'>
            <Field name="reason" validate={validateReason}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.reason && form.touched.reason}>
              <Textarea  resize={"vertical"} variant="filled" placeholder='reason' {...field}/>
              <FormErrorMessage>{form.errors.reason}</FormErrorMessage>
              </FormControl>
            )}
            </Field>
          </Box>
          <Box>
            <Button isLoading={props.isSubmitting} mt={"4"} type="submit">
              Submit
            </Button>
          </Box>
        </VStack>
        </Form>
      )}
      </Formik>
      </Container>:
      <Container>
        <Center>Login to use features</Center>
      </Container> 
      }
    </Layout>
  )
  
}
