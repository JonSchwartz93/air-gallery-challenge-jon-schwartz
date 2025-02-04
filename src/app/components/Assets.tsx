import React, { useState, useEffect } from 'react'
import { fetchAssets, Clip } from '../api/clips';

const Assets = () => {
  const [assets, setAssets] = useState({
    total: 0,
    clips: [] as Clip[],
    pagination: {},
  });
  const [cursor, setCursor] = useState(null);
//   const [loading, setLoading] = useState(false);

    useEffect(() => {
      fetchAssets({ cursor }).then((response) => {
        setAssets({
            total: response.data.total,
            clips: response.data.clips, //[...assets.clips, ...response.data.clips],
            pagination: response.pagination,
        });
      })
    }, [])

    return (
      <div className='mt-4'>
          <h1>Assets ({assets.total})</h1>
          {assets.clips.map((asset) => {
            const height = asset.height / 10;
            const width = asset.width / 10;

            const imageURL = `${asset.assets.image}?auto=format,compress&fit=crop&h=${height}&w=${width}`;

            return (
                <div key={asset.id}>
                    <img src={imageURL} alt={asset.description}/>
                </div>
            )
          })}
      </div>
    )
}

export default Assets