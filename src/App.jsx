import Header from "./components/Header"
import Footer from "./components/Footer"

function App() {
  

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Main content goes here */}
        Hello!
      </main>
      <Footer />
    </div>
  );
}

export default App
