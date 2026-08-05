class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  //   Pagination
  paginate() {
    const page = number(this.queryString.page) || 1;

    const limit = number(this.queryString.limit) || 10;

    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }

  //   Sorting
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");

      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  //   Searching
  search(searchField = "name") {
    if (this.queryString.search) {
      this.query = this.query.find({
        searchField: {
          $regex: this.queryString.search,
          $options: "i",
        },
      });
    }

    return this;
  }
}

export default ApiFeatures;
