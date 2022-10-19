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
    const [category, setCategory] = useState(groups.map((e) => e.category))
    useEffect(() => {
        dispatch(actions.getGroups())
    }, [dispatch]);
    
    useEffect(() => {
        setAllGroups(groups)
        setCategory([... new Set(category)])
    }, [groups])
    

    const filterByGenre = (e) => {
        let value = e.target.value;
        value === 'all' ? setAllGroups(groups) : setAllGroups([...groups].filter(e => e.genre === value));
    }

    const filterByCategory = (e) => {
        let value = e.target.value;
        setAllGroups(allGroups.length ? [...groups].filter(e => e.category === value): groups.filter(e => e.category === value))
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
                        <select name="filterByGenre" id="" onChange={(e) => filterByCategory(e)}>
                            {category.map((e, i) => {
                                return <option key={i}>{e}</option>
                            })}
                            
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
