import { Container, Filters, TicketGroupList } from "./components/shared"

function App() {

  return (
    <main>
      <Container className="mt-20 flex gap-10">
        <Filters />
        <TicketGroupList />
      </Container>
    </main>
  )
}

export default App
