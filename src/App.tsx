import React from "react";
import { Container } from "./components/shared";

const Filters = React.lazy(() => import("./components/shared/filters.tsx"));
const TicketGroupList = React.lazy(() => import("./components/shared/ticket-group-list.tsx"));

function App() {

  const [currency, setCurrency] = React.useState('rub');

  const changeCurrency = (value: string) => {
    setCurrency(value);
  };

  return (
    <main>
      <Container className="my-20 flex gap-10 relative">
        <React.Suspense fallback={<div>Загрузка фильтров...</div>}>
          <Filters changeCurrency={changeCurrency} />
        </React.Suspense>
        <React.Suspense fallback={<div>Загрузка билетов...</div>}>
          <TicketGroupList currency={currency} />
        </React.Suspense>
      </Container>
    </main>
  )
}

export default App
