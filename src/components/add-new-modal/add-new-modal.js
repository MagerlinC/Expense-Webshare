import React, { useState } from "react";
import { createExpense } from "../../DBService";
import Button from "../button/button";
import Input from "../input/input";
import "./add-new-modal.scss";
import Checkbox from "../checkbox/checkbox";

const AddNewModal = ({ closeModal, showToaster, users, blurIgnoreId }) => {
  let modal;
  const [expenseAmount, setExpenseAmount] = useState(undefined);
  const [expenseNote, setExpenseNote] = useState(undefined);
  const [checkedUsers, setCheckedUsers] = useState(users);

  const onModalBlur = e => {
    const newTarget = e.relatedTarget;
    if (modal && (!newTarget == null || !modal.contains(newTarget))) {
      if (newTarget && newTarget.id === blurIgnoreId) {
        return;
      }
      closeModal();
    }
  };

  const postExpense = (amount, note, checkedUsers) => {
    if (amount == null) {
      return;
    }
    const payer = 1;
    createExpense(
      amount,
      note ? note : "",
      payer,
      checkedUsers.map(user => user.id)
    );
    closeModal();
    showToaster("Expense Added");
  };

  const handleUserCheck = user => {
    const users = [...checkedUsers];

    const userIdx = users.findIndex(u => u.id === user.id);
    if (userIdx >= 0) {
      users.splice(userIdx, 1);
      setCheckedUsers(users);
    } else {
      users.push(user);
      setCheckedUsers(users);
    }
  };

  return (
    <div
      ref={div => (modal = div)}
      tabIndex="0"
      onBlur={onModalBlur}
      className={"add-new-modal animated"}
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
      </div>
      <div className={"bottom-section"}>
        <div className={"users-list"}>
          {users &&
            users.map(user => (
              <div
                tabIndex="0"
                onKeyDown={e =>
                  e.key === "Enter" ? handleUserCheck(user) : void 0
                }
                onClick={() => handleUserCheck(user)}
                key={user.id}
                className={"user-line-item"}
              >
                <div className={"user-name"}>{user.name}</div>
                <Checkbox
                  focusable={false}
                  onChange={() => void 0}
                  checked={checkedUsers.find(u => u.id === user.id)}
                />
              </div>
            ))}
        </div>
        <div className={"add-button-input-wrapper"}>
          <Button
            onClick={() =>
              postExpense(expenseAmount, expenseNote, checkedUsers)
            }
            text={"Add"}
          />
        </div>
      </div>
    </div>
  );
};

export default AddNewModal;
