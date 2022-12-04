import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "../../UI/Card/Card";
import EditCoffer from "./EditCoffer/EditCoffer";
import CreateCoffer from "./CreateCoffer/CreateCoffer";

const Newcoffer = (props) => {
  const location = useLocation();

  const [isEdit, setIsEdit] = useState();
  useEffect(() => {
    if (location.state == "create") {
      setIsEdit(false);
    } else if (location.state.isEdit == "edit") {
      setIsEdit(true);
    }
  });


  return (
    <React.Fragment>
      {isEdit ? (
        <Card heading="ویرایش صندوق" description="ویرایش صندوق قرض الحسنه">
          <EditCoffer isEdit={isEdit} fundId={location.state.id} />
        </Card>
      ) : (
        <Card heading="ایجاد صندوق جدید" description="افتتاح صندوق قرض الحسنه">
          <CreateCoffer isEdit={isEdit} />
        </Card>
      )}
    </React.Fragment>
  );
};

export default Newcoffer;
