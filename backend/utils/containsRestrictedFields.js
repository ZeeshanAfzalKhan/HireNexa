const containsRestrictedField = (obj, restrictedFields) =>  {
  for (const key in obj) {
    if (restrictedFields.includes(key)) {
      return true;
    }

    const value = obj[key];
    if (typeof value === "object" && value !== null) {
      if (containsRestrictedField(value, restrictedFields)) {
        return true;
      }
    }
  }
  return false;
}

export default containsRestrictedField;