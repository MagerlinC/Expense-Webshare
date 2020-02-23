import React, { useState } from "react";
import { createExpense } from "../../DBService";
import Button from "../button/button";
import Input from "../input/input";
import "./add-new-modal.scss";
import Checkbox from "../checkbox/checkbox";

const AddNewModal = ({ closeModal, showToaster, users }) => {
  let modal;
  const [expenseAmount, setExpenseAmount] = useState(undefined);
  const [expenseNote, setExpenseNote] = useState(undefined);
  const [checkedUsers, setCheckedUsers] = useState([]);

  const onModalBlur = e => {
    const newTarget = e.relatedTarget;
    if (modal && (!newTarget == null || !modal.contains(newTarget))) {
      closeModal();
    }
  };

  const postExpense = (amount, note) => {
    if (amount == null) {
      return;
    }
    const payer = 1;
    const payees = [2, 3];
    // Do work
    createExpense(amount, note ? note : "", payer, payees);
    closeModal();
    showToaster("Expense Added");
  };

  const handleUserCheck = user => {
    const users = [...checkedUsers];
    users.push(user);
    setCheckedUsers(users);
  };

  return (
    <div
      ref={div => (modal = div)}
      tabIndex="0"
      onBlur={onModalBlur}
      className={"add-new-modal"}
    >
      <div className={"top-section"}>
        <div className={"modal-header"}>Add Expense</div>
        <div className={"amount-input-wrapper"}>
          <Input
            placeholder={"Amount"}
            focusOnMount={true}
            isCurrency={true}
            onChange={setExpenseAmount}
            value={expenseAmount}
            onEnter={() => postExpense(expenseAmount, expenseNote)}
          />
        </div>
        <div className={"note-input-wrapper"}>
          <Input
            placeholder={"Note"}
            isCurrency={false}
            textAlign={"right"}
            onChange={setExpenseNote}
            value={expenseNote}
            onEnter={() => postExpense(expenseAmount, expenseNote)}
          />
        </div>
        <div className={"add-button-input-wrapper"}>
          <Button
            onClick={() => postExpense(expenseAmount, expenseNote)}
            text={"Add"}
          />
        </div>
      </div>
      <div className={"bottom-section"}>
        <div className={"users-list"}>
          {users &&
            users.map(user => (
              <div key={user.id} className={"user-line-item"}>
                <div className={"user-name"}>{user.name}</div>
                <Checkbox onChange={() => handleUserCheck(user)} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AddNewModal;
