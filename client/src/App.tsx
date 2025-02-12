import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingPhoneWidget from "@/components/layout/FloatingPhoneWidget";
import ScrollToTop from "@/components/layout/ScrollToTop";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import DiveSites from "@/pages/DiveSites";
import Training from "@/pages/Training";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Diving from "@/pages/Diving";
import Store from "@/pages/Store"; // Import the Store component

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed Background Image */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: 'url("/images/sb_fin.png")',
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      />

      <Navbar />
      <ScrollToTop />
      <main className="flex-grow relative z-10">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/dive-sites" component={DiveSites} />
          <Route path="/training" component={Training} />
          <Route path="/diving" component={Diving} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/store" component={Store} /> {/* Added Store route */}
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <FloatingPhoneWidget />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;