import { makeVar } from "@apollo/client";

export const activityFeedVar = makeVar({
  ALL: [
    {
      product: "wonder",
      time: Date.now(),
      content:
        "Production on all components has been accepte don Wonder. You product is in full production",
      image: "images/product-1.png",
      track: "PRODUCTION",
    },
    {
      product: "harmony",
      time: Date.now() - 1 * 1000 * 60 * 60 * 24,
      image: "images/product-2.png",
      content: "Production of labels is 75% completed. QA to begin to tomorrow",
    },
    {
      product: "perform",
      time: Date.now() - 2 * 1000 * 60 * 60 * 24,
      image: "images/product-2.png",
      content:
        "10,000 units of perform were delievered into your distribution centre.",
    },
    {
      product: "perform",
      time: Date.now() - 5 * 1000 * 60 * 60 * 24,
      image: "images/product-3.png",
      content:
        "Perform has been shipped from the manygacvturer in Melborune, Australia.",
      track: "SHIPMENT",
    },
  ],
  PRODUCT: [
    {
      product: "wonder",
      time: Date.now(),
      content:
        "Production on all components has been accepte don Wonder. You product is in full production",
      image: "images/product-1.png",
      track: "PRODUCTION",
    },
    {
      product: "harmony",
      time: Date.now() - 1 * 1000 * 60 * 60 * 24,
      image: "images/product-2.png",
      content: "Production of labels is 75% completed. QA to begin to tomorrow",
    },
    {
      product: "perform",
      time: Date.now() - 2 * 1000 * 60 * 60 * 24,
      image: "images/product-2.png",
      content:
        "10,000 units of perform were delievered into your distribution centre.",
    },
    {
      product: "perform",
      time: Date.now() - 5 * 1000 * 60 * 60 * 24,
      image: "images/product-3.png",
      content:
        "Perform has been shipped from the manygacvturer in Melborune, Australia.",
      track: "SHIPMENT",
    },
  ],
});
