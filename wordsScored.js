"use strict";
import { possibleAnswers } from "./corpus.js";

const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];


// check frequency of each letter
const letterFrequency = {};

for (let i = 0; i < alphabet.length; i++) {
  letterFrequency[alphabet[i]] = 0;
  for (let j = 0; j < possibleAnswers.length; j++) {
    //each letter is awarded a score based on in how many words it appears in the possible answers
    if (possibleAnswers[j].includes(alphabet[i])) {
      letterFrequency[alphabet[i]]++;
    }
  }
}


const wordScorer = function (word) {
  let score = 0;
  for (const letter of word) {
    score += letterFrequency[letter];
    if (word.indexOf(letter) !== word.lastIndexOf(letter)) {
      //punish repetition
      score -= letterFrequency[letter];
    }
  }
  return score;
};

//here are the possible answers converted into scores based on the overall frequency of the letters they contain
const possibleAnswersMapped = possibleAnswers.map(wordScorer);

const possibleAnswersMappedCopy = [...possibleAnswersMapped];

const possibleAnswersMappedSorted = possibleAnswersMappedCopy.sort(
  (a, b) => b - a
);

export const finalSorted = [];

for (let i = 0; i < possibleAnswersMappedSorted.length; i++) {
  let position = possibleAnswersMapped.indexOf(possibleAnswersMappedSorted[i]);
  //removing the score
  possibleAnswersMapped[position] = 0;
  finalSorted.push(possibleAnswers[position]);
}
