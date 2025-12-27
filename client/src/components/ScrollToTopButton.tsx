import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTabs = () => {
  const el = document.getElementById("product-tabs");
  if (el) {
    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};


  if (!visible) return null;

  return (
    <button
      onClick={scrollToTabs}
      className="
      fixed bottom-6 left-1/2 -translate-x-1/2
      z-50 rounded-full
      bg-primary text-primary-foreground
      p-3 shadow-lg animate-bounce
      hover:scale-110 transition-transform
      
    "
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
