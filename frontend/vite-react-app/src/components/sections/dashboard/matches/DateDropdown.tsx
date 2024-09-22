// import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

interface DateDropdownProps {
    onDateChange: (date: string) => void;
}

const DateDropdown: React.FC<DateDropdownProps> = ({ onDateChange }) => {
    const handleDateChange = (event: SelectChangeEvent<string>) => {
        onDateChange(event.target.value);
    };

    const today = new Date();

    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}${month}${day}`
    }

    const dates = [
        formatDate(today),
        formatDate(new Date(today.setDate(today.getDate() + 1))),
        formatDate(new Date(today.setDate(today.getDate() + 2))),
        formatDate(new Date(today.setDate(today.getDate() + 3))),
        formatDate(new Date(today.setDate(today.getDate() + 4))),
        formatDate(new Date(today.setDate(today.getDate() + 5))),
        formatDate(new Date(today.setDate(today.getDate() + 6))),
        formatDate(new Date(today.setDate(today.getDate() + 7))),
    ];

    return (
        <FormControl variant="outlined" fullWidth>
            <InputLabel id="date-select-label">Select Date</InputLabel>
            <Select 
                labelId="date-select-label"
                onChange={handleDateChange}
                defaultValue={dates[0]}
            >
                {dates.map((date) => (
                    <MenuItem key={date} value={date}>
                        {date}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default DateDropdown;
