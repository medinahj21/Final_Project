import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import * as actions from '../../../redux/actions/actionsGroup';
import s from './GroupDetail.module.css'
import UpdateGroup from '../UpdateGroup/UpdateGroup';

export default function GroupDetail() {
    let { id } = useParams();
    const dispatch = useDispatch();

    const groupDetail = useSelector((state) => state.groupReducer.groupDetail);

    const [update, setUpdate] = useState(false)

    useEffect(() => {
        dispatch(actions.getGroupDetail(id))
    }, [dispatch])

    useEffect(() => {
        return () => dispatch(actions.cleanGroupDetail())
    }, [dispatch])

    return (
        <UpdateGroup 
            id={id} 
            groupDetail={groupDetail} 
            update={update}
            setUpdate={setUpdate}/>
    )
}
