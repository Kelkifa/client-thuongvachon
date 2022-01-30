import "./FastFingersPage.scss";

import {useEffect, useState} from "react";

import PropTypes from "prop-types";
import React from "react";
import clsx from "clsx";
import {useMemo} from "react";
import {useRef} from "react";

// import {ffStrToArr, ffStrToArr2} from "../cores/fastFingersCores";

FastFingersPage.propTypes = {
	lineNumber: PropTypes.number,
	lineHeight: PropTypes.number,
	str: PropTypes.string,
};
FastFingersPage.defaultProps = {
	lineNumber: 7,
	lineHeight: 26.67,
	str: "How to win at video games: When I was little, I would go on Nickelodeon.com all the time and they had this game similar to Club Penguin, except it was called Nicktropolis. And if you forgot your password, a security question you could choose was \"What is your eye color?\" and if you got it right it'd tell you your password. So I would go to popular locations in Nicktropolis and write down random usernames who were also in those areas, and then I would log out and type in the username as if it were my own and see which of these usernames had a security question set to “What is your eye color?” (Which was most of them, since it was easy and we were all kids). I would then try either brown, blue, or green, and always get in, then I would go to their house and send all of their furniture and decorations to my own accounts. And if I didn't want it, I could sell it for money. Drama at my drama class: One time my drama class's teacher had gone home sick so we were just put in a classroom with a movie to entertain us for the period when an alarm went off. None of us were sure if it was the fire alarm or the lockdown alarm, so we all head out into the hall to check and no one's out there, so we head back in and climb under our desks as is lockdown procedure. Cut to an hour or so later when a teacher bursts in and nearly dies of relief because the school was on fire and we were the only students not accounted for and half the faculty and fire department had been searching for us for ages. Literally, the whole school had filled with smoke while we'd kept super safe under our wooden desks.",
};

// 152.22px : 26 ky tu ==> 1 ky tu = 5.86px

// 15 lines
const TEXT_ITEM_CLASS = "fast-fingers__text__item";

function FastFingersPage({lineNumber, lineHeight, str}) {
	const defaultWordList = useMemo(() => {
		return str.split(" ").map((value, index) => ({
			index,
			isTrue: null,
			value,
		}));
	}, [str]);

	const wordContaierRef = useRef(null);

	// STATE COUNTER
	const [count, setCount] = useState(0);

	useEffect(() => {
		const intervalHandle = setInterval(() => {
			setCount(preCount => preCount + 1);
		}, 1000);

		return () => {
			clearInterval(intervalHandle);
		};
	}, []);

	// STATE TEXT
	const [inputValue, setInputValue] = useState("");

	const [firstWordIndex, setFirstWordIndex] = useState(0);
	const [lastWordIndex, setLastWordIndex] = useState(
		defaultWordList.length - 1
	);
	const [targetWordIndex, setTargetWordIndex] = useState(0);

	const [wordList, setWordList] = useState(defaultWordList);

	// USE EFFECT
	// thay đổi firstWordIndex khi targetWordIndex == index của từ cuối của dòng kế cuối
	useEffect(() => {
		if (targetWordIndex === lastWordIndex + 1) {
			setFirstWordIndex(lastWordIndex + 1);
		}
	}, [targetWordIndex, lastWordIndex]);

	// Lấy index của từ cuối của dòng kế cuối
	useEffect(() => {
		if (wordContaierRef.current == null) return;

		const wordContaierEle = wordContaierRef.current;

		const spanEleList = Array.from(
			document.querySelectorAll(`.${TEXT_ITEM_CLASS}`)
		);

		const GRADIENT = 3;

		const foundLastWordIndex = spanEleList.findIndex((spanEle, index) => {
			if (
				spanEle.offsetLeft + spanEle.offsetWidth <=
					wordContaierEle.offsetLeft + wordContaierEle.offsetWidth + GRADIENT &&
				spanEle.offsetLeft + spanEle.offsetWidth >=
					wordContaierEle.offsetLeft + wordContaierEle.offsetWidth - GRADIENT
			) {
				const spanTop = spanEle.offsetTop;
				const spanHeight = spanEle.offsetHeight;

				const containerTop = wordContaierEle.offsetTop;
				if (
					spanTop + spanHeight + GRADIENT >=
						containerTop + spanHeight * lineNumber - spanHeight &&
					spanTop + spanHeight - GRADIENT <=
						containerTop + spanHeight * lineNumber - spanHeight
				)
					return true;
			}
			return false;
		});

		if (foundLastWordIndex === -1) {
			setLastWordIndex(wordList.length);
			return;
		}

		setLastWordIndex(foundLastWordIndex + firstWordIndex);
	}, [firstWordIndex, lineNumber, wordList.length]);

	// HANDLE FUNCTIONS
	// Handle Space Click
	const handleSpaceClick = value => {
		setInputValue("");
		if (targetWordIndex === wordList.length) {
			// finish
			return;
		}
		setTargetWordIndex(targetWordIndex + 1);

		const copyWordList = [...wordList];
		copyWordList[targetWordIndex].isTrue =
			value === wordList[targetWordIndex].value ? true : false;
		setWordList(copyWordList);
	};
	// Handle Input Value
	const handleInputChange = e => {
		const value = e.target.value;

		if (value[value.length - 1] === " ") {
			handleSpaceClick(value.slice(0, -1));
			return;
		}

		const copyWordList = [...wordList];
		if (value !== wordList[targetWordIndex].value.slice(0, value.length)) {
			copyWordList[targetWordIndex].isFailBg = true;
		} else {
			copyWordList[targetWordIndex].isFailBg = false;
		}
		setWordList(copyWordList);

		setInputValue(value);
	};
	return (
		<div className="fast-fingers grid wide">
			<div className="fast-fingers__control-bar">{count}</div>
			<div
				className="fast-fingers__text"
				ref={wordContaierRef}
				style={{"--line": lineNumber}}
			>
				{wordList
					.slice(firstWordIndex, wordList.length)
					.map((wordInfo, index) => (
						<span
							key={wordInfo.index}
							className={clsx(TEXT_ITEM_CLASS, {
								"text--focus": wordInfo.index === targetWordIndex,
								"text--fail-focus":
									wordInfo.isFailBg && targetWordIndex === wordInfo.index,
								"text--true": wordInfo.isTrue,
								"text--false": wordInfo.isTrue === false,
							})}
						>
							{wordInfo.value} {/* &nbsp; */}
						</span>
					))}
			</div>

			<input
				type="text"
				className="fast-fingers__input"
				value={inputValue}
				onChange={handleInputChange}
			/>
		</div>
	);
}

export default FastFingersPage;
