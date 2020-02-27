import { db } from "./Firebase";

// TODO, hardcoded flat. Let's figure out who should handle users at a different time
const flatId = "8d";

export const getResidentDetails = residentId => {
  console.log(residentId);
  const val = db
    .collection("flats")
    .doc(flatId)
    .collection("residents")
    .doc(residentId)
    .get();
  return val;
};

export const getResidentsForFlat = onSnapshotFunc => {
  return db
    .collection("flats")
    .doc(flatId)
    .collection("residents")
    .onSnapshot(doc => onSnapshotFunc(doc));
};

export const getFlatExpenseSnapshot = onSnapshotFunc => {
  return db
    .collection("flats")
    .doc(flatId)
    .collection("expenses")
    .onSnapshot(doc => onSnapshotFunc(doc));
};

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

export const createResident = (name, phone, onSuccess, onError) => {
  return db
    .collection("flats")
    .doc(flatId)
    .collection("residents")
    .add({
      name: name,
      phone: phone
    })
    .then(
      onSuccess ? onSuccess : console.log("Succesfully created resident ", name)
    )
    .catch(err => (onError ? onError(err) : console.log(err)));
};
