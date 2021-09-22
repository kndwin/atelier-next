import { makeVar } from "@apollo/client";

const timelineVarInit = [
  {
    type: "TITLE_TAG",
    status: "DONE",
    content: "sample 1.0",
  },
  {
    type: "POINT",
    status: "DONE",
    content: "Brief accepted",
  },
  {
    type: "POINT",
    content: "chemist recieves brief",
    status: "DONE",
  },
  {
    type: "POINT",
    content: "Brief is accepted",
    status: "DONE",
    time: Date.now() - 14 * 1000 * 60 * 60 * 24,
  },
  {
    type: "POINT",
    content: "supply chain ahs been configured",
    status: "ACTIVE",
  },
  {
    type: "POINT",
    content: "chemist recieves brief",
    status: "NOT_DONE",
  },
  {
    type: "POINT",
    content: "chemist recieves brief",
    status: "NOT_DONE",
  },
  {
    type: "TAG",
    content: "1 day",
    status: "NOT_DONE",
  },
  {
    type: "POINT",
    content: "configuring supply chain",
    status: "NOT_DONE",
  },
  {
    type: "POINT",
    content:
      "chemist review brief and creates paper formula chemist review brief and creates paper formula",
    status: "NOT_DONE",
  },
  {
    type: "TAG",
    content: "Delayed by 5 day",
    status: "NOT_DONE",
  },
  {
    type: "POINT",
    content: "supply chain ahs been configured",
    status: "NOT_DONE",
  },
  {
    type: "POINT",
    content: "chemist recieves brief",
    status: "NOT_DONE",
    last: true,
  },
];

export const timelineVar = makeVar(timelineVarInit);
