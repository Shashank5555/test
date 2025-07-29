import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const CustomCursor = () => {
  const [innerPos, setInnerPos] = useState({ x: 0, y: 0 });
  const [outerPos, setOuterPos] = useState({ x: 0, y: 0 });

  // Update the inner cursor position instantly on mouse move
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setInnerPos({ x: e.clientX, y: e.clientY });
    };
    document.addEventListener('mousemove', handleMove);
    return () => {
      document.removeEventListener('mousemove', handleMove);
    };
  }, []);

  // Smoothly interpolate the outer cursor towards the inner cursor
  useEffect(() => {
    let rafId: number;
    const follow = () => {
      setOuterPos((prev) => {
        const dx = innerPos.x - prev.x;
        const dy = innerPos.y - prev.y;
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        };
      });
      rafId = requestAnimationFrame(follow);
    };
    follow();
    return () => cancelAnimationFrame(rafId);
  }, [innerPos]);

  return (
    <>
      <div
        className="cursor-inner"
        style={{ transform: `translate3d(${innerPos.x}px, ${innerPos.y}px, 0)` }}
      />
      <div
        className="cursor-outer"
        style={{ transform: `translate3d(${outerPos.x}px, ${outerPos.y}px, 0)` }}
      />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CustomCursor />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
