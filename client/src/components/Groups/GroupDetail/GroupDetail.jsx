import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  cleanGroupDetail,
  getGroupDetail,
} from "../../../redux/actions/actionsGroup";
import UpdateGroup from "../UpdateGroup/UpdateGroup";

export default function GroupDetail({ setShowDetail, id ,allowBack}) {
  const dispatch = useDispatch();

  const groupDetail = useSelector((state) => state.groupReducer.groupDetail);

  const [update, setUpdate] = useState(false);
  const [createdSuccess, setCreatedSuccess] = useState(false);

  useEffect(() => {
    dispatch(getGroupDetail(id));
    return () => dispatch(cleanGroupDetail());
  }, [dispatch, id]);

  if (createdSuccess) {
    dispatch(getGroupDetail(id));
    setCreatedSuccess(false)
  }

  return (
    <UpdateGroup
      id={id}
      groupDetail={groupDetail}
      update={update}
      setUpdate={setUpdate}
      setShowDetail={setShowDetail}
      allowBack={allowBack}
      setCreatedSuccess={setCreatedSuccess}
    />
  );
}
