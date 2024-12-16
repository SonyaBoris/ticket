import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface ITickets {
  origin: string,
  origin_name: string,
  destination: string,
  destination_name: string,
  departure_date: string,
  departure_time: string,
  arrival_date: string,
  arrival_time: string,
  carrier: string,
  stops: number,
  price: number
}

interface IParams {
  transfer: number[];
}

export const fetchTickets = createAsyncThunk<ITickets[], IParams>(
  "tickets/fetchTickets",
  async (params, { rejectWithValue }) => {
    try {
      const stopsQuery = params.transfer.length > 0
        ? `?${params.transfer.map(value => `stops[]=${value}`).join("&")}`: '';


      const { data } = await axios.get<ITickets[]>(
       ` https://63e53e7652c87222.mokky.dev/tickets${stopsQuery}`
    
      );

      localStorage.setItem("tickets", JSON.stringify(data));

      return data;
    } catch (error) {
      console.log(`Failed to fetch:`);
      return rejectWithValue("Failed to fetch tickets");
    }
  }
);

interface IState {
  data: ITickets[];
}

const initialState: IState = {
  data: JSON.parse(localStorage.getItem("tickets") || "[]"),
};

export const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTickets.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default ticketsSlice.reducer;
