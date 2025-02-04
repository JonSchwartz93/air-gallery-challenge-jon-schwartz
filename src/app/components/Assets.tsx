import React, { useState, useEffect, useRef } from 'react'
import { fetchAssets, Clip } from '../api/clips';

// onHover info - asset type, size, dimensions "jpg - 3MB - 320 x 220"

const Assets = () => {
  const [assets, setAssets] = useState({
    total: 0,
    clips: [] as Clip[],
    pagination: { cursor: null, hasMore: true },
  });

  const [loading, setLoading] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    loadMoreAssets();

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreAssets();
        }
      },
      {
        rootMargin: "100px",
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, []);

  const loadMoreAssets = async () => {
    if (loading || !assets.pagination.hasMore) return;

    setLoading(true);

    const response = await fetchAssets({
      cursor: assets.pagination.cursor,
    });

    setAssets((prev) => ({
        total: response.data.total,
        clips: prev.clips.concat(response.data.clips),
        pagination: {
          cursor: response.pagination?.cursor || null,
          hasMore: response.pagination?.hasMore || false, 
        },
    }));

    setLoading(false);
  };

  console.log('the assets', assets);
    return (
      <div className='mt-4'>
          <h1>Assets ({assets.total})</h1>
          <div key={Math.random()} className="flex flex-wrap">
            {assets.clips.map((asset, index) => {
                const height = asset.height / 10;
                const width = asset.width / 10;

                const imageURL = `${asset.assets.image}?auto=format,compress&fit=crop&h=${height}&w=${width}`;

                return (
                    <div key={index} className="m-4">
                        <img src={imageURL} alt={asset.description}/>
                    </div>
                )
            })}
          </div>
          <div ref={observerRef} style={{ height: "20px", background: "transparent" }} />
          {loading && <p>Loading more assets...</p>}
      </div>
    )
}

export default Assets