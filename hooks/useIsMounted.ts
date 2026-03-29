// import { useSyncExternalStore } from 'react';

// const subscribe = () => () => {};

// export function useIsMounted() {
//   return useSyncExternalStore(
//     subscribe,
//     () => true,  // Значение на клиенте
//     () => false  // Значение на сервере
//   );
// }

import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

export function useIsMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,  // На клиенте
    () => false  // На сервере
  );
}

