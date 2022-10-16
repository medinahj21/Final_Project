const handleFilter = (allProducts, tags, allTags ) => { 
    console.log(tags)   
    let dataFiltered = [...allProducts];
    tags.forEach((tag) => {
      dataFiltered = dataFiltered.filter((p) =>  p.filterTags.find((t)=> t.id=== Number(tag))  );
    });
    console.log(dataFiltered) 
    
    return dataFiltered;
  };

  export default handleFilter;