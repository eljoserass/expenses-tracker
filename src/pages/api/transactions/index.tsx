
import { getServerSession } from "next-auth/next"
import { options } from '../auth/[...nextauth]'
import prisma from '../../../../lib/prisma';


export default async function handle(req, res) {

  const { amount, reason, label } = req.body;


  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }
  const session = await getServerSession(req, res, options);

  if (!session) {
    return res.status(401).json({ error: `Not Authenticated request is: ${req}` });
   }

  try {
    const result = await prisma.transaction.create({
      data: {
        amount: Number(amount),
        reason: reason,
        label: label,
        user: {
          connect: {
            email: session.user.email
          }
        }
      }
    })
  } catch (error) {
      console.error('Error creating transaction:', error);
      res.status(500).json({ error: 'An error occurred while creating the transaction' });
    }
  }
