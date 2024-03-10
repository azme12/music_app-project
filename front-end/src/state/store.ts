import {configureStore} from '@reduxjs/toolkit';
import songsReducer from './songs/songsSlice';
import songsStatisticsReducer from './songs/songsStatisticsSlice';
import songsDataStatisticsReducer from './songs/songsDataStatisticsSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import PlayerReducer from '../state/songs/PlayerSlcie';
import statsReducer from '../state/songs/statSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    songs: songsReducer,
    songsStatistics: songsStatisticsReducer,
    songsDataStatistics: songsDataStatisticsReducer,
    player: PlayerReducer,
    stats: statsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
