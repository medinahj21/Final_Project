import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  cleanGroupDetail,
  getGroupDetail,
} from "../../../redux/actions/actionsGroup";
import GroupDetailCard from "./GroupDetailCard";

export default function GroupDetail({ setShowDetail, id, allowBack }) {
  const dispatch = useDispatch();

  const groupDetail = useSelector((state) => state.groupReducer.groupDetail);

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
    <GroupDetailCard
      id={id}
      groupDetail={groupDetail}
      setShowDetail={setShowDetail}
      allowBack={allowBack}
      setCreatedSuccess={setCreatedSuccess}
    />
  );
}
