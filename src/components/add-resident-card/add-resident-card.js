import React, { useState } from "react";
import "./add-resident-card.scss";
import UserIcon from "../../assets/user-white.svg";
import Input from "../input/input";
import Button from "../button/button";
import { createResident } from "../../DBService";

const AddResidentCard = () => {
  const [residentName, setResidentName] = useState("");

  const [residentPhone, setResidentPhone] = useState("");

  const addResident = () => {
    if (residentName) {
      createResident(residentName, residentPhone);
    }
  };

  return (
    <div className={"add-resident-card-wrapper"}>
      <div className={"user-contents-wrapper"}>
        <div className={"user-icon-and-name"}>
          <img alt={"user-icon"} src={UserIcon} className={"user-icon"} />
          <div className={"user-name-and-phone"}>
            <div className={"user-name"}>
              <Input
                placeholder={"Resident Name"}
                onChange={setResidentName}
                value={residentName}
              />
            </div>
            <div className={"user-phone"}>
              <Input
                placeholder={"Resident Phone"}
                onChange={setResidentPhone}
                value={residentPhone}
              />
            </div>
          </div>
        </div>
      </div>
      <Button text="Add Resident" onClick={addResident} />
    </div>
  );
};

export default AddResidentCard;
