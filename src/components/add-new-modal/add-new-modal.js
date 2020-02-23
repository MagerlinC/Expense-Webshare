import React, { useState } from "react";
import "./add-new-modal.scss";
import Input from "../input/input";
import Button from "../button/button";
import { createExpense } from "../../DBService";

const AddNewModal = ({ closeModal, showToaster }) => {
  let modal;
  const [expenseAmount, setExpenseAmount] = useState(undefined);
  const [expenseNote, setExpenseNote] = useState(undefined);
  const [modalHasFocus, setModalHasFocus] = useState(false);

  const onModalBlur = e => {
    const newTarget = e.relatedTarget;
    if (modal && (!newTarget == null || !modal.contains(newTarget))) {
      closeModal();
    }
  };

  const postExpense = (amount, note) => {
    const payer = 1;
    const payees = [2, 3];
    // Do work
    createExpense(amount, note, payer, payees);
    closeModal();
    showToaster("Expense Added");
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
            onFocus={() => setModalHasFocus(true)}
            onBlur={() => setModalHasFocus(false)}
            isCurrency={true}
            onChange={setExpenseAmount}
            value={expenseAmount}
          />
        </div>
        <div className={"note-input-wrapper"}>
          <Input
            placeholder={"Note"}
            onFocus={() => setModalHasFocus(true)}
            onBlur={() => setModalHasFocus(false)}
            isCurrency={false}
            textAlign={"right"}
            onChange={setExpenseNote}
            value={expenseNote}
          />
        </div>
        <div className={"add-button-input-wrapper"}>
          <Button
            onClick={() => postExpense(expenseAmount, expenseNote)}
            text={"Add"}
          />
        </div>
      </div>
      <div className={"bottom-section"}></div>
    </div>
  );
};

export default AddNewModal;
