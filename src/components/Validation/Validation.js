export const checkIfNumber = (dataInput) => {
    const re = /^[0-9\b]+$/;

    // if value is not blank, then test the regex

    if (dataInput !== "" && re.test(dataInput)) {
      return true;
    } else {
      return false;
    }
  };

  export const checkIfLetter = (dataInput) => {
    const re = /^(?:[A-Za-z])+$/;

    // if value is not blank, then test the regex

    if (dataInput !== "" && re.test(dataInput)) {
      return true;
    } else {
      return false;
    }
  };