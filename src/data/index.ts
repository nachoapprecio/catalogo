import chile from './giftcards_chile.json';
import peru from './giftcards_peru.json';
import mexico from './giftcards_mexico.json';
import colombia from './giftcards_colombia.json';
import ecuador from './giftcards_ecuador.json';

export const giftcardsByCountry: Record<string, typeof chile> = {
  Chile: chile,
  Perú: peru,
  México: mexico,
  Colombia: colombia,
  Ecuador: ecuador,
};
