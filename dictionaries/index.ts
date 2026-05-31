import 'server-only';

const dictionaries = {
  it: () => import('./it.json').then((module) => module.default),
  sl: () => import('./sl.json').then((module) => module.default),
};

export const getDictionary = async (locale: 'it' | 'sl') => {
  return dictionaries[locale]();
};
