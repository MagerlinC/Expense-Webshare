import React, { useEffect, useState } from "react";
import "./App.scss";
import {
  getExpensesForFlat,
  getResidentsForFlat,
  getPaymentsForFlat
} from "./DBService";
import ResidentStats from "./ResidentStats";
import CurrencyFormat from "react-currency-format";
import Loader from "./loader";

const App = () => {
  document.title = "WSA - WebShare";
  const flatId = "8d";
  const [residents, setResidents] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
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

  const openModal = () => {
    if (!showModal) {
      setShowModal(true);
    }
  };
  let modalWrapperDiv = null;
  const closeModal = e => {
    const newTarget = e.relatedTarget;
    if (modalWrapperDiv && !modalWrapperDiv.contains(newTarget) && showModal) {
      setShowModal(false);
    }
  };

  if (loading) {
    return (
      <div className="App">
        <header className="app-header">WebShare</header>
        <div className={"app-contents"}>
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="app-header">WebShare</header>
      <div className={"app-contents"}>
        <div className={"flat-header"}>
          <div className={"flat-header-bar"}>
            <span className={"flat-text-header"}>
              {"Stats for Flat " + flatId}
            </span>
            <div
              ref={div => (modalWrapperDiv = div)}
              tabIndex="0"
              onMouseLeave={closeModal}
              className={"new-button-and-modal"}
            >
              <button onMouseEnter={openModal} className={"new-button"}>
                +
              </button>
              {showModal && <div className={"add-new-modal"}>Modal</div>}
            </div>
          </div>
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
          {residents ? (
            residents.map(resident => (
              <ResidentStats
                isUser={resident.id === 1}
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
