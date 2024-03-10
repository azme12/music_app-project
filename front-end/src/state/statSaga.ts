import {call, put, takeEvery} from 'redux-saga/effects';
import axios, {AxiosResponse} from 'axios';
import {setStats, setIsLoading} from './songs/statSlice';

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

// Example API call
const fetchStatsApi = () => {
  return axios.get(`${VITE_BASE_URL}/songs/stats`);
};

export function* fetchStats() {
  try {
    yield put(setIsLoading(true));
    const response: AxiosResponse = yield call(fetchStatsApi);
    yield put(setStats(response.data));
    yield put(setIsLoading(false));
  } catch (error) {
    console.error('Error fetching stats:', error);
    yield put(setIsLoading(false));
  }
}

export function* watchFetchStats() {
  yield takeEvery('stats/fetch', fetchStats);
}
