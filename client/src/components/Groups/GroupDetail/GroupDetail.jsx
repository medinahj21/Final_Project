import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../../../redux/actions/actionsGroup";
import UpdateGroup from "../UpdateGroup/UpdateGroup";

export default function GroupDetail({ setShowDetail, id }) {
  const dispatch = useDispatch();

  const groupDetail = useSelector((state) => state.groupReducer.groupDetail);

  const [update, setUpdate] = useState(false);

  useEffect(() => {
    console.log(id);
    dispatch(actions.getGroupDetail(id));
  }, [dispatch]);

  useEffect(() => {
    return () => dispatch(actions.cleanGroupDetail());
  }, [dispatch]);

  return (
    <UpdateGroup
      id={id}
      groupDetail={groupDetail}
      update={update}
      setUpdate={setUpdate}
      setShowDetail={setShowDetail}
    />
  );
}
