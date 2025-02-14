import { useState } from 'react';

const StarRating = ({ onChange, value: initialValue, name }) => {
  const [rating, setRating] = useState(initialValue || 0);

  const handleRatingChange = (value) => {
    setRating(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
      <div className="relative">
        <div className="flex flex-row-reverse gap-1 transform-gpu preserve-3d perspective-[1000px]">
          {[5, 4, 3, 2, 1].map((value) => (
              <label
                  key={value}
                  htmlFor={`${name}-star${value}`}
                  title={`${value} star${value === 1 ? '' : 's'}`}
                  className="relative flex flex-col items-center justify-center gap-1 cursor-pointer transition-all duration-500 group"
              >
                <input
                    type="radio"
                    id={`${name}-star${value}`}
                    name={`rating-${name}`}
                    value={value}
                    className="hidden"
                    onChange={() => handleRatingChange(value)}
                    checked={rating === value}
                />

                {/* Base star */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-all duration-500 ${
                        rating >= value
                            ? 'stroke-transparent'
                            : 'stroke-gray-300 group-hover:stroke-yellow-400 peer-hover:stroke-yellow-400'
                    }`}
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>

                {/* Overlay star */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`absolute top-0 transition-all duration-500 fill-yellow-400 stroke-transparent 
                ${rating >= value
                        ? 'opacity-100 animate-[displayStar_0.5s_cubic-bezier(0.75,0.41,0.82,1.2)]'
                        : 'opacity-0'
                    }
                hover:animate-[checkStar_0.6s_ease-out]`}
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>

                {/* Shadow */}
                <div
                    className={`w-8 h-2 transition-opacity duration-600 delay-200 bg-[radial-gradient(ellipse_closest-side,rgba(0,0,0,0.24),rgba(0,0,0,0))] 
                ${rating >= value
                        ? 'opacity-100'
                        : 'opacity-0 group-hover:opacity-30'
                    }`}
                />
              </label>
          ))}
        </div>
      </div>
  );
};

export default StarRating;