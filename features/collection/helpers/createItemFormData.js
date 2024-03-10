export const createItemFormData = (
  { obverse, reverse, ...values },
  user,
  type,
) => {
  if (type?.isNumistaType) values.numista_id = type.id;
  else values.type = type.id;
  const formData = new FormData();
  formData.append("files.obverse", {
    uri: obverse.uri,
    type: "image/jpeg",
    name: `${user.id}_${Date.now().toString()}_${obverse.uri.split("/").pop()}`,
  });
  formData.append("files.reverse", {
    uri: reverse.uri,
    type: "image/jpeg",
    name: `${user.id}_${Date.now().toString()}_${reverse.uri.split("/").pop()}`,
  });
  formData.append("data", JSON.stringify(values));
  return formData;
};
