import { makeVar } from "@apollo/client";

export const orderVar = makeVar([
  {
    orderNo: 1,
    date: Date.now() - 20 * 1000 * 60 * 60 * 24,
    product: "wonder",
    amount: 36700,
    status: "PENDING",
		image: '/images/product-1.png'
  },
  {
    orderNo: 2,
    date: Date.now() - 20 * 1000 * 60 * 60 * 24,
    product: "perform",
    amount: 36700,
    status: "COMPLETE",
  },
  {
    orderNo: 3,
    date: Date.now() - 20 * 1000 * 60 * 60 * 24,
    product: "harmony",
    amount: 36700,
    status: "IN_PRODUCTION",
  },
]);
