export const updatedObject = (oldObject, updatedProperties) =>{
    return {
        ...oldObject,
        ...updatedProperties
    };
}

export const checkValidity = (value,rules) => {
    let isValid = true;

    if(rules.required){
        isValid =value.trim() !== '' && isValid; // trim i used to identify the white space in the begining and end
        // if value.trim in unequal to '' then isvalid is true
        }
    if(rules.minLength){
        isValid=value.length >= rules.minLength && isValid;
    }
    if(rules.maxLength){
        isValid=value.length <= rules.maxLength && isValid;
    }
    return isValid;
}