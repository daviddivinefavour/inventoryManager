export const returnResult = (type, data) => ({ type, ...data });

export const response = (data) => (title) => (res) => {
  const {
    status = 400,
    message = 'Oops, an unknown error occurred',
    entity
  } = data;
  return res.status(status).send({
    status,
    title,
    message,
    entity
  });
};
