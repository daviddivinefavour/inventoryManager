export default (app) => {
  app.all('*', (req, res) => {
    res.status(404).send({
      status: 404,
      message: "Oops the url has been moved or doesn't exist"
    });
  });
};
