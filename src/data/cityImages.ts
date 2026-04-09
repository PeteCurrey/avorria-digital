
const londonImage = "/assets/cities/london.jpg";
const manchesterImage = "/assets/cities/manchester.jpg";
const birminghamImage = "/assets/cities/birmingham.jpg";
const leedsImage = "/assets/cities/leeds.jpg";
const liverpoolImage = "/assets/cities/liverpool.jpg";
const edinburghImage = "/assets/cities/edinburgh.jpg";
const glasgowImage = "/assets/cities/glasgow.jpg";
const bristolImage = "/assets/cities/bristol.jpg";
const newcastleImage = "/assets/cities/newcastle.jpg";
const nottinghamImage = "/assets/cities/nottingham.jpg";
const cardiffImage = "/assets/cities/cardiff.jpg";
const sheffieldImage = "/assets/cities/sheffield.jpg";
const yorkshireImage = "/assets/cities/yorkshire.jpg";
const ukImage = "/assets/cities/uk.jpg";
const newYorkImage = "/assets/cities/new-york.jpg";
const losAngelesImage = "/assets/cities/los-angeles.jpg";
const chicagoImage = "/assets/cities/chicago.jpg";
const sanFranciscoImage = "/assets/cities/san-francisco.jpg";
const bostonImage = "/assets/cities/boston.jpg";
const miamiImage = "/assets/cities/miami.jpg";
const austinImage = "/assets/cities/austin.jpg";
const denverImage = "/assets/cities/denver.jpg";
const seattleImage = "/assets/cities/seattle.jpg";
const atlantaImage = "/assets/cities/atlanta.jpg";
const lasVegasImage = "/assets/cities/las-vegas.jpg";
const sydneyImage = "/assets/cities/sydney.jpg";
const melbourneImage = "/assets/cities/melbourne.jpg";
const brisbaneImage = "/assets/cities/brisbane.jpg";
const perthImage = "/assets/cities/perth.jpg";
const adelaideImage = "/assets/cities/adelaide.jpg";
const goldCoastImage = "/assets/cities/gold-coast.jpg";
const canberraImage = "/assets/cities/canberra.jpg";
const hobartImage = "/assets/cities/hobart.jpg";
const aucklandImage = "/assets/cities/auckland.jpg";
const wellingtonImage = "/assets/cities/wellington.jpg";
const torontoImage = "/assets/cities/toronto.jpg";
const vancouverImage = "/assets/cities/vancouver.jpg";
const montrealImage = "/assets/cities/montreal.jpg";

export const cityImages: Record<string, string> = {
  london: londonImage,
  manchester: manchesterImage,
  birmingham: birminghamImage,
  leeds: leedsImage,
  liverpool: liverpoolImage,
  edinburgh: edinburghImage,
  glasgow: glasgowImage,
  bristol: bristolImage,
  newcastle: newcastleImage,
  nottingham: nottinghamImage,
  cardiff: cardiffImage,
  sheffield: sheffieldImage,
  yorkshire: yorkshireImage,
  uk: ukImage,
  "new-york": newYorkImage,
  "los-angeles": losAngelesImage,
  chicago: chicagoImage,
  "san-francisco": sanFranciscoImage,
  boston: bostonImage,
  miami: miamiImage,
  austin: austinImage,
  denver: denverImage,
  seattle: seattleImage,
  atlanta: atlantaImage,
  "las-vegas": lasVegasImage,
  sydney: sydneyImage,
  melbourne: melbourneImage,
  brisbane: brisbaneImage,
  perth: perthImage,
  adelaide: adelaideImage,
  "gold-coast": goldCoastImage,
  canberra: canberraImage,
  hobart: hobartImage,
  auckland: aucklandImage,
  wellington: wellingtonImage,
  toronto: torontoImage,
  vancouver: vancouverImage,
  montreal: montrealImage,
};

export const getCityImage = (locationSlug: string): string | undefined => {
  return cityImages[locationSlug];
};
