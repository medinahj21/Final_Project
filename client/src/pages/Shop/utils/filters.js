export const handleFilter = (allProducts, tags, allTags) => {
  console.log(tags);
  let dataFiltered = [...allProducts];
  tags.forEach((tag) => {
    dataFiltered = dataFiltered.filter((p) =>
      p.filterTags.find((t) => t.id === Number(tag))
    );
  });
  console.log(dataFiltered);

  return dataFiltered;
};

//===============CREATE VALIDATORS===============================

export function validateName(input) {
  let regxp = /^([a-zA-Z0-9_-\s]){1,25}$/;
  return regxp.test(input);
}

export function validateURL(url) {
  let regxp = /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg|bmp)$/;
  return regxp.test(url);
}

export function validatePrice(input) {
  console.log(input);
  if (input < 5000) return false;
  return true;
}

export function validateDescription(input) {
  let regxp = /^([a-zA-Z0-9_-\s]){5,200}$/;
  return regxp.test(input);
}

export function validatePaymentTerm(input) {
  if (input > 180) return false;
  return true;
}

