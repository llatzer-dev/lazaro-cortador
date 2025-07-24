const PREFIX_LOCAL = 'cortador-de-jamon';

const SUFIX_LOCAL = [
  'calpe',
  'javea',
  'moraira',
  'benidorm',
  'aspe',
  'novelda',
  'elda',
];

export const LOCALIDADES_VALIDAS = SUFIX_LOCAL.map(
  (sufijo) => `${PREFIX_LOCAL}-${sufijo}`
);
