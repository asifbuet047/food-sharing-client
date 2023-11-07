export function isCapitalLetterPresentInPassword(password) {
    const capitals = password.match(/[A-Z]/g);
    console.log(capitals);
    if (capitals) {
        return true;
    } else {
        return false;
    }
};

export function isSpecialCharacterPresentInPassword(password) {
    const special = password.match(/[^a-zA-Z0-9\s]/g);
    console.log(special);
    if (special) {
        return true;
    } else {
        return false;
    }
};
export function isPasswordLengthEnough(password) {
    if (password.length > 6) {
        return true;
    } else {
        return false;
    }
};

export function getProjectName() {
    return 'Community Food Sharing';
}

