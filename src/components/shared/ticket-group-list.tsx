import React from "react";
import { TicketCard } from "./ticket-card";
import { RootState, useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import { fetchTickets } from "@/store/slices/ticketsSlice";

interface Props {

}

export const TicketGroupList: React.FC<Props> = ({ }) => {
  const dispatch = useAppDispatch();
  const tickets = useSelector((state: RootState) => state.tisket.data)

  React.useEffect(() => {
    dispatch(
      fetchTickets({ transfer: [] })
    );
  }, []);

  console.log(tickets)
  return (
    <div className="w-full flex flex-col gap-5">
      {
        tickets.map((ticket, index) => (
          <TicketCard key={index} ticket={ticket} />
        ))
      }

    </div>
  )

}