/* const validateURL = (url) => {
    return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg|bmp)$/.test(url);
  }; */
  
  const validateName = (name) => {
    if (name.length < 30 && typeof name === "string"){
        return true
    }else {
        return false;
    }
  };

  const validateNumbers = (value) => {
    if (Number(value)) return true;
    return false;
  };

  const validateDescription = (name) => {
    if (name.length < 150 && typeof name === "string"){
        return true
    }else {
        return false;
    }
  };


  
  /* const validateAbilities = (value) => {
    return /^[a-zA-Z,\s]*$/g.test(value);
  }; */

const validateProduct= (prod)=>{

  if (!prod.name || prod.name <3){
    return res.status(400).json({error: "Product name must be provided and larger than 2 characters"})
  } else if (!validateName(prod.name)){
    return res.status(400).json({error: "Product's name must in string format"})
  } else if (prod.price && !validateNumbers(prod.price)){
    return res.status(400).json({error: "The price must be number"})
  } else if (!validateNumbers(prod.stock)){
    return res.status(400).json({error: "The stock field must be a number"})
  } else if (!validateNumbers(prod.payment_term)){
    return res.status(400).json({error: "The payment_term field must be a number"})
  } else if (!validateDescription(prod.description)){
    return res.status(400).json({error: "Product description must be an string and must be shorter than 150 characters"})
  } else if (prod.modifiers.length ===0){
    return res.status(400).json({error: "Product modifiers must be provided"})
  }

    
}

module.exports= {
    validateProduct,
}

