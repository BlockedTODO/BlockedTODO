import {useMemo, useCallback, useState} from 'react';
import {extractOnChangeValue} from 'utils/helperFunctions';

const useInput = (initialValue = '') => {
    const [value, setValue] = useState(initialValue);

    const onChange = useCallback((value) => {
        if (value === null || value === undefined) {
            setValue(initialValue);
        } else {
            setValue(extractOnChangeValue(value));
        }
    }, [setValue, initialValue]);

    return useMemo(() => ({
        value,
        onChange
    }), [value, onChange]);
};

export default useInput;
