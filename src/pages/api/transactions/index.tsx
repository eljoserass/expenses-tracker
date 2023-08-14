import { getSession } from 'next-auth/react';

import prisma from '../../../../lib/prisma';


export default async function handle(req, res) {

  const { amount, reason, labelId } = req.body;


  const session = await getSession({ req });

  const result = await prisma.transaction.create({
    data: {
      amount: amount,
      reason: reason,
      label: {connect: {id: labelId}},
      user: { connect: { email: session?.user?.email }}
    },

  });

  res.json(result);

}