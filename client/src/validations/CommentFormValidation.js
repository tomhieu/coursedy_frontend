import { validateCommentContent } from './CommonValidator';


export const validate = (values) => {
  const errors = {};
  validateCommentContent(values.content, errors);
  return errors;
};
