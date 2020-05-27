import React from 'react';
import {FormControl, OutlinedInput, InputLabel, FormHelperText} from '@material-ui/core';
import './TextField.scss';

/* Custom text field as per https://material-ui.com/components/text-fields/#customized-inputs
 * Using scss styling as per https://material-ui.com/guides/interoperability/#plain-css */
const TextField = ({label='', helperText='', ...props}) => (
    <div className='text-field'>
        <FormControl
            variant='outlined'
            size='small'
            {...props}
        >
            <InputLabel htmlFor={label} classes={{root: 'label', focused: 'focused'}}>{label}</InputLabel>
            <OutlinedInput
                id={label}
                onChange={() => {}}
                label={label}
                aria-describedby='helper-text'
                error
                classes={{
                    root: 'root',
                    focused: 'focused',
                    notchedOutline: 'notched-outline',
                    input: 'input'
                }}
            />
            <FormHelperText id='helper-text'>{helperText}</FormHelperText>
        </FormControl>
    </div>
);

export default TextField;
