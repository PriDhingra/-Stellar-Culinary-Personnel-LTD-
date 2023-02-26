import React, { useState, useCallback, memo } from 'react';
import { X } from "react-feather";

import "./Input.css";

interface InputProps {
    text: string;
    onSubmit: (value: string) => void;
    displayClass?: string;
    editClass?: string;
    placeholder?: string;
    defaultValue?: string;
    buttonText?: string;
}

function Input({
	text,
	onSubmit,
	displayClass,
	editClass,
	placeholder,
	defaultValue,
	buttonText,
}: InputProps) {
	  
	const [isInput, setIsInput] = useState(false);
	const [inputText, setInputText] = useState(defaultValue || "");
	
	//Avoid unnecessarly re-rendering. Called when user clicks on Add Button
	const formSubmission = useCallback((event: any) => {
		event.preventDefault();
		if (inputText && onSubmit) {
			setInputText("");
			onSubmit(inputText);
		}
		setIsInput(false);
	}, [inputText]);
	
	return (
		<div className="custom-input">
			{/* Dislay form based on isInput state variable, otherwise display add card button */}
		  	{
				isInput ? (
					<form
						className={`custom-input-edit ${editClass ? editClass : ""}`}
						onSubmit={formSubmission}
					>
						<input
							type="text"
							value={inputText}
							placeholder={placeholder || text}
							onChange={(event) => setInputText(event.target.value)}
							autoFocus
						/>
						<div className="custom-input-edit-footer">
							<button type="submit">{buttonText || "Add"}</button>
							<X onClick={() => setIsInput(false)} className="closeIcon" />
						</div>
					</form>
		  		) : (
					<p
						className={`custom-input-display ${displayClass ? displayClass : ""}`}
						onClick={() => setIsInput(true)}
					>
						{text}
					</p>
		  		)
			}
		</div>
	  );
}

//Use memo as Higher Order Component to avoid unnecessarly re-rendering
export default memo(Input);