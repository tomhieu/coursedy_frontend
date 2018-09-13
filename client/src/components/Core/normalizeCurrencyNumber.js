const normalizeCurrency = (value, previousValue) => {
  if (!value) {
    return value;
  }
  const trimValue = value.replace(/[^0-9]/g, '');
  var re = '(\\d)(?=(\\d{3})+' + '$' + ')';
  return Number(trimValue).toFixed(Math.max(0, 0)).replace(new RegExp(re, 'g'), '$1,');
};

export default normalizeCurrency;
