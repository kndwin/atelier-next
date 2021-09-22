import { makeVar } from "@apollo/client";

export const inProductionVar = makeVar([
  {
    title: "order accepted",
    date: Date.now() - 60 * 1000 * 60 * 60 * 24,

    type: "TEXT",
    payload:
      "ORDER DATE: JULY 22ND\nORDER NO. #00001\nEST. DELIVERY: AUGUST 30",
  },
  {
    title: "production begins",
    date: new Date("07/02/2020"),
  },
  {
    title: "production complete",
    date: new Date("07/30/2020"),
  },
  {
    title: "qa begins",
    date: new Date("08/02/2020"),
  },
  {
    title: "qa complete",
    date: new Date("07/02/2020"),
    type: "IMAGE",
    payload: {
			caption: 'CLICK to ENLARGE QA IMAGES',
      images: [
        "/images/product-1.png",
        "/images/product-1.png",
        "/images/product-1.png",
      ],
    },
  },
  {
    title: "shipment",
    date: new Date("07/30/2020"),
    type: "MAP",
    payload: {
			caption: 'your vessel and droper are on their way',
			coordinates: { lat: 100, long: 100}
    },
  },
  {
    title: "order accepted",
    date: new Date("08/02/2020"),
  },
  {
    title: "production begins",
    date: new Date("07/02/2020"),
		type: 'DELAYED',
		payload: "PRIMARY PACKAGING SHIPMENT HAS BEEN DELAYED BY APPROXIMATELY 3-5 DAYS.\n\n YOUR SHIPMENT IS NOW SET TO BE",
  },
  {
    title: "order accepted",
    date: new Date("07/30/2020"),
  },
  {
    title: "order accepted",
    date: new Date("08/02/2020"),
  },
  {
    title: "production begins",
    date: new Date("07/02/2020"),
  },
  {
    title: "order accepted",
    date: new Date("07/30/2020"),
  },
  {
    title: "order accepted",
    date: new Date("08/02/2020"),
		type: 'DELAYED',
		payload: "PRIMARY PACKAGING SHIPMENT HAS BEEN DELAYED BY APPROXIMATELY 3-5 DAYS.\n\n YOUR SHIPMENT IS NOW SET TO BE",
  },
]);
