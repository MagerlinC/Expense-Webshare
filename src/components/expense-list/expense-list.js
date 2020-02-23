import React, { useState } from "react";
import ArrowIcon from "../../assets/arrowdown.svg";
import ExpenseListItem from "../expense-list-item/expense-list-item";
import "./expense-list.scss";

const ExpenseList = ({ expenses }) => {
  const [expanded, setExpanded] = useState(true);
  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={"expense-list-wrapper"}>
      <div className={"expense-list-header"}>
        <div className={"expense-list-header-text"}>All Expenses</div>
        <div className={"expense-list-arrow"}>
          <img
            alt="expand-arrow"
            onClick={toggleExpansion}
            className={"arrow-icon" + (expanded ? " expanded" : "")}
            src={ArrowIcon}
          />
        </div>
      </div>
      {expanded && (
        <div className={"expense-list-contents-wrapper animated fadeInUp"}>
          <div className={"expense-list-column-header"}>
            <div className={"expense-payer"}>Payer</div>
            <div className={"expense-payees"}>Payees</div>
            <div className={"expense-note"}>Note</div>
            <div className={"expense-amount"}>Amount</div>
          </div>
          {expenses ? (
            expenses.docs.map((doc, idx) => (
              <ExpenseListItem
                idx={idx}
                key={"expense-list-item" + idx}
                expense={doc.data()}
              />
            ))
          ) : (
            <div className={"expense-list-wrapper empty"}>No Expenses</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
