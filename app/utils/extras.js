export const removeDbTimestamps = (data) => {
  if (Array.isArray(data)) {
    // if data is an array, loop through each item and remove timestamps
    return data.map((item) => {
      delete item.createdAt;
      delete item.updatedAt;
      delete item.deletedAt;
      return item;
    });
  }
  // if data is a single object, remove timestamps directly
  delete data.createdAt;
  delete data.updatedAt;
  delete data.deletedAt;
  return data;
};
