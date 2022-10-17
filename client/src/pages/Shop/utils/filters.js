const handleFilter = (allProducts, tags, allTags ) => {   
    let dataFiltered = [...allProducts];
    tags.forEach((tag) => {
      dataFiltered = dataFiltered.filter((p) =>  p.filterTags.find((t)=> t.id=== Number(tag))  );
    });    
    return dataFiltered;
  };

  export default handleFilter;