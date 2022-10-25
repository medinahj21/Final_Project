import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../../redux/actions/actionsGroup";

import CardGroup from "./CardGroup/CardGroup";
import FormGroup from "./CreateGroup/FormGroup";
import GroupDetail from "./GroupDetail/GroupDetail";
import SelectGroups from "./SelectGroups";

import "./Groups.css";

export default function Groups() {
  const dispatch = useDispatch();

  const { userInfoFirestore } = useSelector((state) => state.authReducer);
  const groups = useSelector((state) => state.groupReducer.groups);

  const [idGroup, setIdGroup] = useState(false);
  const [isForm, setIsForm] = useState(false);
  const [isShowDetail, setShowDetail] = useState(false);
  const [allGroups, setAllGroups] = useState([]);
  const [category, setCategory] = useState(groups.map((e) => e.category));

  useEffect(() => {
    dispatch(actions.getGroups());
  }, [dispatch]);

  useEffect(() => {
    setAllGroups(groups);
    setCategory([...new Set(category)]);
  }, [groups]);

  const filterByGenre = (e) => {
    let value = e.target.value;
    if (value === "all") {
      setAllGroups(groups);
    } else {
      let filtered = [...allGroups].filter((e) => e.genre === value);
      if (filtered.length === 0) {
        filtered = [...groups].filter((e) => e.genre === value);
      }
      setAllGroups(filtered);
    }
  };

  const filterByCategory = (e) => {
    let value = e.target.value;
    if (value === "all") {
      setAllGroups(groups);
    } else {
      let filtered = [...allGroups].filter((e) => e.category === value);
      if (!filtered.length) {
        filtered = [...groups].filter((e) => e.category === value);
      }
      setAllGroups(filtered);
    }
  };

  const idRecoverHandler = (id) => {
    setIdGroup(id);
    setShowDetail(true);
  };

  return (
    <div className="groups__container">
      {isForm ? <FormGroup setIsForm={setIsForm} /> : <></>}

      {!isShowDetail ? (
        <>
          <div className="selects__container">
            {userInfoFirestore.isAdmin ? (
              <button className="modify__button" onClick={() => setIsForm(true)}>Nuevo grupo</button>
            ) : (
              <></>
            )}
            <SelectGroups
              filterByGenre={filterByGenre}
              filterByCategory={filterByCategory}
            />
          </div>
          <div className="groups__card-container">
            {allGroups?.map((e, i) => {
              return (
                <CardGroup
                  key={i}
                  name={e.name}
                  schedule={e.schedule}
                  price={e.inscription_cost}
                  id={e.id}
                  img={e.image}
                  genre={e.genre}
                  idRecoverHandler={idRecoverHandler}
                />
              );
            })}
          </div>
        </>
      ) : (
        <GroupDetail id={idGroup} setShowDetail={setShowDetail} />
      )}
    </div>
  );
}
