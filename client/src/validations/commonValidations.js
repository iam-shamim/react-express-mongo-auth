var Validator = require('validator');
const commonValidations = (data,roles) => {
    let errors = {};
    for(const role in roles){
        const roleList = roles[role].split('|');
        for(const list in roleList){
            const allExp = roleList[list].split(':');
            const roleName = allExp;
            const validation = rolesFunc[allExp[0]]({
                value: data[role],
                filed: role,
                role: allExp
            });
            if(validation !== true){
                errors[role] = validation;
                break; break;
            }
        }
    }
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};
const rolesFunc = {
    required: (data)=>{
        const {value} = data;
        if(value==undefined || Validator.isEmpty(value)){
            return 'This field is required'
        }
        return true;
    },
    max: (data)=>{
        const {value,role} = data;
        const max =  role[1];
        if(!value){
            return true;
        }
        if(role[2]==='numeric' && value > max){
            return `The field may not be greater than ${max}.`
        }else if(Validator.isLength(value,{max}) === false){
            return `The field may not be greater than ${max} characters.`
        }
        return true;
    }
};
module.exports = commonValidations;
