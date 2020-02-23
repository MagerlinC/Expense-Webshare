import React from "react";
import "./expense-list-item.scss";
import CurrencyFormat from "react-currency-format";

const ExpenseListItem = ({ expense, idx }) => {
  return (
    <div className={"expense-list-item-wrapper" + (idx === 0 ? " first" : "")}>
      <div className={"expense-payer"}>{expense.payer}</div>
      <div className={"expense-payees"}>
        {expense.payees.map((payee, idx) => (
          <div key={payee} className={"payee-item"}>
            {payee + (idx < expense.payees.length - 1 ? "," : "")}
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
