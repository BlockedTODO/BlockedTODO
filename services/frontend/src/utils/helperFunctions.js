/* Used to extract the value from `onChange` handlers that could either
 * be in the form of an event object from an input, or just a plain
 * value from.. anything that isn't an input.
 */
export const extractOnChangeValue = (value) => {
    if (value && value.target) {
        if (value.target.value) {
            return value.target.value;
        } else {
            return "";
        }
    } else {
        return value;
    }
};
