const updateNestedFields = (target, updates) => {
  for (let key in updates) {
    if (
      typeof updates[key] === "object" &&
      !Array.isArray(updates[key]) &&
      target[key]
    ) {
      // recursively update nested objects
      updateNestedFields(target[key], updates[key]);
    } else if (updates[key] !== undefined) {
      target[key] = updates[key];
    }
  }
};

export default updateNestedFields;