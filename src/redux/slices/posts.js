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

const initialState = {
  items: [],
  status: 'loading',
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
  },
})

export const postsReducer = postsSlice.reducer