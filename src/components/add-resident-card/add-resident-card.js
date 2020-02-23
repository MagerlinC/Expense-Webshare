import React from "react";
import "./add-resident-card.scss";

const AddResidentCard = () => {
  const addResident = () => {
    console.log("Add resident");
  };

  return (
    <div className={"add-resident-card-wrapper"}>
      <div onClick={addResident} className={"user-wrapper"}>
        Add Resident
      </div>
    </div>
  );
};

export default AddResidentCard;
