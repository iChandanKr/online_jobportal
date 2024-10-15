const sort = (sort) => {
  let arr;
  if (sort) {
    const sortingFields = sort.split(",");
    arr = sortingFields.map((column) => {
      if (column[0] == "-") {
        const newColmn = column.slice(1);
        return [newColmn, "DESC"];
      } else {
        return [column, "ASC"];
      }
    });
  } else {
    return ["updatedAt", "DESC"];
  }
    // console.log(arr);
  return arr;
};

const limitFields = (showFields) => {
  const fields = showFields.split(",");
  if (fields.includes("password")) {
    const index = fields.indexOf("password");
    fields.splice(index, 1);
  }
  return fields;
};

// exports.filter = (filter)=>{

// }

const paginate = (page, limit) => {
  page = parseInt(page);
  limit = parseInt(limit);
  const skip = (page - 1) * limit;
  return skip;
};

const search = (name) => {
  const search_string = `%${name}%`;
  return search_string;
};

module.exports = {
  sort,
  limitFields,
  paginate,
  search,
};
