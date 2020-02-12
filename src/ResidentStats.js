import React from "react";
import UserIcon from "./assets/user.svg";

const ResidentStats = ({ resident, expensesMade, expenses, payments }) => {
  const expensesMadeTotal = expensesMade.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );
  // TODO: You are not counted as a payee in the expenses you made yourself
  const expensesTotal = expenses.reduce(
    (acc, expense) => acc + expense.amount / (expense.payees.length + 1),
    0
  );
  const paymentsTotal = payments.reduce(
    (acc, payment) => acc + payment.amount,
    0
  );
  const residentNet = expensesTotal - (expensesMadeTotal + paymentsTotal);
  const owesMoney = residentNet > 0;

  return (
    <div className={"user-wrapper"}>
      <div className={"user-contents-wrapper"}>
        <div className={"user-icon-and-name"}>
          <img alt={"user-icon"} src={UserIcon} className={"user-icon"} />
          <div className={"user-name"}>{resident.name}</div>
        </div>
        <div className={"user-stats"}>
          <div className={"user-stat-line"}>
            <div className={"user-stat-text"}>Expenses Paid for</div>
            <div className={"right-number"}>{expensesMadeTotal}</div>
          </div>
          <div className={"user-stat-line"}>
            <div className={"user-stat-text"}>Share of Total Expenses</div>
            <div className={"right-number"}>{expensesTotal}</div>
          </div>
          <div className={"user-stat-line"}>
            <div className={"user-stat-text"}>Paid</div>
            <div className={"right-number"}>{paymentsTotal}</div>
          </div>
        </div>
      </div>
      <div className={"user-net"}>
        Outstanding
        <span className={"user-net-text" + (owesMoney ? " red" : "")}>
          {residentNet === 0
            ? "0"
            : (owesMoney ? "-" : "+") + Math.abs(residentNet)}
        </span>
      </div>
    </div>
  );
};

export default ResidentStats;
