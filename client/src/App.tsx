import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/contexts/CartContext";
import { AdminAuthProvider } from "./hooks/use-admin-auth"; // Added import
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
import Store from "@/pages/Store";
import Cart from "@/pages/Cart";
import CheckoutSuccess from "@/pages/checkout/Success";
import CheckoutCancel from "@/pages/checkout/Cancel";
import Dashboard from "./pages/admin/Dashboard";

function Router() {
  return (
    <div>
      <Navbar />
      <main>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/training" component={Training} />
          <Route path="/dive-sites" component={DiveSites} />
          <Route path="/diving" component={Diving} />
          <Route path="/contact" component={Contact} />
          <Route path="/store" component={Store} />
          <Route path="/cart" component={Cart} />
          <Route path="/admin" component={Dashboard} />
          <Route path="/checkout/success" component={CheckoutSuccess} />
          <Route path="/checkout/cancel" component={CheckoutCancel} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <FloatingPhoneWidget />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AdminAuthProvider> {/* Added AdminAuthProvider */}
        <CartProvider>
          <Router />
          <Toaster />
        </CartProvider>
      </AdminAuthProvider> {/* Closed AdminAuthProvider */}
    </QueryClientProvider>
  );
}