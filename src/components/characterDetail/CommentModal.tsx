import React, { useState } from 'react'
import { Character } from '../../interfaces/character';
import { useAppDispatch } from '../../store/store';
import { addComment } from '../../store/slices/charactersSlice';

interface CommentModalProps {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
    selectedCharacter: Character
}

export const CommentModal = ({ setOpenModal, selectedCharacter }: CommentModalProps) => {

    const dispatch = useAppDispatch();

    const [text, setText] = useState('');

    const onAddComment = () => {
        text.trim() && dispatch(addComment({ character: selectedCharacter, comment: text }))
        setOpenModal(prev => !prev)
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-30">
            <div className="bg-white w-3/4 md:w-2/3 max-w-2xl p-6 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Add Comment</h2>
                </div>
                <textarea
                    className="w-full h-32 max-h-32 overflow-y-scroll border rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-300"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>
                <div className="flex flex-col md:flex-row w-full mt-4 gap-2 justify-end">
                    <button
                        className=" bg-principal-100 rounded-md text-principal-300 font-bold px-12 py-2 transition ease-in duration-150 disabled:bg-principal-250 disabled:text-principal-0 "
                        onClick={() => onAddComment()}
                        disabled={!text.trim()}
                    >
                        Add
                    </button>
                    <button onClick={() => setOpenModal(prev => !prev)} className="bg-principal-250 rounded-md font-bold px-12 py-2">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
