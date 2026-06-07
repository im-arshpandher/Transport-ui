import { configureStore } from '@reduxjs/toolkit'
import colorModeReducer from './colorModeSlice'
import authReducer from './authSlice'

export default configureStore({
  reducer: {
    darkMode: colorModeReducer,
    auth: authReducer
  }
})