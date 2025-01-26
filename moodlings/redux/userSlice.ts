import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Mood, AvatarType } from '@/app/MainScreen/avatarMap';

interface UserState {
  name: string;
  avatar: AvatarType; // Store the selected avatar type (e.g., 'bunny', 'fox', 'raccoon')
  dateOfBirth: string;
  zodiacSymbol: string;
  mood: Mood; // Mood is strictly typed
}

const initialState: UserState = {
  name: '',
  avatar: 'bunny', // Default avatar type
  dateOfBirth: '',
  zodiacSymbol: '',
  mood: 'Default', // Default mood
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<{ name: string; avatar: AvatarType; dateOfBirth: string; zodiacSymbol: string }>) => {
      state.name = action.payload.name;
      state.avatar = action.payload.avatar; // Store the avatar type
      state.dateOfBirth = action.payload.dateOfBirth;
      state.zodiacSymbol = action.payload.zodiacSymbol;
    },
    setMood: (state, action: PayloadAction<Mood>) => {
      state.mood = action.payload; // Update the user's mood
    },
  },
});

export const { setUserInfo, setMood } = userSlice.actions;
export default userSlice.reducer;
