import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { THEMES } from '../app/cardThemes/themes'; // Import the themes lookup table
import { DETAILS, DetailsCategory } from '../app/EditScreen/details'; // Import the details lookup table and type

// Define the type for the theme key
type ThemeKey = keyof typeof THEMES;

// Define the initial state
interface CardThemeState {
    currentTheme: ThemeKey; // Store the key of the current theme
    currentDetail: string | null; // Store the path of the current detail (or null if no detail is applied)
}

const initialState: CardThemeState = {
    currentTheme: 'babyblue', // Default theme
    currentDetail: null, // Default detail is empty
};

// Create the slice
const cardThemeSlice = createSlice({
    name: 'cardTheme',
    initialState,
    reducers: {
        // Action to change the theme
        setTheme: (state, action: PayloadAction<ThemeKey>) => {
            state.currentTheme = action.payload;
        },
        // Action to set the current detail
        setDetail: (state, action: PayloadAction<string | null>) => {
            state.currentDetail = action.payload;
        },
    },
});

// Export the actions and reducer
export const { setTheme, setDetail } = cardThemeSlice.actions;
export default cardThemeSlice.reducer;
