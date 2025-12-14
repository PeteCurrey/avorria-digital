// City hero images for location pages
import londonImage from "@/assets/cities/london.jpg";
import manchesterImage from "@/assets/cities/manchester.jpg";
import birminghamImage from "@/assets/cities/birmingham.jpg";
import leedsImage from "@/assets/cities/leeds.jpg";
import liverpoolImage from "@/assets/cities/liverpool.jpg";
import edinburghImage from "@/assets/cities/edinburgh.jpg";
import glasgowImage from "@/assets/cities/glasgow.jpg";
import bristolImage from "@/assets/cities/bristol.jpg";
import newcastleImage from "@/assets/cities/newcastle.jpg";
import nottinghamImage from "@/assets/cities/nottingham.jpg";
import cardiffImage from "@/assets/cities/cardiff.jpg";
import sheffieldImage from "@/assets/cities/sheffield.jpg";
import yorkshireImage from "@/assets/cities/yorkshire.jpg";
import ukImage from "@/assets/cities/uk.jpg";
import newYorkImage from "@/assets/cities/new-york.jpg";
import losAngelesImage from "@/assets/cities/los-angeles.jpg";
import chicagoImage from "@/assets/cities/chicago.jpg";
import sanFranciscoImage from "@/assets/cities/san-francisco.jpg";
import bostonImage from "@/assets/cities/boston.jpg";
import miamiImage from "@/assets/cities/miami.jpg";
import austinImage from "@/assets/cities/austin.jpg";
import denverImage from "@/assets/cities/denver.jpg";
import seattleImage from "@/assets/cities/seattle.jpg";
import atlantaImage from "@/assets/cities/atlanta.jpg";

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
};

export const getCityImage = (locationSlug: string): string | undefined => {
  return cityImages[locationSlug];
};
