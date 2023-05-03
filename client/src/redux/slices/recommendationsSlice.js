import { createSlice } from '@reduxjs/toolkit';

const recommendationsSlice = createSlice({
    name: 'recommendations',
    initialState: {
        recommendedTopics: [],
        recommendedProblems: [],
    },
    reducers: {
        updateRecommendations: (state, action) => {
            state.recommendedTopics = action.payload.recommendedTopics;
            state.recommendedProblems = action.payload.recommendedProblems;
        },
    },
});

export const { updateRecommendations } = recommendationsSlice.actions;
export default recommendationsSlice.reducer;
