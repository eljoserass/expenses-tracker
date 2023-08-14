// pages/expenses.tsx
import { GetServerSideProps, NextPage } from 'next';
import prisma from '../../../lib/prisma';
import { getSession, useSession } from 'next-auth/react';
import Layout from '../../components/Layout';
import { Container, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';

interface Label {
  id: number;
  name: string
}

interface Transaction {
  id: number;
  amount: number;
  reason: string;
  label: Label
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
          <Td>{transaction.reason}</Td>
          <Td >{transaction.label.name}</Td>
      </Tr>
  ))
  return (
    <Layout>
    <TableContainer>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th isNumeric>amount</Th>
            <Th>reason</Th>
            <Th>label</Th>
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

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {

  const session = await getSession({ req });

  if (!session) {

    res.statusCode = 403;

    return { props: { transactions: [] } };

  }


  const transactions = await prisma.transaction.findMany({

    where: {

      user: { email: session.user.email }

    },

    include: {

      label: {

        select: { name: true },

      },

    },

  });

  return {
    props: {
      transactions: transactions || [], // Ensure transactions is an array
    },
  };

};



// export const getServerSideProps: GetServerSideProps<TransactionsPageProps> = async () => {
//   const transactions = await prisma.transaction.findMany({  });
//   return { props: { transactions } };
// };

export default TransactionsPage;