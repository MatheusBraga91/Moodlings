import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Mood, AvatarType } from '@/app/MainScreen/avatarMap';

interface DayImage {
  image: any; // image source
  message: string; // message associated with the image
  time: string; // time when the mood was set
}


interface UserState {
  name: string;
  avatar: AvatarType;
  dateOfBirth: string;
  zodiacSymbol: string;
  mood: Mood;
  addMoodTriggered: boolean;
  containerUsage: number;
  dayImages: Record<number, DayImage[]>; // images for each day
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

    },
    setDayImages: (
      state,
      action: PayloadAction<Record<number, DayImage[]>>
    ) => {
      state.dayImages = action.payload; // Update images and messages for each day
    },
    updateImageMessage: (
      state,
      action: PayloadAction<{
        day: number;
        imageIndex: number;
        message: string;
      }>
    ) => {
      const { day, imageIndex, message } = action.payload;
      if (state.dayImages[day] && state.dayImages[day][imageIndex]) {
        state.dayImages[day][imageIndex].message = message;
      }
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
  updateImageMessage,
} = userSlice.actions;

export default userSlice.reducer;
