import React from "react";
import { Button } from "../ui";
import logo from "@/assets/logo.jpg";
import air from "@/assets/air.png";
import { ITickets } from "@/store/slices/ticketsSlice";

interface Props {
  ticket: ITickets;
}

export const TicketCard: React.FC<Props> = ({ ticket }) => {

  return (
    <div className="bg-white rounded shadow-sm flex">
      <div className="p-8 border-r w-[280px]">
        <img src={logo} width={200} />
        <Button>Купить <br /> за {ticket.price} &#8381;</Button>
      </div>
      <div className="p-8 flex justify-between flex-1 items-center">
        <div className="flex flex-col">
          <span className="text-[40px]">{ticket.departure_time}</span>
          <span>{ticket.origin}, {ticket.origin_name}</span>
          <span className="text-border">{ticket.departure_date}, {ticket.departure_time}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-border">{ticket.stops === 0 ? "Без" : ticket.stops} {ticket.stops === 1 ? "пересадка" : "пересадки"}</span>
          <img src={air} />
        </div>
        <div className="flex flex-col">
          <span className="text-[40px]">{ticket.arrival_time}</span>
          <span>{ticket.destination}, {ticket.destination_name}</span>
          <span className="text-border">{ticket.arrival_date}</span>
        </div>
      </div>
    </div>
  )

}