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
import Gear from "@/pages/Gear";
import About from "@/pages/About";
import Contact from "@/pages/Contact";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <ScrollToTop />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/dive-sites" component={DiveSites} />
          <Route path="/training" component={Training} />
          <Route path="/gear" component={Gear} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
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