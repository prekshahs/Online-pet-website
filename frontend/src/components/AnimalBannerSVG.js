import React from 'react';

// Simplified line art SVGs (adapt scale as you wish)

// Dog
export const DogSVG = ({ width = 110, height = 140 }) => (
  <svg width={width} height={height} viewBox="0 0 110 140" fill="none" stroke="#231F20" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 110 Q10 90 23 81 Q-3 80 25 50 Q7 62 36 27 Q44 19 62 24 Q90 35 83 53 Q116 70 95 100 Q106 130 70 120 Q84 131 50 132 Q38 132 45 122 Q52 116 60 114 Q44 134 44 123" />
    <ellipse cx="74" cy="59" rx="2" ry="2.5" fill="#231F20" />
    <path d="M87 66 Q91 67 91 62" />
  </svg>
);

// Cat
export const CatSVG = ({ width = 110, height = 125 }) => (
  <svg width={width} height={height} viewBox="0 0 110 125" fill="none" stroke="#231F20" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
    <path d="M28 89 Q7 78 18 62 Q2 36 37 49 Q51 7 65 50 Q104 36 87 66 Q108 77 61 89 Q71 83 47 106 Q66 98 56 120 Q43 115 54 97 Q31 110 42 96" />
    <ellipse cx="54" cy="71" rx="2.3" ry="2.2" fill="#231F20" />
    <ellipse cx="78" cy="66" rx="2.1" ry="1.6" fill="#231F20" />
    <path d="M38 53 C40 62 44 63 47 64" />
  </svg>
);

// Fishbowl
export const FishBowlSVG = ({ width = 90, height = 80 }) => (
  <svg width={width} height={height} viewBox="0 0 90 80" fill="none" stroke="#231F20" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="45" cy="22" rx="40" ry="15" />
    <path d="M5 22 Q5 72 45 72 Q85 72 85 22" />
    <ellipse cx="45" cy="72" rx="40" ry="8" />
    <circle cx="60" cy="46" r="11" />
    <path d="M54 44 Q56 49 60 48 Q62 47 65 52 M57 52 Q58 49 62 51" />
    <ellipse cx="56" cy="47" rx="1" ry="1.2" fill="#231F20" />
  </svg>
);

// Bird
export const BirdSVG = ({ width = 90, height = 90 }) => (
  <svg width={width} height={height} viewBox="0 0 90 90" fill="none" stroke="#231F20" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 67 Q17 38 27 64 Q15 5 50 39 Q80 67 49 43 Q74 27 75 13 Q57 50 87 10" />
    <ellipse cx="48" cy="39" rx="2" ry="2" fill="#231F20" />
    <path d="M49 38 Q55 38 54 41" />
  </svg>
);

// Turtle
export const TurtleSVG = ({ width = 95, height = 60 }) => (
  <svg width={width} height={height} viewBox="0 0 95 60" fill="none" stroke="#231F20" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="45" cy="30" rx="33" ry="22" />
    <path d="M62 52 Q67 60 73 50" />
    <path d="M28 52 Q21 60 15 50" />
    <ellipse cx="13" cy="21" rx="8" ry="5" />
    <ellipse cx="77" cy="18" rx="8" ry="5" />
    <ellipse cx="34" cy="37" rx="2" ry="1.5" fill="#231F20" />
    <ellipse cx="59" cy="37" rx="2" ry="1.5" fill="#231F20" />
    <path d="M24 30 Q45 40 66 30" />
  </svg>
);

// --- Main Export: All in one file ---
const AnimalBannerSVG = {
  DogSVG,
  CatSVG,
  FishBowlSVG,
  BirdSVG,
  TurtleSVG,
};

export default AnimalBannerSVG;
