import React, {useState, useEffect, useContext} from 'react'
import {fetchData} from '../../api'
import {ItemColorPicker, Table, SkeletonBlock} from '../../components'
import {Link} from 'react-router-dom'
import {Button} from '@material-ui/core'
import styles from './index.module.css'

import {GlobalDispatchContext, GlobalStateContext} from '../../global-state'
import {SET_COUNTRY_TO_COLOR} from '../../global-state/actions'

const tableColumns = [
    {id: 'country', label: 'Country'},
    {id: 'color', label: 'Color'}
]
const Settings = () => {
    const dispatch = useContext(GlobalDispatchContext)
    const state = useContext(GlobalStateContext)
    const [countries, setCountries] = useState()

    const handleCountryColorChange = (country, color) => {
        dispatch({
            type: SET_COUNTRY_TO_COLOR, payload: {
                country,
                color
            }
        })
    }
    useEffect(() => {
        const getData = async () => {
            const res = await fetchData()
            setCountries(res.countries)
        }
        getData()
    }, [])

    return (
        <div className={styles.settings}>
            <h1>Settings Page</h1>
            <div className={styles.button}>
                <Button className={styles.button} component={Link} to='/' variant='contained' color='primary'>
                    Back to Home
                </Button>
            </div>
            <div className={styles.picker}>
                {countries ? <ItemColorPicker items={countries} onSubmit={(c, cs) => handleCountryColorChange(c, cs)} />
                    : <SkeletonBlock height='390px' />}
            </div>

            <div className={styles.table}>
                <h2>Country To Color Legend</h2>
                {state.countryToColor && <Table
                    rows={Object.entries(state.countryToColor).map(([country, color]) => ({country, color}))}
                    columns={tableColumns}
                    rowColorByFirstColumnMap={state.countryToColor}
                />}
            </div>

        </div >)
}

export default Settings