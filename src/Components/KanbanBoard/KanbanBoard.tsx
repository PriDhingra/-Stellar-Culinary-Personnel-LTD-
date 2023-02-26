import React from 'react';
import { Trash2 } from "react-feather";
import { Board } from '../../Interfaces/kanban';
import Input from '../Input/Input';
import KanbanCard from '../KanbanCard/KanbanCard';

import "./KanbanBoard.css";

interface KanbanBoardProps {
    board: Board;
	removeBoard: (boardId: number) => void;
    addCard: (boardId: number, title: string) => void;
	removeCard: (boardId: number, cardId: number) => void;
    onDragEnd: (boardId: number, cardId: number) => void;
    onDragEnter: (boardId: number, cardId: number) => void;
}

function KanbanBoard({
	board,
	removeBoard,
	addCard,
	removeCard,
	onDragEnd,
	onDragEnter
}: KanbanBoardProps) {
	
	return (
		<div className="board">
			<div className="board-inner" key={board?.id}>
				{/* Display board header */}
				<div className="board-header">
					<p className="board-header-title">
						{board?.title}
						<span>{board?.cards?.length || 0}</span>
					</p>
					<Trash2 
						size={16}
						onClick={() => removeBoard(board?.id)}
					/>
				</div>
				<div className="board-cards custom-scroll">
					{/* //Display Card inside board */}
					{
						board?.cards?.map((card) => (
							<KanbanCard
								key={card.id}
								card={card}
								boardId={board.id}
								removeCard={removeCard}
								onDragEnter={onDragEnter}
								onDragEnd={onDragEnd}	
							/>
						))
					}
					{/* Display message if their are no cards */}
					{
						board?.cards?.length === 0 && (
							<div>
								This board is empty. Drag and drop cards here or click the "+ Add Card" button to add a card.
							</div>
                    	)
					}
					<Input
						text="+ Add Card"
						placeholder="Title"
						displayClass="board-add-card"
						onSubmit={(value: string) => addCard(board?.id, value)}
					/>
				</div>
			</div>
		</div>
	)
}

//Use memo as Higher Order Component to avoid unnecessarly re-rendering
export default React.memo(KanbanBoard);
