import React from 'react';
import { Card } from '../../Interfaces/kanban';
import { Trash2 } from "react-feather";

import "./KanbanCard.css";

interface KanbanCardProps {
    card: Card;
    boardId: number;
	removeCard: (boardId: number, cardId: number) => void;
    onDragEnd: (boardId: number, cardId: number) => void;
    onDragEnter: (boardId: number, cardId: number) => void;
}

function KanbanCard({ 
	card, 
	boardId, 
	removeCard,
	onDragEnd, 
	onDragEnter, 
}: KanbanCardProps) {
	
	const { id, title } = card;

	return (
		<>
			<div
				className="card"
				key={card.id}
				draggable
				onDragEnd={() => onDragEnd(boardId, id)}
				onDragEnter={() => onDragEnter(boardId, id)}
			>
				{/* Display title based on length of title */}
				<div className="card-title">
					{
						title.length < 10 ? title : `${title.slice(0, 10)}...`
					}
				</div>
				{/* Delete the card */}
				<Trash2 
					size={16}
					style={{
						marginTop: 7
					}}
					onClick={() => removeCard(boardId, id)}
				/>
      		</div>
    	</>
	)
}

//Use memo as Higher Order Component to avoid unnecessarly re-rendering
export default React.memo(KanbanCard);
