const normalizePhone = (value, previousValue) => {
  if (!value) {
    return value;
  }
  const trimValue = value.replace(/[^0-9|\\+]/g, '');
  if (trimValue.length > 9) {
    return trimValue.replace(/(\\+)?(\d{2})(\d{3})(\d{3})(\d{1,})/, '$1$2 $3 $4 $5');
  } else if (trimValue.length > 6) {
    return trimValue.replace(/(\\+)?(\d{2})(\d{3})(\d{1,})/, '$1$2 $3 $4');
  } else {
    return trimValue.replace(/(\\+)?(\d{2})(\d{1,})/, '$1$2 $3');
  }
}

export default normalizePhone