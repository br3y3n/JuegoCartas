import React, { useEffect, useState } from 'react';

export const Card = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);
  const [activeCards, setActiveCards] = useState([]);
  const [cardStats, setCardStats] = useState({ vida: null, hab1: null, hab2: null });

  useEffect(() => {
    const fetchRandomCards = async () => {
      try {
        const storedCards = localStorage.getItem('cards');
        if (storedCards) {
          setCards(JSON.parse(storedCards));
        } else {
          const response = await fetch('https://api.pokemontcg.io/v2/cards?pageSize=100');
          const data = await response.json();
          const shuffledCards = data.data.sort(() => 0.5 - Math.random()).slice(0, 8);
          setCards(shuffledCards);
          localStorage.setItem('cards', JSON.stringify(shuffledCards));
        }
      } catch (error) {
        console.error('Error fetching Pokémon cards:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomCards();
  }, []);

  const handleCardClick = (card) => {
    if (activeCards.includes(card) ) return; 
    setSelectedCard(card);
  };

  const handleClose = () => {
    setSelectedCard(null);
  };

  const handleSelectStat = (type) => {
    if (!selectedCard) return;

    // añadir carta seleccionada a las cartas activas
    setActiveCards((prev) => [...prev, selectedCard]); 

    // Guarda la estadística de acuerdo al tipo seleccionado
    switch (type) {
      case 'vida':
        setCardStats((prev) => ({ ...prev, vida: selectedCard.hp || 0 }));
        break;
      case 'hab1':
        setCardStats((prev) => ({ ...prev, hab1: selectedCard.attacks?.[0]?.damage || selectedCard.attacks?.[1]?.damage || 'Sin Habilidad' }));
        break;
      case 'hab2':
        setCardStats((prev) => ({ ...prev, hab2: selectedCard.attacks?.[1]?.damage || selectedCard.attacks?.[0]?.damage || 'Sin Habilidad' }));
        break;
      default:
        break;
    }

    setSelectedCard(null); // Cierra el modal al seleccionar
  };

  if (loading) return <p>Loading...</p>;

  const handleGameMode = (stat) => {
    switch (stat) {
        case 'vida':
            return (<img className='h-svh' src='/img/juegoVIda.png'/>)
        case 'hab1':
            return (<img src='/img/juegoHab1.png'/>)
        case 'hab2':
            return (<img src='/img/juegoHab2.png'/>)
        default:
            break;
    }
  }

  return (
    <div className="relative flex">
      {/* Sección de cartas activas en la parte izquierda */}
      <div className="w-1/4 p-4 bg-gray-100">
        <h2 className="text-xl font-semibold mb-4">Cartas en Juego</h2>
        {activeCards.map((card, index) => (
          <div key={index} className="mb-4">
            <img className="h-[8em] rounded-lg shadow-lg" src={card.images.small} alt={card.name} />
            <p className="mt-2 text-sm">{card.name}</p>
          </div>
        ))}
        {/* Mostrar estadísticas seleccionadas */}
        <div className="mt-4">
          <p>Puntos de Vida: {cardStats.vida || 'No seleccionados'}</p>
          <p>Habilidad 1: {cardStats.hab1 || 'No seleccionada'}</p>
          <p>Habilidad 2: {cardStats.hab2 || 'No seleccionada'}</p>
        </div>
      </div>

      {/* Cuadrícula de cartas disponibles */}
      <div className="grid grid-cols-4 gap-4 p-4 w-3/4">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`transform transition duration-300 hover:-translate-y-2 hover:scale-105 cursor-pointer ${
              activeCards.includes(card) ? 'opacity-50' : ''
            }`}
            onClick={() => handleCardClick(card)}
          >
            <img className="h-[15em] rounded-lg shadow-lg" src={card.images.small} alt={card.name} />
          </div>
        ))}
      </div>

      {/* Modal para mostrar la carta seleccionada en el centro de la pantalla */}
      {selectedCard && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative">
            <button
              className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-600 p-2 rounded-full"
              onClick={handleClose}
            >
              ✕
            </button>
            <img
              className="max-h-[90vh] rounded-lg shadow-2xl"
              src={selectedCard.images.large || selectedCard.images.small}
              alt={selectedCard.name}
            />
          </div>
          <div className="block ml-10">
            <img
              className="cursor-pointer"
              src="/img/Vida.png"
              alt="Vida"
              onClick={() => {
                handleSelectStat('vida')
                handleGameMode('vida')
            }}
            />
            <img
              className="cursor-pointer"
              src="/img/hab1.png"
              alt="Habilidad 1"
              onClick={() => handleSelectStat('hab1')}
            />
            <img
              className="cursor-pointer"
              src="/img/hab2.png"
              alt="Habilidad 2"
              onClick={() => handleSelectStat('hab2')}
            />
            {

            }
          </div>
        </div>
      )}
    </div>
  );
};

