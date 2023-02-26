import React, { useCallback, useEffect, useState } from 'react';
import Input from '../../Components/Input/Input';
import KanbanBoard from '../../Components/KanbanBoard/KanbanBoard';
import { fetchKanbanBoardData, updateLocalStorageBoards } from '../../Helper/LocalStorageKanbanData';
import { Board } from '../../Interfaces/kanban';

import "./Dashboard.css";

export default function Dashboard() {

	const [kanbanBoard, setKanbanBoard] = useState<Board[]>([]);
	const [targetCardAndBoard, setTargetCardAndBoard] = useState({
		boardId: 0,
		cardId: 0,
	});

	//Add Board to Kanban
	const addBoard =  useCallback((name: string) => {
		setKanbanBoard(prevKanbanBoard => [
			...prevKanbanBoard,
			{
			  id: Date.now() + Math.random() * 2,
			  title: name,
			  cards: [],
			},
		]);
	}, []); 

	//Delete board from kanban
	const removeBoard = useCallback((boardId: number) => {
		setKanbanBoard(prevKanbanBoard => {
			const boardIndex = prevKanbanBoard.findIndex((board: Board) => board.id === boardId);
			if (boardIndex < 0) return prevKanbanBoard;
		
			const tempKanbanBoards = [...prevKanbanBoard];
			tempKanbanBoards.splice(boardIndex, 1);
			return tempKanbanBoards;
		});
	}, []);

	//Add Card to Board
	const addCardToBoard = useCallback((boardId: number, title: string) => {
		const boardIndex = kanbanBoard.findIndex((board: Board) => board.id === boardId);
		if (boardIndex < 0) return;
	
		const tempKanbanBoards = [...kanbanBoard];
		tempKanbanBoards[boardIndex].cards = [...tempKanbanBoards[boardIndex].cards,
			{
				id: Date.now() + Math.random() * 2,
				title
			}
		];
		setKanbanBoard(tempKanbanBoards);
	}, [kanbanBoard]);

	//Remove Card from Board
	const removeCard = useCallback((boardId: number, cardId: number) => {
		const boardIndex = kanbanBoard.findIndex((board: Board) => board.id === boardId);
		if (boardIndex < 0) return;
	
		const tempKanbanBoards = kanbanBoard.map((board) => {
			if (board.id !== boardId) return board;
		
			const updatedCards = board.cards.filter((card) => card.id !== cardId);
			return {
			  ...board,
			  cards: updatedCards,
			};
		});
		setKanbanBoard(tempKanbanBoards);
	}, [kanbanBoard]);

	//Update board when drag of card is completed
	const onDragEnd = useCallback((boardId: number, cardId: number) => {
		const sourceBoardIndex = kanbanBoard.findIndex(board => board.id === boardId);
		const targetBoardIndex = kanbanBoard.findIndex(board => board.id === targetCardAndBoard.boardId);
		if (sourceBoardIndex < 0 || targetBoardIndex < 0) return;

		const { cards: sourceCards } = kanbanBoard[sourceBoardIndex];
		const sourceCardIndex = sourceCards.findIndex(card => card.id === cardId);
		if (sourceCardIndex < 0) return;

		const { cards: targetCards } = kanbanBoard[targetBoardIndex];
		const targetCardIndex = targetCards.findIndex(card => card.id === targetCardAndBoard.cardId);
		if (targetCardIndex < 0) return;

		const tempKanbanBoards = kanbanBoard.map(board => ({ ...board, cards: [...board.cards] }));
		const sourceCard = tempKanbanBoards[sourceBoardIndex].cards[sourceCardIndex];
		tempKanbanBoards[sourceBoardIndex].cards.splice(sourceCardIndex, 1);
		tempKanbanBoards[targetBoardIndex].cards.splice(targetCardIndex, 0, sourceCard);
		setKanbanBoard(tempKanbanBoards);

		setTargetCardAndBoard({
			boardId: 0,
			cardId: 0,
		});
	}, [kanbanBoard, targetCardAndBoard]);

	//Check which board the card is entered while dragging
	const onDragEnter = useCallback((boardId: number, cardId: number) => {
		if (targetCardAndBoard.cardId === cardId) return;

		setTargetCardAndBoard({
			boardId: boardId,
			cardId: cardId,
		});					
	}, [targetCardAndBoard]);

	//Get the Board Data once the components mount
  	useEffect(() => {
		(async () => {
			try {
			  const boardData = await fetchKanbanBoardData();
			  setKanbanBoard(boardData);
			} catch (error) {
			  console.error(error);
			}
		})();
	}, []);

	//Update Local Storage to save new kanban board data
	useEffect(() => {
		updateLocalStorageBoards(kanbanBoard);
	}, [kanbanBoard]);

	return (
		<div className="app">
			<div className="app-nav">
				<h1>Kanban Board (Stellar Culinary Personnel LTD)</h1>
			</div>
			<div className="app-boards-container">
				<div className="app-boards">
					{kanbanBoard.map((board) => (
						<KanbanBoard
							key={board.id}
							board={board}
							removeBoard={removeBoard}
							addCard={addCardToBoard}
							removeCard={removeCard}
							onDragEnd={onDragEnd}
							onDragEnter={onDragEnter}
						/>
					))}
					<div className="app-boards-last">
						<Input
							displayClass="app-boards-add-board"
							editClass="app-boards-add-board-edit"
							placeholder="Enter Board Name"
							text="+ Add Board"
							buttonText="Add Board"
							onSubmit={addBoard}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
