import React, { useState, useEffect } from 'react';

function ReportMealCls(props) {
	return (
		<div className="wrapperSliders">
            <p>{props.part}{'\u00A0'}{'\u00A0'}Teilnehmer</p>
			<div className="nameMealDiv">
				<div className="sliderLabel">Vollkost</div>
				<div className="sliderLabel">Vegetarisch</div>
				<div className="sliderLabel">Suppe</div>
                <div className="sliderLabel">Salat</div>
				<div className="sliderLabel">Dessert</div>
			</div>
			<div className="slidersDiv">
				<div className="sliderLabel">
					<input
						className="sliderMeal"
						value={props.vkMeal}
						id="vkMeal"
						type="range"
						max={props.part}
						min="0"
						onWheel={props.wheelHandler}
						onChange={async (e) => {
							props.vkHandler(parseInt(e.target.value));
						}}
					/>
				</div>
				<div className="sliderLabel">
					<input
						className="sliderMeal"
						value={props.vgMeal}
						id="vgMeal"
						type="range"
						max={props.part}
						min="0"
						onWheel={props.wheelHandler}
						onChange={async (e) => {
							props.vgHandler(parseInt(e.target.value));
						}}
					/>
				</div>
                <div className="sliderLabel">
					<input
						className="sliderMeal"
						value={props.soup}
						id="soup"
						type="range"
						max={props.vkMeal+props.vgMeal}
						min="0"
						onWheel={props.wheelHandler}
						onChange={async (e) => {
							props.soupHandler(parseInt(e.target.value));
						}}
					/>
				</div>
                <div className="sliderLabel">
					<input
						className="sliderMeal"
						value={props.salad}
						id="salad"
						type="range"
                        max={props.vkMeal+props.vgMeal}
						min="0"
						onWheel={props.wheelHandler}
						onChange={async (e) => {
							props.saladHandler(parseInt(e.target.value));
						}}
					/>
				</div>
                <div className="sliderLabel">
					<input
						className="sliderMeal"
						value={props.dessert}
						id="dessert"
						type="range"
						max={props.vkMeal+props.vgMeal}
						min="0"
						onWheel={props.wheelHandler}
						onChange={async (e) => {
							props.dessertHandler(parseInt(e.target.value));
						}}
					/>
				</div>
                <div class="sliderLabel">
                    <div class="mealReportSend" onClick={props.clickSendHandler}>Send</div>
                </div>
			</div>
			<div className="valuesDiv">
                <div class="sliderLabel" id='vkLabel'>{props.vkMeal}</div>
                <div class="sliderLabel" id='vgLabel'>{props.vgMeal}</div>
                <div class="sliderLabel" id='soupLabel'>{props.soup}</div>
                <div class="sliderLabel" id='saladLabel'>{props.salad}</div>
                <div class="sliderLabel" id='dessertLabel'>{props.dessert}</div>
            </div>
		</div>
	);
}

export default ReportMealCls;
