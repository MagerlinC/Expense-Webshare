import { db } from "./Firebase";

export const getResidentsForFlat = flatId => {
  return db
    .collection("flats")
    .doc(flatId)
    .collection("residents")
    .get();
};

export const getExpensesForFlat = flatId => {
  return db
    .collection("flats")
    .doc(flatId)
    .collection("expenses")
    .get();
};

export const getPaymentsForFlat = flatId => {
  return db
    .collection("flats")
    .doc(flatId)
    .collection("payments")
    .get();
};
