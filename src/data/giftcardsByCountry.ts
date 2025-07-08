import chile from './giftcards_chile.json';
import peru from './giftcards_peru.json';
import colombia from './giftcards_colombia.json';
import ecuador from './giftcards_ecuador.json';
import mexico from './giftcards_mexico.json';
import planet from '../assets/planet.svg';

export const giftcardsByCountry = {
  chile,
  peru,
  colombia,
  ecuador,
  mexico,
};

export const countryList = [
  {
    code: 'all',
    name: 'Todos los países',
    image: planet,
  },
  {
    code: 'chile',
    name: 'Chile',
    image: 'https://cdn.apprecio.cl/2/emojione_flag_for_chile_20x20_1_c558d689f1.svg',
  },
  {
    code: 'peru',
    name: 'Perú',
    image: 'https://cdn.apprecio.cl/2/emojione_flag_for_peru_20x20_1_912e03823c.svg',
  },
  {
    code: 'colombia',
    name: 'Colombia',
    image: 'https://cdn.apprecio.cl/2/emojione_flag_for_colombia_20x20_1_8feeca2646.svg',
  },
  {
    code: 'ecuador',
    name: 'Ecuador',
    image: 'https://cdn.apprecio.cl/2/emojione_flag_for_ecuador_20x20_1_664ac2bfb2.svg',
  },
  {
    code: 'mexico',
    name: 'México',
    image: 'https://cdn.apprecio.cl/2/mx_flag_8e28f130bf.svg',
  },
];
