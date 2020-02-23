import { db } from "./Firebase";

// TODO, hardcoded flat. Let's figure out who should handle users at a different time
const flatId = "8d";

export const getResidentsForFlat = () => {
  return db
    .collection("flats")
    .doc(flatId)
    .collection("residents")
    .get();
};

export const getFlatExpenseSnapshot = onSnapshotFunc => {
  return db
    .collection("flats")
    .doc(flatId)
    .collection("expenses")
    .onSnapshot(doc => onSnapshotFunc(doc));
};

/*export const getExpensesForFlat = () => {
  return db
    .collection("flats")
    .doc(flatId)
    .collection("expenses")
    .get();
};*/

export const getPaymentsForFlat = () => {
  return db
    .collection("flats")
    .doc(flatId)
    .collection("payments")
    .get();
};

export const createExpense = (
  amount,
  note,
  payer,
  payees,
  onSuccess,
  onError
) => {
  return db
    .collection("flats")
    .doc(flatId)
    .collection("expenses")
    .add({
      payer: payer,
      note: note,
      payees: payees,
      amount: amount
    })
    .then(
      onSuccess
        ? onSuccess
        : console.log("Succesfully posted expense of amount ", amount)
    )
    .catch(err => (onError ? onError(err) : console.log(err)));
};
