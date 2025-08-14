import { RootState } from "@/src/app/_lib/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateProps {
  isDiscardNoteModalOpen: boolean;
  isCancelNoteModalOpen: boolean;
  currentFont: string;
}

export const initialState: initialStateProps = {
  isDiscardNoteModalOpen: false,
  isCancelNoteModalOpen: false,
  currentFont: "sans",
};

export const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    onToggleDiscardModal(state, action: PayloadAction<boolean>) {
      state.isDiscardNoteModalOpen = action.payload;
    },

    onToggleCancelModal(state, action: PayloadAction<boolean>) {
      state.isCancelNoteModalOpen = action.payload;
    },

    onUpdateFont(state, action: PayloadAction<string>) {
      state.currentFont = action.payload;
    },
  },
});

export const { onToggleDiscardModal, onToggleCancelModal, onUpdateFont } =
  noteSlice?.actions;

export const getNotes = (state: RootState) => state?.notes;

export default noteSlice?.reducer;
