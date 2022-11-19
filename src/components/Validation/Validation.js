export const checkIfNumber = (dataInput) => {
    const re = /^[0-9\b]+$/;


    if (dataInput.length <= 0) {
      return {isValid : false, errorMsg : "ضروری است !"};
    } else if(!re.test(dataInput)){
      return {isValid : false, errorMsg : "صحیح نمی باشد !"};
    }else{
      return {isValid : true}
    }
  };

  export const checkIfLetter = (dataInput) => {
    const re = /^(?:[A-Za-z])+$/;
    const p = /^[\u0600-\u06FF\s]+$/
 

    if (dataInput.length <= 0) {
      return {isValid : false, errorMsg : "ضروری است !"};
    } else if(!p.test(dataInput)){
      return {isValid : false, errorMsg : "صحیح نمی باشد !"};
    }else{
      return {isValid : true}
    }
  };

