import React from "react";
import UserIcon from "../../assets/user.svg";
import CurrencyFormat from "react-currency-format";

const ResidentStats = ({
  resident,
  expensesMade,
  expenses,
  payments,
  allPayments,
  isUser
}) => {
  const expensesMadeTotal = expensesMade.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );

  // Your share in the expenses you've made.
  const expensesPartFromExpensesMade = expensesMade.reduce(
    (acc, expense) => acc + expense.amount / (expense.payees.length + 1),
    0
  );

  const expensesTotal = expenses.reduce(
    (acc, expense) => acc + expense.amount / (expense.payees.length + 1),
    0
  );
  // How much you've put in as payments yourself
  const paymentsTotal = payments.reduce(
    (acc, payment) => acc + payment.amount,
    0
  );
  // Counting your part of an expense you paid for, as a payment to the group
  const paymentsFromOwnExpenses = expensesMade.reduce(
    (acc, expense) => acc + expense.amount / (expense.payees.length + 1),
    0
  );
  const otherPeoplesPaymentsTotal = allPayments
    .filter(payment => payment.payer !== resident.id)
    .reduce((acc, payment) => acc + payment.amount, 0);
  const residentNet =
    expensesTotal -
    (paymentsFromOwnExpenses + paymentsTotal) +
    otherPeoplesPaymentsTotal;
  const owesMoney = residentNet > 0;

  return (
    <div className={"user-wrapper"}>
      {isUser && (
        <div className={"user-header"}>
          <div className={"user-triangle"}>
            <span className={"you-text"}>You</span>
          </div>
        </div>
      )}
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
            <div className={"right-number"}>
              <CurrencyFormat
                value={expensesTotal + expensesPartFromExpensesMade}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </div>
          </div>
          <div className={"user-stat-line"}>
            <div className={"user-stat-text"}>Payments total</div>
            <div className={"right-number"}>
              <CurrencyFormat
                value={paymentsTotal}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </div>
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
