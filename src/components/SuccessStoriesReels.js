"use client";
import { useState, useRef } from "react";

export default function SuccessStoriesReels() {
  const [index, setIndex] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentX = useRef(0);

  const reels = [
    {
      id: 1,
      user: "propwealth_investor_1",
      // Appended /embed/ to avoid X-Frame-Options denial
      embedUrl: "https://www.instagram.com/reel/DW8U0M7E5c5/embed/",
      thumbnail: "https://picsum.photos/seed/reel1/400/700",
      avatar: "https://picsum.photos/seed/avatar1/50/50",
      caption: "Bought my first investment property!"
    },
    {
      id: 2,
      user: "propwealth_investor_2",
      embedUrl: "https://www.instagram.com/reel/DXbVweOkxls/embed/",
      thumbnail: "https://picsum.photos/seed/reel2/400/700",
      avatar: "https://picsum.photos/seed/avatar2/50/50",
      caption: "Double digit yields!"
    },
    {
      id: 3,
      user: "propwealth_investor_3",
      embedUrl: "https://www.instagram.com/reel/DYB2NgvFZ3C/embed/",
      thumbnail: "https://picsum.photos/seed/reel3/400/700",
      avatar: "https://picsum.photos/seed/avatar3/50/50",
      caption: "Another one in the bag!"
    }
  ];

  const getOffset = (i, activeIndex, length) => {
    let offset = i - activeIndex;
    if (offset > length / 2) offset -= length;
    if (offset < -length / 2) offset += length;
    return offset;
  };

  const handlePointerDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX;
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    currentX.current = e.clientX;
  };

  const handlePointerUp = () => {
    if (!isDragging.current) return;
    const deltaX = currentX.current - startX.current;
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        setIndex((prev) => (prev + 1) % reels.length);
      } else {
        setIndex((prev) => (prev - 1 + reels.length) % reels.length);
      }
    }
    isDragging.current = false;
  };

  return (
    <div className="stack-carousel-wrapper">
      <div 
        className="stack-carousel-stage" 
        onPointerDown={handlePointerDown} 
        onPointerMove={handlePointerMove} 
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {reels.map((reel, i) => {
          const offset = getOffset(i, index, reels.length);
          
          let translateX = 0, scale = 1, rotateY = 0, zIndex = 10, opacity = 1, blur = 0;

          if (offset === 0) {
            translateX = 0; scale = 1; rotateY = 0; zIndex = 30; opacity = 1; blur = 0;
          } else if (offset === -1) {
            translateX = -130; scale = 0.85; rotateY = 25; zIndex = 20; opacity = 0.8; blur = 2;
          } else if (offset === 1) {
            translateX = 130; scale = 0.85; rotateY = -25; zIndex = 20; opacity = 0.8; blur = 2;
          } else {
            translateX = offset > 0 ? 300 : -300; scale = 0.6; rotateY = offset > 0 ? -50 : 50; zIndex = 0; opacity = 0; blur = 8;
          }

          const cardStyle = {
            transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
            zIndex, opacity,
            filter: `blur(${blur}px)`,
            transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.6s ease, filter 0.6s ease'
          };

          const isActive = offset === 0;

          return (
            <div key={reel.id} className="stack-card-wrapper" style={cardStyle}>
              <div className="reel-card">
                {isActive ? (
                  <iframe
                    src={reel.embedUrl}
                    className="reel-iframe"
                    title={`Instagram Reel ${reel.id}`}
                    frameBorder="0"
                    scrolling="no"
                    allowTransparency={true}
                  />
                ) : (
                  <>
                    <img src={reel.thumbnail} alt="Reel thumbnail" className="reel-bg" />
                    <div className="reel-overlay"></div>
                    <div className="reel-header">
                      <div className="reel-avatar">
                        <img src={reel.avatar} alt={reel.user} />
                      </div>
                      <div className="reel-user-info">
                        <strong>{reel.user}</strong>
                        <span>Original audio</span>
                      </div>
                    </div>
                    <div className="reel-footer">
                      <p>{reel.caption}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}