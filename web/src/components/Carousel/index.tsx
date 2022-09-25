import { CaretLeft, CaretRight } from "phosphor-react";
import { useRef } from "react";

interface CarouselProps {
  children: React.ReactNode;
}

const Carousel = ({ children }: CarouselProps) => {
  const carrouselRef = useRef<HTMLDivElement>(null);

  const handleRightClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (carrouselRef.current) {
      carrouselRef.current.scrollLeft += 228;
    }
  };

  const handleLeftClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (carrouselRef.current) {
      carrouselRef.current.scrollLeft -= 228;
    }
  };

  return (
    <div className="w-full flex items-center gap-6">
      <button onClick={handleLeftClick} className="w-12 h-12 flex-none">
        <CaretLeft size="100%" className="text-zinc-500" />
      </button>
      <div
        ref={carrouselRef}
        className="grid grid-flow-col gap-6 w-full overflow-hidden scroll-smooth"
      >
        {children}
      </div>
      <button onClick={handleRightClick} className="w-12 h-12 flex-none">
        <CaretRight size="100%" className="text-zinc-500" />
      </button>
    </div>
  );
};

export default Carousel;
