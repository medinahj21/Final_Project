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
        if (value === 'all'){
            setAllGroups(groups);   
        } else {
            let filtered = [...allGroups].filter(e => e.genre === value);
            console.log(filtered);
            if (filtered.length === 0) {
                filtered = [...groups].filter(e => e.genre === value)
            }
            setAllGroups(filtered)
        }
    }

    const filterByCategory = (e) => {
        let value = e.target.value;
        if (value === 'all'){
            setAllGroups(groups);   
        } else {
            let filtered = [...allGroups].filter(e => e.category === value);
            if (!filtered.length) {
                filtered = [...groups].filter(e => e.category === value)
            }
            setAllGroups(filtered)
        }
    }

    return (
        <div className={s.bodyForm}>
            <FormGroup />
            <div className={s.container}>
                <div className={s.containerItems}>
                    <label className={s.subtitles}>Filtrar por: </label><br />
                    <div className={s.items}>
                        <span className={s.subtitles}>Generos: </span>
                        <select name="filterByGenre" id="" onChange={(e) => filterByGenre(e)}>
                            <option key={'all'} value={'all'}>All</option>
                            <option key={'Male'} value={'Male'}>Male</option>
                            <option key={'Female'} value={'Female'}>Female</option>
                            <option key={'Mix'} value={'Mix'}>Mix</option>
                        </select>
                    </div>
                    <div className={s.items}>
                        <span className={s.subtitles}>Categorías: </span>
                        <select name="filterByGenre" id="" onChange={(e) => filterByCategory(e)}>
                            <option key={'todos'} value='all' >All</option>
                            <option key={'Mixto'} value='Mixto'>Mixto</option>
                            <option key={'Juvenil'} value='Juvenil'>Juvenil</option>
                            <option key={'Adultos'} value='Adultos'>Adultos</option>
                        </select>
                    </div>
                </div>
                <div className={s.cardContainer}>
                    {allGroups?.map((e, i) => {
                        return <CardGroup key={i}
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