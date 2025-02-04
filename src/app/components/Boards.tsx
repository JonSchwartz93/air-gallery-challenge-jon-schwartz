import React, { useState, useEffect } from 'react'
import { fetchBoards, Board } from '../api/boards';
import { Loader } from './Loader';
const Boards = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  
  useEffect(() => {
    fetchBoards().then((response) => {
        setBoards(response.data);
    })
  }, [])

  return (
    <div>
        <h1>Boards ({boards.length})</h1>
        {
            boards ? (
                <div className="flex">
                    {boards.map((board) => {
                        // const height = asset.height / 10;
                        // const width = asset.width / 10;
                        const imageURL = `${board.thumbnails?.[0]}?auto=format,compress&fit=crop&max-h=216&max-w=211`;

                        return (
                            <div key={board.id} className="relative inline-block mr-4 rounded-sm">
                                <img src={imageURL} alt={board.title} className="block"/>
                                <h2 className="absolute bottom-2 left-2 text-white bg-black bg-opacity-50 px-2 py-1 rounded">{board.title}</h2>
                            </div>
                        )
                    }
                    )}
                </div>
            ) : (
                <Loader numberOfSkeletons={4} />
            )
        }
    </div>
  )
}

export default Boards;
