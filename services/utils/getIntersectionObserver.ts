import { Dispatch, SetStateAction } from 'react';

const option = {
  rootMargin: '-20px 0px -75% 0px',
  threshold: 1.0,
};

export function getIntersectionObserver(setState: Dispatch<SetStateAction<string>>) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setState(entry.target.id);
      }
    });
  }, option);

  return observer;
}
