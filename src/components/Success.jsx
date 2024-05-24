import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';

export default function Success() {
  const [isVisible, setIsVisible] = useState(true);
  const { width, height } = useWindowSize();

  useEffect(() => {
    // Afficher les confettis et l'alerte pendant 5 secondes puis les masquer
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    // Nettoyage du timer lorsque le composant est démonté
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
     
      {isVisible && (
        <>
          <Confetti width={width} height={height} />
          <div role="alert" className="alert alert-success fixed top-4 left-1/2 transform -translate-x-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Les données ont bien été envoyées !</span>
          </div>
        </>
      )}
    </div>
  );
}
