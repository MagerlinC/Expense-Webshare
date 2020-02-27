import React, { useState, useEffect } from "react";
import "./expense-list-item.scss";
import CurrencyFormat from "react-currency-format";
import { getResidentDetails } from "../../DBService";

const ExpenseListItem = ({ expense, idx }) => {
  const [payer, setPayer] = useState("");
  const [payees, setPayees] = useState([]);

  useEffect(() => {
    getResidentDetails(expense.payer.id).then(querySnapshot =>
      setPayer(querySnapshot.data())
    );
    expense.payees.map(payee => {
      getResidentDetails(payee.id).then(querySnapshot => {
        const newPayees = [...payees];
        newPayees.push(querySnapshot.data());
        setPayees(newPayees);
      });
    });
  }, []);

  return (
    <div className={"expense-list-item-wrapper" + (idx === 0 ? " first" : "")}>
      <div className={"expense-payer"}>{payer.name}</div>
      <div className={"expense-payees"}>
        {payees.map((payee, idx) => (
          <div key={payee.name + "-" + idx} className={"payee-item"}>
            {payee.name + (idx < payees.length - 1 ? "," : "")}
          </div>
        ))}
      </div>
      <div className={"expense-note"}>{expense.note}</div>
      <div className={"expense-amount"}>
        <CurrencyFormat
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
          value={expense.amount}
        />
      </div>
    </div>
  );
};

export default ExpenseListItem;
