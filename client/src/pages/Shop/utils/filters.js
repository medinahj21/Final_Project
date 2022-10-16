const handleFilter = (allProducts, tags, allTags ) => {    
    let dataFiltered = [...allProducts];
    tags.forEach((tag) => {
      dataFiltered = dataFiltered.filter((p) => {
        return p.filter_tags.includes(allTags.find((t) => t.id === tag).name);
      });
    });
    
    
    return dataFiltered;
  };

  export default handleFilter;