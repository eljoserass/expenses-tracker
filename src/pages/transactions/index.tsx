// pages/expenses.tsx
import { GetServerSideProps, NextPage } from 'next';
import prisma from '../../../lib/prisma';
import { getSession, useSession } from 'next-auth/react';
import Layout from '../../components/Layout';
import { Container, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';

interface Transaction {
  userId: string
  id: number;
  amount: number;
  reason: string;
  label: string;
  createdAt: string
}

interface TransactionsPageProps {
  transactions: Transaction[];
}

const TransactionsPage: NextPage<TransactionsPageProps> = ({ transactions }) => {

  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
        <Container>
          <Text> Log in to use features </Text>
        </Container>
      </Layout>
    )
  }

  const tableData = transactions.map((transaction) => (
    <Tr>
          <Td isNumeric>{transaction.amount}</Td>
          <Td> {transaction.reason}</Td>
          <Td >{transaction.label}</Td>
          <Td>{transaction.createdAt} </Td>
    </Tr>
  ))
  console.log(transactions)
  return (
    <Layout>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th isNumeric>amount</Th>
              <Th>reason</Th>
              <Th>label</Th>
              <Th>date</Th>
              
            </Tr>
          </Thead>
          <Tbody>
            {tableData}
          </Tbody>
        </Table>
      </TableContainer>
    </Layout>  
  )
};

// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {

//   const session = await getSession({ req });

//   if (!session) {

//     res.statusCode = 403;

//     return { props: { transactions: [] } };

//   }

//   console.log("fetching from db")

//   const transactions = await prisma.transaction.findMany({

//     where: {

//       user: { email: session.user.email }

//     },

//     // include: {

//     //   label: {

//     //     select: { name: true },

//     //   },

//     // },

//   });
//   return {
//     props: {
//       transactions: transactions || [], 
//     },
//   };

// };

export const getServerSideProps: GetServerSideProps<TransactionsPageProps> = async () => {
   const transactions = await prisma.transaction.findMany({  });
   
   const transactionsProp = await transactions.map(transaction => ({
    ...transaction,
    createdAt: transaction.createdAt.toISOString(),
  }));
   return { props: { transactions: transactionsProp } };
 };


// export const getServerSideProps: GetServerSideProps<TransactionsPageProps> = async ({ req, res }) => {

//   const session = await getSession({ req });

//   if (!session) {

//     res.statusCode = 403;
    
//     return { props: { transactions: [] } };
    
//   }
//     const user = await prisma.user.findUnique({
//       where: { 
//         email: session.user.email 
//       },
//       include: {
//         transactions: true,
//       },
//     });

//     return {
//       props: { 
//         transactions: user.transactions || [],
//       }, 
//     }

// }
export default TransactionsPage;