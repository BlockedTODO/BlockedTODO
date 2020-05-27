import React from 'react';
import {TextField as MaterialTextField} from '@material-ui/core';
import './TextField.scss';

/* Custom text field as per https://material-ui.com/components/text-fields/#customized-inputs
 * Using scss styling as per https://material-ui.com/guides/interoperability/#plain-css */
const TextField = (props) => (
    <div className='text-field'>
        <MaterialTextField
            variant='outlined'
            size='small'
            InputProps={{
                classes: {
                    root: props.disabled ? 'input-disabled' : 'input',
                    notchedOutline: 'input-notched-outline',
                    focused: 'input-focused',
               }
            }}
            InputLabelProps={{
                classes: {
                    root: 'label',
                    focused: 'label-focused',
                }
            }}
            {...props}
        />
    </div>
);

export default TextField;
