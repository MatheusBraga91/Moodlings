import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define initial state
interface UserState {
  name: string;
  avatar: string;
  dateOfBirth: string;
  zodiacSymbol: string;
  mood: string;
  avatarMood: string;
}

const initialState: UserState = {
  name: '',
  avatar: '',
  dateOfBirth: '',
  zodiacSymbol: '',
  mood: '',  // No mood initially
  avatarMood: '',  // No mood expression initially
};

// Create user slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<{ name: string; avatar: string; dateOfBirth: string; zodiacSymbol: string }>) => {
      state.name = action.payload.name;
      state.avatar = action.payload.avatar;
      state.dateOfBirth = action.payload.dateOfBirth;
      state.zodiacSymbol = action.payload.zodiacSymbol;
    },
    setMood: (state, action: PayloadAction<string>) => {
      state.mood = action.payload;
      state.avatarMood = `${state.avatar}${action.payload}.png`; // e.g., "foxsad.png"
    },
  },
});

// Export actions and reducer
export const { setUserInfo, setMood } = userSlice.actions;
export default userSlice.reducer;
