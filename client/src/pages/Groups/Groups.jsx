import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardGroup from '../../components/CardGroup/CardGroup'
import FormGroup from '../../pages/Groups/CreateGroup/FormGroup'
import s from '../Groups/Groups.module.css'
import * as actions from '../../redux/actions/actionsGroup';

export default function Groups() {

    const dispatch = useDispatch();
    const groups = useSelector((state) => state.groupReducer.groups);

    const [allGroups, setAllGroups] = useState([]);

    useEffect(() => {
        dispatch(actions.getGroups())
    }, [dispatch]);

    useEffect(() => {
        setAllGroups(groups)
    }, [groups])

    const filterByGenre = (e) => {
        let value = e.target.value;
        console.log(value);
        value === 'all' ? setAllGroups(groups) :
            setAllGroups([...groups].filter(e => e.genre === value))
    }

    return (
        <div className={s.bodyForm}>
            

            <FormGroup />
            <div className={s.container}>
                <div className={s.containerItems}>
                    <label className={s.subtitles}>Filtrar por: </label><br />
                    <div className={s.items}>
                        <span className={s.subtitles}>Genre: </span>
                        <select name="filterByGenre" id="" onChange={(e) => filterByGenre(e)}>
                            <option key={0} value={'all'}>All</option>
                            <option key={1} value={'Male'}>Male</option>
                            <option key={2} value={'Female'}>Female</option>
                            <option key={3} value={'Mix'}>Mix</option>
                        </select>
                    </div>
                    <div className={s.items}>
                        <span className={s.subtitles}>Categorías: </span>
                        <select name="filterByGenre" id="">
                            <option key={0} value={'Mix'}>Todos</option>
                            <option key={1} value={'all'}>Sub 12</option>
                            <option key={2} value={'Male'}>Sub 14</option>
                            <option key={3} value={'Female'}>Sub 16</option>
                            <option key={4} value={'Mix'}>Sub 18</option>
                        </select>
                    </div>
                </div>
                <div className={s.cardContainer}>
                    {allGroups?.map(e => {
                        return <CardGroup
                            name={e.name}
                            schedule={e.schedule}
                            price={e.inscription_cost}
                            id={e.id}
                            img={e.image}
                            genre={e.genre}
                        />
                    })}
                </div>

            </div>
        </div>
    )
}
