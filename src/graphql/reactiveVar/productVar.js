import { makeVar } from "@apollo/client";

export const productVar = makeVar({
	product: {
		id: 2,
		name: "wonder",
		notification: "NEW",
		image: "images/product-1.png",
		quantity: 10,
		cost: 6.88,
		units: 5_000,
		rrp: 198_000,
		margin: 96.56,
		productionTime: "40 days",
	},
  products: [
    {
      id: 2,
      name: "wonder",
      notification: "NEW",
      image: "images/product-1.png",
    },
    { id: 3, name: "magic", notification: 23, image: "images/product-2.png" },
    {
      id: 4,
      name: "mystical",
      notification: 400,
      image: "images/product-3.png",
    },
    {
      id: 5,
      name: "wonder",
      notification: "NEW",
      image: "images/product-1.png",
    },
    { id: 6, name: "magic", notification: 23, image: "images/product-2.png" },
    {
      id: 7,
      name: "wonder",
      notification: "NEW",
      image: "images/product-3.png",
    },
    {
      id: 8,
      name: "wonder",
      notification: "NEW",
      image: "images/product-1.png",
    },
    { id: 9, name: "magic", notification: 23, image: "images/product-2.png" },
    {
      id: 10,
      name: "mystical",
      notification: 400,
      image: "images/product-3.png",
    },
    { id: 11, name: "magic", notification: 23, image: "images/product-1.png" },
    {
      id: 12,
      name: "mystical",
      notification: 400,
      image: "images/product-2.png",
    },
    {
      id: 13,
      name: "mystical",
      notification: 400,
      image: "images/product-1.png",
    },
    {
      id: 14,
      name: "wonder",
      notification: "NEW",
      image: "images/product-3.png",
    },
    { id: 15, name: "magic", notification: 23, image: "images/product-1.png" },
    {
      id: 16,
      name: "mystical",
      notification: 400,
      image: "images/product-1.png",
    },
  ],
});
