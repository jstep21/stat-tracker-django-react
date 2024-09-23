import { useState } from 'react';
import { 
    Box, 
    Checkbox, 
    FormControlLabel, 
    FormGroup,
    Button,
    Collapse,
    Typography 
} from '@mui/material';

interface CountrySelectorProps {
    selectedCountries: string[];
    onCountryChange: (updatedCountries: string[]) => void;
}

interface Country {
    code: string;
    name: string;
}

const availableCountries: Country[] = [
    { code: 'ARG', name: 'Argentina' },
    { code: 'BRA', name: 'Brazil' },
    { code: 'ENG', name: 'England' },
    { code: 'ESP', name: 'Spain' },
    { code: 'FRA', name: 'France' },
    { code: 'GER', name: 'Germany' },
    { code: 'INT', name: 'International' },
    { code: 'ITA', name: 'Italy' },
    { code: 'MEX', name: 'Mexico' },
    { code: 'USA', name: 'United States' },
  ];

const CountrySelector: React.FC<CountrySelectorProps> = ({ selectedCountries, onCountryChange }) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleToggleCountry = (countryCode: string) => {
        const updatedCountries = selectedCountries.includes(countryCode) 
            ? selectedCountries.filter(code => code !== countryCode)
            : [...selectedCountries, countryCode];
        onCountryChange(updatedCountries);
    };

    return (
        <Box>
            <Box display="flex" justifyContent="center" my={2}>
                <Button 
                    variant="contained"
                    onClick={() => setIsOpen(prev => !prev)}
                    sx={{ fontSize: '0.8rem', padding: '6px 12px' }}
                >
                    {isOpen ? 'Hide Country Selection' : 'Show Country Selection'}
                </Button>
            </Box>
            <Collapse in={isOpen}>
                <FormGroup>
                    {availableCountries.map((country) => (
                        <FormControlLabel 
                            key={country.code}
                            control={
                                <Checkbox
                                    checked={selectedCountries.includes(country.code)}
                                    onChange={() => handleToggleCountry(country.code)}
                                />
                            }
                            label={country.name}
                        />
                    ))}
                </FormGroup>
            </Collapse>
        </Box>
    )
};

export default CountrySelector;

