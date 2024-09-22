// import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

interface DateDropdownProps {
    onDateChange: (date: string) => void;
}

const DateDropdown: React.FC<DateDropdownProps> = ({ onDateChange }) => {
    const handleDateChange = (event: SelectChangeEvent<string>) => {
        onDateChange(event.target.value as string);
    };

    const formatDateForAPI = (date: Date) => {
        return date.toISOString().split('T')[0].replace(/-/g, '');
    }

    const formatDateReadable = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    }

    const today = new Date();

    const dates = Array.from({ length: 7 }, (_, i) => {
        const currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);

        return {
            readableDate: formatDateReadable(currentDate),
            apiDate: formatDateForAPI(currentDate)
        };
    });

    // const formatDate = (date: Date) => {
    //     const year = date.getFullYear();
    //     const month = String(date.getMonth() + 1).padStart(2, '0');
    //     const day = String(date.getDate()).padStart(2, '0');
    //     return `${year}${month}${day}`
    // }

    // const dates = [
    //     formatDate(today),
    //     formatDate(new Date(today.setDate(today.getDate() + 1))),
    //     formatDate(new Date(today.setDate(today.getDate() + 2))),
    //     formatDate(new Date(today.setDate(today.getDate() + 3))),
    //     formatDate(new Date(today.setDate(today.getDate() + 4))),
    //     formatDate(new Date(today.setDate(today.getDate() + 5))),
    //     formatDate(new Date(today.setDate(today.getDate() + 6))),
    //     formatDate(new Date(today.setDate(today.getDate() + 7))),
    // ];

    return (
        <FormControl variant="outlined" fullWidth>
            <InputLabel id="date-select-label">Select Date</InputLabel>
            <Select 
                labelId="date-select-label"
                onChange={handleDateChange}
                defaultValue={dates[0].apiDate}
            >
                {dates.map((date, index) => (
                    <MenuItem key={index} value={date.apiDate}>
                        {date.readableDate}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default DateDropdown;
