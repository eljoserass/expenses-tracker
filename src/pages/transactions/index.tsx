// pages/expenses.tsx
import { GetServerSideProps, NextPage } from 'next';
import prisma from '../../../lib/prisma';

interface Transaction {
  id: number;
  amount: number;
  reason: string;
}

interface TransactionsPageProps {
  transactions: Transaction[];
}

const TransactionsPage: NextPage<TransactionsPageProps> = ({ transactions }) => {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <p>Amount: {transaction.amount}</p>
            <p>Reason: {transaction.reason}</p>
          </li>
        ))}
      </ul>    
      </main>
  )
};

export const getServerSideProps: GetServerSideProps<TransactionsPageProps> = async () => {
  const transactions = await prisma.transaction.findMany({  });
  return { props: { transactions } };
};

export default TransactionsPage;