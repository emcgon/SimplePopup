.simple-popup-stack {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  min-width: 48ch;
  max-width: 72ch;
  z-index: 314159;
}

.simple-popup {
  --popup-animation-time: 250ms;
  width: 100%;
  border-radius: .5rem;
/*   margin-top: 0.25rem; */
  padding: 0.5rem 1rem;
  transform-origin: center top;
  transform: scale(0);
  transition: transform var(--popup-animation-time) ease-in-out;
}

.simple-popup.visible {
  transform: scale(1);
}

@media (prefers-reduced-motion) {
  .popup {
    --popup-animation-time: 1ms;  
    transform: scale(1);
  }
}

.simple-popup.error {
  background: #c00;
  color: white;
  font-weight: bold;
}

.simple-popup.warning {
  background: darkorange;
  color: white;
  font-weight: bold;
}

.simple-popup.info {
  background: green;
  color: white;
  font-weight: bold;
}
