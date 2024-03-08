
export const nameValidator = name => {
    if (name.length < 2) {
        return false
    } else {
        return true
    }
}

export const emailValidator = email => {
    if (email.length < 2) {
        return false
    } else {
        return true
    }
}

export const passwordValidator = password => {
    if (password.length < 2) {
        return false
    } else {
        return true
    }
}