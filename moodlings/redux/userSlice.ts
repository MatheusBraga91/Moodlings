import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Mood, AvatarType } from '@/app/MainScreen/avatarMap';

interface UserState {
  name: string;
  avatar: AvatarType;
  dateOfBirth: string;
  zodiacSymbol: string;
  mood: Mood;
  addMoodTriggered: boolean;
  containerUsage: number;
  dayImages: Record<number, (any | null)[]>; // Store images for each day
}

const initialState: UserState = {
  name: '',
  avatar: 'bunny',
  dateOfBirth: '',
  zodiacSymbol: '',
  mood: 'Default',
  addMoodTriggered: false,
  containerUsage: 0,
  dayImages: {}, // Initialize the dayImages state
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (
      state,
      action: PayloadAction<{
        name: string;
        avatar: AvatarType;
        dateOfBirth: string;
        zodiacSymbol: string;
      }>
    ) => {
      state.name = action.payload.name;
      state.avatar = action.payload.avatar;
      state.dateOfBirth = action.payload.dateOfBirth;
      state.zodiacSymbol = action.payload.zodiacSymbol;
    },
    setMood: (state, action: PayloadAction<Mood>) => {
      state.mood = action.payload;
    },
    triggerAddMood: (state) => {
      state.addMoodTriggered = true;
    },
    resetAddMoodTrigger: (state) => {
      state.addMoodTriggered = false;
    },
    incrementContainerUsage: (state) => {
      if (state.containerUsage < 4) {
        state.containerUsage += 1;
      }
    },
    resetContainerUsage: (state) => {
      state.containerUsage = 0;
    },
    replaceFirstMood: (state) => {
      // This reducer can remain as is or be expanded later.
    },
    setDayImages: (
      state,
      action: PayloadAction<Record<number, (any | null)[]>>
    ) => {
      state.dayImages = action.payload; // Update the images for each day
    },
  },
});

export const {
  setUserInfo,
  setMood,
  triggerAddMood,
  resetAddMoodTrigger,
  incrementContainerUsage,
  resetContainerUsage,
  setDayImages,
} = userSlice.actions;

export default userSlice.reducer;
