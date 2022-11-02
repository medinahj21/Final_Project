import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../redux/actions/actionsGroup'
import CardGroup from "./CardGroup/CardGroup";
import FormGroup from "./CreateGroup/FormGroup";
import GroupDetail from "./GroupDetail/GroupDetail";
import SelectGroups from "./SelectGroups";

import "./Groups.css";

export default function Groups() {
  const dispatch = useDispatch();

  const { userInfoFirestore } = useSelector((state) => state.authReducer);
  const groups = useSelector((state) => state.groupReducer.groups);
  const { playerDetail } = useSelector((state) => state.playerReducer);

  const [idGroup, setIdGroup] = useState(false);
  const [isForm, setIsForm] = useState(false);
  const [isShowDetail, setShowDetail] = useState(false);
  const [allGroups, setAllGroups] = useState([]);
  const [category, setCategory] = useState(groups.map((e) => e.category));
  const [values, setValues] = useState({ category: "", genre: "" })

  useEffect(() => {
    dispatch(actions.getGroups())    
    
  }, [dispatch])
  

  useEffect(() => {
    setAllGroups(groups);
    setCategory([...new Set(category)]);
  }, [groups]);

  const filtros = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    if (values.genre === "" && values.category === "") {
      setAllGroups(groups)
    } else if (values.genre.length && values.category.length) {
      let filtered = groups.filter((e) => (e.genre === values.genre) && (e.category === values.category));
      setAllGroups(filtered)
    } else if (!values.genre.length && values.category.length) {
      let filtered = groups.filter((e) => e.category === values.category)
      setAllGroups(filtered);
    } else if (!values.category.length && values.genre.length) {
      let filtered = groups.filter((e) => e.genre === values.genre);
      setAllGroups(filtered)
    }     
  }, [values])

  const idRecoverHandler = (id) => {
    setIdGroup(id);
    setShowDetail(true);
  };

  return (
    <div className="groups__container" id="container-group-detail">
      {playerDetail?.group?.id ? (
        <GroupDetail
          id={playerDetail?.group?.id}
          setShowDetail={setShowDetail}
          isPlayer={true}
        />
      ) : (
        <>
          {isForm ? <FormGroup setIsForm={setIsForm} /> : <></>}

          {!isShowDetail ? (
            <>
              <div className="selects__container">
                {userInfoFirestore.isAdmin ? (
                  <button
                    className="modify__button"
                    onClick={() => setIsForm(true)}
                  >
                    Nuevo grupo
                  </button>
                ) : (
                  <></>
                )}
                <SelectGroups
                  filtros={filtros}
                />
              </div>
              <div className="groups__card-container">
                {allGroups.length ? allGroups?.map((e, i) => {
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
                })
                  :
                  <h3 style={{ alignSelf: "center" }}>No se encontraron coincidencias...</h3>
                }
              </div>
            </>
          ) : (
            <GroupDetail id={idGroup} setShowDetail={setShowDetail} />
          )}
        </>
      )}
    </div>
  );
}
