import React, { useEffect, useState } from "react";
import "./App.scss";
import {
  getFlatExpenseSnapshot,
  getResidentsForFlat,
  getPaymentsForFlat
} from "./DBService";
import ResidentStats from "./components/resident-stats/resident-stats";
import CurrencyFormat from "react-currency-format";
import Loader from "./components/loader/loader";
import AddNewModal from "./components/add-new-modal/add-new-modal";
import Toaster from "./components/toaster/toaster";
import ExpenseList from "./components/expense-list/expense-list";
import AddResidentCard from "./components/add-resident-card/add-resident-card";
import Button from "./components/button/button";

const App = () => {
  document.title = "WSA - WebShare";
  const flatId = "8D";
  const userId = "h2cojFL91b9Izs5Rq5y5";
  const [residents, setResidents] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [toasterText, setToasterText] = useState(undefined);
  const [toasterShown, setToasterShown] = useState(false);

  const [flatExpenseSnapshot, setFlatExpenseSnapshot] = useState(undefined);

  useEffect(() => {
    if (!flatExpenseSnapshot) {
      getFlatExpenseSnapshot(doc => setFlatExpenseSnapshot(doc));
    }

    if (residents.length === 0) {
      getResidentsForFlat(doc => setResidents(doc));
    }
    if (payments.length === 0) {
      getPaymentsForFlat().then(querySnapshot => {
        const payments = querySnapshot.docs.map(doc => doc.data());
        setPayments(payments);
      });
    }
    if (loading) {
      setLoading(false);
    }
  }, [flatExpenseSnapshot, loading]);

  const showToaster = text => {
    setToasterText(text);
    setToasterShown(true);
    // Hide toaster again in 2500 ms
    setTimeout(() => setToasterShown(false), 2500);
  };

  const totalExpenses = flatExpenseSnapshot
    ? flatExpenseSnapshot.docs.reduce(
        (acc, doc) => acc + parseInt(doc.data().amount),
        0
      )
    : 0;

  const totalPayments = payments.reduce(
    (acc, payment) => payment.amount + acc,
    0
  );

  const getExpensesMadeByPerson = personId => {
    const personExpenses = flatExpenseSnapshot
      ? flatExpenseSnapshot.docs.filter(
          expense => expense.data().payer.id === personId
        )
      : [];
    return { docs: personExpenses };
  };

  const getPaymentsForPerson = personId => {
    return payments.filter(payment => payment.payer.id === personId);
  };

  const getExpensesForPerson = personId => {
    return {
      docs: flatExpenseSnapshot
        ? flatExpenseSnapshot.docs.filter(expense =>
            expense.data().payees.find(payee => personId === payee.id)
          )
        : []
    };
  };

  const openModal = () => {
    if (!showModal) {
      setShowModal(true);
    } else {
      closeModal();
    }
  };
  function closeModal() {
    setShowModal(false);
  }

  const ResidentStatsComponent = resident => {
    const residentData = resident.data();
    return (
      <ResidentStats
        isUser={resident.id === userId}
        key={resident.id}
        resident={residentData}
        expensesMade={getExpensesMadeByPerson(resident.id)}
        expenses={getExpensesForPerson(resident.id)}
        allPayments={payments}
        payments={getPaymentsForPerson(resident.id)}
      />
    );
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
            <div className={"new-button-and-modal"}>
              <Button
                text="Add Expense"
                id="modal-btn"
                title={"Add Expense"}
                onTouchStart={openModal}
                onClick={openModal}
                className={"new-button"}
              />
              {showModal && (
                <div className={"modal-spacer-wrapper"}>
                  <div className={"spacer"} />
                  <AddNewModal
                    blurIgnoreId={"modal-btn"}
                    users={residents.docs.map(doc => doc.data())}
                    showToaster={showToaster}
                    closeModal={closeModal}
                  />
                </div>
              )}
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
          {residents && residents.docs ? (
            residents.docs.map(resident => ResidentStatsComponent(resident))
          ) : (
            <div className={"no-users-wrapper"}>
              {"No residents found for flat " + flatId + "."}
            </div>
          )}
          <AddResidentCard />
        </div>
        <div className={"expenses-section"}>
          <ExpenseList expenses={flatExpenseSnapshot} />
        </div>
      </div>
      <Toaster text={toasterText} shown={toasterShown} />
    </div>
  );
};

export default App;
