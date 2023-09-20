import React from 'react';

const images = require.context('../resources/individial_signs/', false, /\.(png)$/);

// Map the letters to sign language images
const letterToSignImage = {
  a: 'a.png',
  b: 'b.png',
  c: 'c.png',
  d: 'd.png',
  e: 'e.png',
  f: 'f.png',
  g: 'g.png',
  h: 'h.png',
  i: 'i.png',
  j: 'j.png',
  k: 'k.png',
  l: 'l.png',
  m: 'm.png',
  n: 'n.png',
  o: 'o.png',
  p: 'p.png',
  q: 'q.png',
  r: 'r.png',
  s: 's.png',
  t: 't.png',
  u: 'u.png',
  v: 'v.png',
  w: 'w.png',
  x: 'x.png',
  y: 'y.png',
  z: 'z.png',
};

// Translate a word or sentence to sign language
function translate(text) {
  const lowerText = text.toLowerCase();

  // Filter out non-alphabetic characters
  const letters = lowerText.split('').filter((letter) => /[a-z]/.test(letter));

  const translation = letters.map((letter, index) => {
    // Check if letter has a corresponding image
    if (letterToSignImage.hasOwnProperty(letter)) {
      const imageFilename = letterToSignImage[letter];
      const imgSrc = images(`./${imageFilename}`);

      return <img key={index} src={imgSrc} alt={letter} />;
    } else {
      return letter;
    }
  });

  translation.unshift(<p key="heading">Translated Text:</p>);

  return translation;
}

export default translate;
