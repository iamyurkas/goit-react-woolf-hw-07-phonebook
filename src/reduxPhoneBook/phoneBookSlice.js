import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

const handlePending = (state, { payload }) => {
  state.contacts.isLoading = true;
  state.contacts.error = null;
};

const handleReject = (state, { payload }) => {
  state.contacts.error = payload;
  state.contacts.isLoading = false;
};

const phoneBookSlice = createSlice({
  name: 'phoneBook',
  initialState: {
    contacts: {
      items: [],
      isLoading: false,
      error: null,
    },
    filter: '',
  },

  reducers: {
    setFilter(state, { payload }) {
      state.filter = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.rejected, handleReject)
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.contacts.items = payload;
        state.contacts.isLoading = false;
      })

      .addCase(addContact.pending, handlePending)
      .addCase(addContact.rejected, handleReject)
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.contacts.items = [...state.contacts.items, payload];
        state.contacts.isLoading = false;
      })

      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.rejected, handleReject)
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.contacts.items = state.contacts.items.filter(
          contact => contact.id !== payload.id
        );
        state.contacts.isLoading = false;
      });
  },
});
export const { setFilter } = phoneBookSlice.actions;
export const phoneBookReducer = phoneBookSlice.reducer;
