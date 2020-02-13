import React, { useEffect, useState } from "react";
import "./App.scss";
import {
  getExpensesForFlat,
  getResidentsForFlat,
  getPaymentsForFlat
} from "./DBService";
import ResidentStats from "./ResidentStats";
import CurrencyFormat from "react-currency-format";

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
    if (loading) {
      setLoading(false);
    }
  });

  const totalExpenses = expenses.reduce(
    (acc, expense) => expense.amount + acc,
    0
  );

  const totalPayments = payments.reduce(
    (acc, payment) => payment.amount + acc,
    0
  );

  const getExpensesMadeByPerson = personId => {
    const personExpenses = expenses.filter(
      expense => expense.payer === personId
    );
    return personExpenses;
  };

  const getPaymentsForPerson = personId => {
    return payments.filter(payment => payment.payer === personId);
  };

  const getExpensesForPerson = personId => {
    return expenses.filter(expense =>
      expense.payees.find(pId => personId === pId)
    );
  };

  const loader = <div className={"loader"}>Loading...</div>;

  return (
    <div className="App">
      <header className="App-header">WSA WebShare</header>
      <div className={"app-contents"}>
        <div className={"flat-header"}>
          <div className={"flat-text"}>{"Stats for Flat " + flatId}</div>
          <div className={"flat-text"}>
            <div className={"flat-text-header"}>Total Expenses</div>
            <CurrencyFormat
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
              value={totalExpenses}
            />
          </div>
          <div className={"flat-text"}>
            <div className={"flat-text-header"}>Total Payments</div>
            <CurrencyFormat
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
              value={totalPayments}
            />
          </div>
        </div>
        <div className={"users-section"}>
          {loading ? (
            loader
          ) : residents ? (
            residents.map(resident => (
              <ResidentStats
                key={resident.id}
                resident={resident}
                expensesMade={getExpensesMadeByPerson(resident.id)}
                expenses={getExpensesForPerson(resident.id)}
                allPayments={payments}
                payments={getPaymentsForPerson(resident.id)}
              />
            ))
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
