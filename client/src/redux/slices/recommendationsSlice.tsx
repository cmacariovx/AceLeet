import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Recommendations {
    recommendedTopics: {}[],
    recommendedProblems: {}[],
}

const initialState: Recommendations = {
    recommendedTopics: [],
    recommendedProblems: [],
}

const recommendationsSlice = createSlice({
    name: 'recommendations',
    initialState,
    reducers: {
        updateRecommendations: (state, action: PayloadAction<Recommendations>) => {
            state.recommendedTopics = action.payload.recommendedTopics;
            state.recommendedProblems = action.payload.recommendedProblems;
        },
    },
});

export const { updateRecommendations } = recommendationsSlice.actions;
export default recommendationsSlice.reducer;
