import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

// 1. Definição do Enum conforme solicitado
export enum SortType {
  Default = 'default',
  Alphabetically = 'alphabetically',
  ByLength = 'byLength',
}

export const goodsFromServer: string[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const App: React.FC = () => {
  // Mantemos o tipo de ordenação atual e o estado de inversão
  const [sortType, setSortType] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  // Derivamos a lista ordenada com base no estado atual (Single Source of Truth)
  const visibleGoods = [...goodsFromServer];

  if (sortType === SortType.Alphabetically) {
    visibleGoods.sort((a, b) => a.localeCompare(b));
  } else if (sortType === SortType.ByLength) {
    visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  // Handlers para atualizar o estado
  const handleSortAlphabetically = () => {
    setSortType(SortType.Alphabetically);
  };

  const handleSortByLength = () => {
    setSortType(SortType.ByLength);
  };

  const handleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setSortType(SortType.Default);
    setIsReversed(false);
  };

  // Verifica se a lista foi modificada para exibir ou ocultar o botão Reset
  const isModified = sortType !== SortType.Default || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info is-light ${sortType === SortType.Alphabetically ? 'is-active' : ''}`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success is-light ${sortType === SortType.ByLength ? 'is-active' : ''}`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning is-light ${isReversed ? 'is-active' : ''}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {/* O botão Reset só aparece se a lista tiver sido modificada */}
        {isModified && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
