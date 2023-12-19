export const validateSchema = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid username or password"});
    }
  };
};