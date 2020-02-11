import React from "react";
import UserIcon from "./assets/user.svg";

const ResidentStats = ({ resident, expensesMade, expenses, payments }) => {
  const expensesMadeTotal = expensesMade.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );
  const expensesTotal = expenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );
  const paymentsTotal = payments.reduce(
    (acc, payment) => acc + payment.amount,
    0
  );
  const residentNet = expensesTotal - paymentsTotal;
  const owesMoney = residentNet > 0;

  return (
    <div className={"user-wrapper"}>
      <div className={"user-icon-and-name"}>
        <img src={UserIcon} className={"user-icon"} />
        <div className={"user-name"}>{resident.name}</div>
      </div>
      <div className={"user-stats"}>
        <div className={"user-stat-text"}>
          Expenses Paid for:
          <span className={"right-number"}>{expensesMadeTotal}</span>
        </div>
        <div className={"user-stat"}>
          <div className={"user-stat-text"}>Share of Total Expenses:</div>
          <div className={"right-number"}>{expensesTotal}</div>
        </div>
        <div className={"user-payment-total"}>Paid: {paymentsTotal}</div>
        <div className={"user-net"}>
          Outstanding:{" "}
          <span className={"user-net-text" + (owesMoney ? " red" : "")}>
            {(owesMoney ? "-" : residentNet === 0 ? "" : "+") + residentNet}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ResidentStats;
