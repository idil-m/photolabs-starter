import { useReducer, useEffect } from 'react';
import photos from '../mocks/photos';
import topics from '../mocks/topics';



export const ACTIONS = {
  FAV_PHOTO_ADDED: 'FAV_PHOTO_ADDED',
  FAV_PHOTO_REMOVED: 'FAV_PHOTO_REMOVED',
  SET_PHOTO_DATA: 'SET_PHOTO_DATA',
  SET_TOPIC_DATA: 'SET_TOPIC_DATA',
  SELECT_PHOTO: 'SELECT_PHOTO',
  TOGGLE_MODAL_DISPLAY: 'TOGGLE_MODAL_DISPLAY',
  TOGGLE_FAVORITE: 'TOGGLE_FAVORITE',
}

const initialState = {
  modalState: { displayModal: false, selectedPhoto: null, similarPhotos: [] },
  favorites: new Set(),
  photos: photos,
  topics: topics,
  
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.FAV_PHOTO_ADDED:
      return { ...state, favorites: [...state.favorites, action.payload] };
    case ACTIONS.FAV_PHOTO_REMOVED:
      return { ...state, favorites: state.favorites.filter(fav => fav !== action.payload) };
    case ACTIONS.SET_PHOTO_DATA:
      return { ...state, photos: action.payload };
    case ACTIONS.SET_TOPIC_DATA:
      return { ...state, topics: action.payload };
    case ACTIONS.SELECT_PHOTO:
      return { ...state, modalState: { ...state.modalState, selectedPhoto: action.payload, displayModal: true, similarPhotos:Object.values(action.payload.similarPhotos) } };
    case ACTIONS.TOGGLE_MODAL_DISPLAY:
      return { ...state, modalState: { ...state.modalState, displayModal: action.payload } };
    case ACTIONS.TOGGLE_FAVORITE:
      const isFavorite = state.favorites.has(action.payload);
      const updatedFavorites = new Set(state.favorites);
      if (isFavorite) {
        updatedFavorites.delete(action.payload);
      } else {
        updatedFavorites.add(action.payload);
      }
      return { ...state, favorites: updatedFavorites };


    default:
      throw new Error(`Unsupported action type: ${action.type}`);

  }

}

const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const toggleFavorite = photoId => {
    dispatch({ type: ACTIONS.TOGGLE_FAVORITE, payload: photoId });
  };
  const setSelectedPhoto = photo => {
    dispatch({ type: ACTIONS.SELECT_PHOTO, payload: photo });
  };
  const setDisplayModal = (display) => {
    dispatch({ type: ACTIONS.TOGGLE_MODAL_DISPLAY, payload: display });
  };
  return {
    state,
    dispatch,
    toggleFavorite,
    setSelectedPhoto,
    setDisplayModal
  };
};
export default useApplicationData;