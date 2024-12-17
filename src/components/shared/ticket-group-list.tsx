import React from "react";
import { TicketCard } from "./ticket-card";
import { RootState, useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import { fetchTickets } from "@/store/slices/ticketsSlice";

interface Props {
  currency: string;
}

const TicketGroupList: React.FC<Props> = ({ currency }) => {
  const dispatch = useAppDispatch();
  const tickets = useSelector((state: RootState) => state.tisket.data)

  React.useEffect(() => {
    dispatch(
      fetchTickets({ transfer: [] })
    );
  }, []);

  return (
    <div className="w-full flex flex-col gap-5">
      {
        tickets.map((ticket, index) => (
          <TicketCard key={index} ticket={ticket} currency={currency} />
        ))
      }
    </div>
  )
}

export default TicketGroupList;