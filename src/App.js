import React, { useEffect, useState } from "react";
import "./App.scss";
import {
  getExpensesForFlat,
  getResidentsForFlat,
  getPaymentsForFlat
} from "./DBService";

import UserIcon from "./assets/user.svg";

const App = () => {
  document.title = "WSA - WebShare";
  const flatId = "8d";
  const [residents, setResidents] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (residents.length === 0) {
      getResidentsForFlat(flatId).then(querySnapshot => {
        const residents = querySnapshot.docs.map(doc => doc.data());
        setResidents(residents);
      });
    }
    if (expenses.length === 0) {
      getExpensesForFlat(flatId).then(querySnapshot => {
        const expenses = querySnapshot.docs.map(doc => doc.data());
        setExpenses(expenses);
      });
    }
    if (payments.length === 0) {
      getPaymentsForFlat(flatId).then(querySnapshot => {
        const payments = querySnapshot.docs.map(doc => doc.data());
        setPayments(payments);
      });
    }
    setLoading(false);
  });

  const totalExpenses = expenses.reduce(
    (acc, expense) => expense.amount + acc,
    0
  );

  const totalPayments = payments.reduce(
    (acc, payment) => payment.amount + acc,
    0
  );

  const getTotalPaymentForPerson = personId => {
    return payments
      .filter(payment => payment.payer === personId)
      .reduce((acc, payment) => acc + payment.amount, 0);
  };

  const getTotalExpensesForPerson = personId => {
    return expenses
      .filter(expense => expense.payees.find(pId => personId === pId))
      .reduce(
        (acc, expense) => acc + expense.amount / (expense.payees.length + 1),
        0
      );
  };

  const getNetForPerson = personId => {
    // Total of all payments made by person
    const totalPersonPayments = getTotalPaymentForPerson(personId);
    // Total of all expenses that include the person in the list of payees
    const totalPersonExpenses = getTotalExpensesForPerson(personId);

    return totalPersonExpenses - totalPersonPayments;
  };

  return (
    <div className="App">
      <header className="App-header">WSA WebShare</header>
      <div className={"app-contents"}>
        <div className={"flat-header"}>
          <span className={"flat-text"}>
            {"Flat " + flatId + " - Total Expense: "}
          </span>
          <span className={"total-expense"}>{totalExpenses + " NZD"}</span>
        </div>
        <div className={"users-section"}>
          {residents ? (
            residents.map(resident => {
              const residentNet = getNetForPerson(resident.id);
              const owesMoney = residentNet > 0;
              return (
                <div className={"user-wrapper"}>
                  <img src={UserIcon} className={"user-icon"} />
                  <div className={"user-name"}>{resident.name}</div>
                  <div className={"user-expense-total"}>
                    Share of Expenses: {getTotalExpensesForPerson(resident.id)}
                  </div>
                  <div className={"user-payment-total"}>
                    Paid: {getTotalPaymentForPerson(resident.id)}
                  </div>
                  <div className={"user-net"}>
                    Outstanding:{" "}
                    <span
                      className={"user-net-text" + (owesMoney ? " red" : "")}
                    >
                      {(owesMoney ? "-" : residentNet === 0 ? "" : "+") +
                        getNetForPerson(resident.id)}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className={"no-users-wrapper"}>
              {"No residents found for flat " + flatId + "."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
