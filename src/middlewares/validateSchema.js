export const validateSchema = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      console.log(req.body);
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid data on fields"});
    }
  };
};