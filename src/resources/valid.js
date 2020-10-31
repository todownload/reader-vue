
const phonePattern = /^[1][3,4,5,7,8][0-9]{9}$/

const emailPattern = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+.([A-Za-z]{2,4})$/;

const pwdPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;

function phoneValid(phone){
    return phonePattern.test(phone);
}

function emailValid(email){
    return emailPattern.test(email);
}

function pwdValid(password){
    return pwdPattern.test(password);
}

export const VALID_PHONE = phoneValid;

export const VALID_EMAIL = emailValid;

export const VALID_PWD = pwdValid;