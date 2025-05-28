import { useEffect, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

type Review = {
  id: number;
  name: string;
  position: string;
  content: string;
  rating: number;
};

const reviews: Review[] = [
  {
    id: 1,
    name: "Michael Thompson",
    position: "Sports Data Analyst",
    content: "SportBNK has completely transformed how we analyze sports data! The platform's real-time updates and intuitive interface have significantly improved our workflow efficiency.",
    rating: 5,
  },
  {
    id: 2,
    name: "Matthew Price",
    position: "Founder of Filtr Sports",
    content: "SportBNK is the best app I have used with trying to grow my company and access direct links to clubs I am looking to target.",
    rating: 5,
  },
  {
    id: 3,
    name: "Sarah Johnson",
    position: "Marketing Director",
    content: "Outstanding platform that has revolutionized our sports content strategy. The data quality and depth of information available is unmatched in the industry.",
    rating: 5,
  },
];

const ReviewCard = ({ review }: { review: Review }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex items-start mb-4">
        <div>
          <div className="flex items-center mb-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg 
                key={i}
                className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <h3 className="font-bold text-sportbnk-navy">{review.name}</h3>
          <p className="text-sm text-gray-500">{review.position}</p>
        </div>
      </div>
      <div className="relative pl-8">
        <Quote size={20} className="absolute left-0 top-0 text-sportbnk-green" />
        <p className="text-gray-700">{review.content}</p>
      </div>
    </div>
  );
};

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxVisibleReviews = 2;
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && sectionRef.current) {
          sectionRef.current.classList.add('is-visible');
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + maxVisibleReviews >= reviews.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? reviews.length - maxVisibleReviews : prevIndex - 1
    );
  };

  const visibleReviews = reviews.slice(currentIndex, currentIndex + maxVisibleReviews);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold mb-16 text-center text-sportbnk-navy">
          Ready to transform your sales strategy with accurate data within sports industry
        </h2>
        
        <div 
          ref={sectionRef}
          className="animate-when-visible"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {visibleReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            <button 
              onClick={prevSlide}
              className="p-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Previous review"
            >
              <ChevronLeft size={20} />
            </button>
            
            <button 
              onClick={nextSlide}
              className="p-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Next review"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
