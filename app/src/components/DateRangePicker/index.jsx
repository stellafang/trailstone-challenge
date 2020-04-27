import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {DatePicker as MaterialDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import styles from './index.module.css'


const DatePicker = (props) => {
    const {selected, min, max, onChange, label, helperText} = props

    return (selected && <MaterialDatePicker
        className={styles.date}
        disableToolbar
        variant="inline"
        label={label}
        helperText={helperText}
        value={selected}
        onChange={onChange}
        minDate={min}
        maxDate={max}
    />)
}

DatePicker.propTypes = {
    selected: PropTypes.instanceOf(Date),
    min: PropTypes.instanceOf(Date),
    max: PropTypes.instanceOf(Date),
    handler: PropTypes.func,
    label: PropTypes.string,
    helperText: PropTypes.string
}

function DateRangePicker(props) {
    const {onStartChange, onEndChange, min, max} = props
    const [startDate, setStartDate] = useState(min)
    const [endDate, setEndDate] = useState(max)

    return (
        <div className={styles.dateRange}>
            {startDate && endDate &&
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DatePicker
                        label="Start Date"
                        helperText="Choose a start date"
                        selected={startDate}
                        onChange={(date) => {
                            setStartDate(date)
                            onStartChange(date)
                        }}
                        min={min}
                        max={endDate}
                    />
                    <DatePicker
                        label="End Date"
                        helperText="Choose an end date"
                        selected={endDate}
                        onChange={(date) => {
                            setEndDate(date)
                            onEndChange(date)
                        }}
                        min={startDate}
                        max={max}
                    />
                </MuiPickersUtilsProvider>
            }

        </div>
    )
}

DateRangePicker.propTypes = {

    /**
     * Minimum selectable date.
     */
    min: PropTypes.instanceOf(Date),

    /**
     * Maximum selectable date.
     */
    max: PropTypes.instanceOf(Date),

    /**
     * onChange callback for Start Calendar.
     * Is provided the selected Date object.
     */
    onStartChange: PropTypes.func,

    /**
     * onChange callback for Start Calendar.
     * Is provided the selected Date object.
     */
    onEndChange: PropTypes.func

}

export default DateRangePicker