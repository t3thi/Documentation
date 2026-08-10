import Reveal from '../vendor/reveal/reveal.mjs';
import Notes from '../vendor/reveal/plugin/notes.mjs';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const deck = new Reveal({
  width: 1600,
  height: 900,
  margin: 0,
  minScale: 0.2,
  maxScale: 1.5,
  controls: true,
  controlsTutorial: false,
  controlsLayout: 'edges',
  progress: true,
  history: true,
  hash: true,
  center: false,
  touch: true,
  keyboard: true,
  overview: true,
  help: true,
  slideNumber: 'c/t',
  showSlideNumber: 'speaker',
  transition: reducedMotion ? 'none' : 'fade',
  transitionSpeed: 'fast',
  backgroundTransition: reducedMotion ? 'none' : 'fade',
  autoAnimate: false,
  pdfSeparateFragments: false,
  pdfMaxPagesPerSlide: 1,
  plugins: [Notes],
});

deck.initialize().then(() => {
  document.documentElement.classList.add('reveal-ready');
});
