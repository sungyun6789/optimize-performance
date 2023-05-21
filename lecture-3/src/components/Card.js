import React, { useEffect, useRef } from "react";

function Card(props) {
  const imgRef = useRef(null);

  // IntersectionObserver을 최초 한 번만 실행하기 위해 useEffect에서 실행함
  useEffect(() => {
    const options = {};
    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const previousSibling = target.previousSibling;

          console.log("is intersecting", entry.target.dataset.src);
          target.src = target.dataset.src;
          previousSibling.srcset = previousSibling.dataset.srcset;
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="Card text-center">
      <picture>
        {/* source에 존재하는 webp 형식을 우선적으로 지원하고, 지원하지 않을 경우 img 태그 렌더 */}
        {/* type="not-suuport"로 설정하면 지원하지 않는 상태를 확인 가능함 */}
        <source data-srcset={props.webp} type="image/webp" />
        <img data-src={props.image} ref={imgRef} />
      </picture>
      <div className="p-5 font-semibold text-gray-700 text-xl md:text-lg lg:text-xl keep-all">
        {props.children}
      </div>
    </div>
  );
}

export default Card;
