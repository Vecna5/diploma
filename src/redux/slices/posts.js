import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../utils/axios'

export const fetchTop = createAsyncThunk(
  'posts/fetchDreams',
  async () => {
    const { data } = await axios.get('/top')
    return data
  }
)

export const fetchPostsByUser = createAsyncThunk(
  'posts/fetchPostsByUser',
  async (userId) => {
    const { data } = await axios.get(`dreams/${userId}`)
    return data.dream;
  }
)

export const fetchDreamById = createAsyncThunk(
  'posts/fetchDreamById',
  async (id) => {
    const { data } = await axios.get(`/dream/${id}`);
    return data.dream;
  }
);

export const updateDream = createAsyncThunk(
  'posts/updateDream',
  async ({ id, title, content, mood, isPublic, tags }) => {
    const response = await axios.patch(`/dreams/${id}`, { title, content, mood, isPublic, tags });
    return response.data.data;
  }
);

export const fetchDreamImages = createAsyncThunk(
  'posts/fetchDreamImages',
  async (dreamId) => {
    const { data } = await axios.get(`/images/${dreamId}`);
    return data.images || [];
  }
);
export const deleteLastDreamImage = createAsyncThunk(
  'posts/deleteLastDreamImage',
  async (dreamId, { dispatch }) => {
    const token = localStorage.getItem('token');
    await axios.delete(`/images/last/${dreamId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(fetchDreamImages(dreamId));
  }
);
export const uploadDreamImages = createAsyncThunk(
  'posts/uploadDreamImages',
  async ({ files, dreamId }, { dispatch }) => {
    const formData = new FormData();
    files.forEach(file => formData.append('image', file));
    formData.append('dreamId', dreamId);

    await axios.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    dispatch(fetchDreamImages(dreamId));
  }
);

const initialState = {
  items: [],
  status: 'loading',
  currentDream: null,
  currentDreamImages: [],
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTop.pending, (state) => {
        state.status = 'loading'
        state.items = []
      })
      .addCase(fetchTop.fulfilled, (state, action) => {
        state.status = 'loaded'
        state.items = action.payload
      })
      .addCase(fetchTop.rejected, (state) => {
        state.status = 'error'
        state.items = []
      })
      .addCase(fetchPostsByUser.pending, (state) => {
        state.status = 'loading'
        state.items = []
      })
      .addCase(fetchPostsByUser.fulfilled, (state, action) => {
        state.status = 'loaded'
        state.items = action.payload
      })
      .addCase(fetchPostsByUser.rejected, (state) => {
        state.status = 'error'
        state.items = []
      })
      .addCase(fetchDreamById.pending, (state) => {
        state.currentDream = null;
      })
      .addCase(fetchDreamById.fulfilled, (state, action) => {
        state.currentDream = action.payload;
      })
      .addCase(fetchDreamById.rejected, (state) => {
        state.currentDream = null;
      })
      .addCase(updateDream.fulfilled, (state, action) => {
        state.currentDream = action.payload;
      })
      .addCase(fetchDreamImages.pending, (state) => {
        state.currentDreamImages = [];
      })
      .addCase(fetchDreamImages.fulfilled, (state, action) => {
        state.currentDreamImages = action.payload;
      })
      .addCase(fetchDreamImages.rejected, (state) => {
        state.currentDreamImages = [];
      });
  },
})

export const postsReducer = postsSlice.reducer;