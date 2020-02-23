import React, { useState } from "react";
import "./add-new-modal.scss";
import Input from "../input/input";
import Button from "../button/button";

const AddNewModal = ({ closeModal, showToaster }) => {
  let modal;
  const [expenseAmount, setExpenseAmount] = useState(undefined);
  const [expenseNote, setExpenseNote] = useState(undefined);
  const [modalHasFocus, setModalHasFocus] = useState(false);

  const onModalBlur = e => {
    const newTarget = e.relatedTarget;
    if (!modalHasFocus && modal && !modal.contains(newTarget)) {
      closeModal();
    }
  };

  const addExpense = (amount, note) => {
    // Do work
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
          <Button onClick={addExpense} text={"Add"} />
        </div>
      </div>
      <div className={"bottom-section"}></div>
    </div>
  );
};

export default AddNewModal;
