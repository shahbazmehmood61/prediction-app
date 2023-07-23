'use client';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useFetch } from '@/app/hooks';

function Prediction() {
  const { slug } = useParams();
  const imgRef = React.useRef<HTMLImageElement>(null);
  const { loader, error, data } = useFetch(`images/${slug[1]}`);
  const { error: predictionError, data: predictionData } = useFetch(
    `prediction?id=${slug[0]}&imgId=${slug[1]}`,
    data.length
  );

  useEffect(() => {
    if (predictionData && Array.isArray(predictionData) && predictionData.length > 0) {
      (predictionData[0] as Predict).predictions.forEach((predict: Prediction) => {
        if (!imgRef.current) return null;

        // Bounding box coordinates
        const bbox = {
          ...predict.bbox
        };

        // Calculate width and height of the blue box
        const boxWidth = bbox.x2 - bbox.x1;
        const boxHeight = bbox.y2 - bbox.y1;

        // Create a new div element for the blue box
        const blueBox = document.createElement('div');
        const span = document.createElement('span');

        // Set the position and size of the blue box using CSS styles
        blueBox.style.position = 'absolute';
        blueBox.style.top = `${bbox.y1}px`;
        blueBox.style.left = `${bbox.x1}px`;
        blueBox.style.bottom = `${bbox.y2}px`;
        blueBox.style.right = `${bbox.x2}px`;
        blueBox.style.width = `${boxWidth}px`;
        blueBox.style.height = `${boxHeight}px`;
        blueBox.style.backgroundColor = 'rgba(59, 7, 100, 0.4)';
        blueBox.style.opacity = '0.5'; // Set the opacity to make it semi-transparent

        span.style.position = 'absolute';
        span.style.bottom = '10px';
        span.style.right = '10px';
        span.style.fontWeight = 'bold';
        span.style.color = 'rgb(59, 7, 100)';
        span.innerHTML = `${predict.label} (${(+predict.score * 100).toFixed(0)}%)`;

        blueBox.appendChild(span);
        // Add the blue box element to the image's container
        imgRef.current?.parentNode?.appendChild(blueBox);
      });
    }
  }, [predictionData]);

  if (loader) return <center>Loading...</center>;

  if (error || predictionError) return <center>{error || predictionError}</center>;

  return (
    <div className="predictable-img">
      {!Array.isArray(data) && <img ref={imgRef} id="img" src={`${data['imgPath']}` as string} />}
    </div>
  );
}

export default Prediction;

interface Predict {
  title: string;
  description: string;
  predictions: Array<Prediction>;
}

interface Prediction {
  bbox: {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
  };
  label: string;
  score: number;
}
