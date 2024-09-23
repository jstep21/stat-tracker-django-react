import { useState } from 'react'
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

interface DateDropdownProps {
    selectedDate: string;
    onDateChange: (date: string) => void;
}

const DateDropdown: React.FC<DateDropdownProps> = ({ selectedDate, onDateChange }) => {
    const [internalDate, setInternalDate] = useState<string>(selectedDate)

    const handleDateChange = (event: SelectChangeEvent<string>) => {
        const newDate = event.target.value;
        setInternalDate(newDate);
        onDateChange(newDate);
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

    return (
        <FormControl variant="outlined" fullWidth>
            <InputLabel id="date-select-label">Select Date</InputLabel>
            <Select 
                labelId="date-select-label"
                value={internalDate}
                onChange={handleDateChange}
                label="Date"
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
