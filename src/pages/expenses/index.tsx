// pages/expenses.tsx
import { GetServerSideProps, NextPage } from 'next';
import prisma from '../../../lib/prisma';

interface Expense {
  id: number;
  amount: number;
  reason: string;
}

interface ExpensesPageProps {
  expenses: Expense[];
}

const ExpensesPage: NextPage<ExpensesPageProps> = ({ expenses }) => {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            <p>Amount: {expense.amount}</p>
            <p>Reason: {expense.reason}</p>
          </li>
        ))}
      </ul>    
      </main>
  )
};

export const getServerSideProps: GetServerSideProps<ExpensesPageProps> = async () => {
  const expenses = await prisma.expense.findMany();
  return { props: { expenses } };
};

export default ExpensesPage;