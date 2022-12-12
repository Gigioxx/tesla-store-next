import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { Order, Product, User } from '../../../models';

type Data = {
  numberOfOrders: number;
  paidOrders: number;
  notPaidOrders: number;
  numberOfClients: number;
  numberOfProducts: number;
  productsWithoutInventory: number;
  lowInventoryProducts: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await db.connect();

  const [
    numberOfOrders,
    paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithoutInventory,
    lowInventoryProducts,
  ] = await Promise.all([
    Order.count(),
    Order.count({ isPaid: true }),
    User.count({ role: 'client' }),
    Product.count(),
    Product.count({ inStock: 0 }),
    Product.count({ inStock: { $lte: 10 } }),
  ]);

  await db.disconnect();

  return res.status(200).json({
    numberOfOrders,
    paidOrders,
    notPaidOrders: numberOfOrders - paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithoutInventory,
    lowInventoryProducts,
  });
}
