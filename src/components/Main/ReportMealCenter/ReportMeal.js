import React, { useEffect, useState } from 'react';
import DocentPanelWrapper from '../DocentEditor/DocentPanelWrapper';
import axios from 'axios';
import ReportMealCls from './ReportMealCls';

function ReportMeal(props) {
	const [ open, setOpen ] = useState(false);
	const [ classes, setDepsClasses ] = useState([]);
	const [ maxCls, setMaxCls ] = useState(1);
	const [ skipCls, setSkipCls ] = useState(0);
	const [ cls, setCls ] = useState('');
	const [ deps, setAllDeps ] = useState([]);
	const [ maxDeps, setMaxDeps ] = useState(1);
	const [ skipDeps, setSkipDeps ] = useState(0);
	const [ dep, setDep ] = useState('IT');
	const [ clsIds, setClsIds ] = useState('');
	const [ part, setPart ] = useState(0);
	const [ vkMeal, setVkMeal ] = useState(0);
	const [ vgMeal, setVgMeal ] = useState(0);
	const [ soup, setSoup ] = useState(0);
	const [ dessert, setDessert ] = useState(0);
	const [ salad, setSalad ] = useState(0);

	useEffect(
		async () => {
			await axios
				.post(
					'http://localhost:5000/api/v1/reportMeal/clsReportedMeals',
					{ cls: cls },
					{ headers: { ContentType: 'application/json' } }
				)
				.then((res) => {
					if (!res.data.err) {
						setVkMeal(res.data.vk);
						setVgMeal(res.data.vg);
						setSoup(res.data.sp);
						setSalad(res.data.sa);
						setDessert(res.data.ds);
					} else {
						setVkMeal(0);
						setVgMeal(0);
						setSoup(0);
						setDessert(0);
						setSalad(0);
					}
				});
		},
		[ cls ]
	);

	useEffect(
		async () => {
			await axios
				.post(
					'http://localhost:5000/api/v1/class/getClassParts',
					{ clsId: cls },
					{ header: { ContentType: 'application/json' } }
				)
				.then((res) => setPart(res.data.anz));
		},
		[ cls ]
	);

	useEffect(
		async () => {
			if (!open) {
				await axios
					.post(
						'http://localhost:5000/api/v1/class/getAllDepartmentsSP',
						{ skipDeps: skipDeps },
						{ header: { ContentType: 'application/json' } }
					)
					.then((res) => {
						console.log(res);
						setAllDeps(res.data.deps);
						setMaxDeps(res.data.num);
					});
			}
			setOpen(true);
		},
		[ open ]
	);

	useEffect(
		() => {
			console.log(maxDeps, maxCls);
		},
		[ maxDeps, maxCls ]
	);

	useEffect(
		async () => {
			console.log(deps[0]);
			setDep(deps[0]);
		},
		[ deps ]
	);

	useEffect(
		() => {
			setCls(clsIds[0]);
		},
		[ clsIds ]
	);

	useEffect(
		async () => {
			await axios
				.post(
					'http://localhost:5000/api/v1/class/getDepsClassesP',
					{ skipCls: skipCls, dep: dep },
					{ header: { ContentType: 'application/json' } }
				)
				.then((res) => {
					setDepsClasses(res.data.classes);
					setClsIds(res.data.ids);
					setMaxCls(res.data.num);
				});
		},
		[ dep ]
	);

	useEffect(
		() => {
			console.log(classes);
		},
		[ classes ]
	);

	useEffect(
		() => {
			if (vkMeal + vgMeal > part) {
				setVgMeal(part - vkMeal);
			}
			if (vkMeal < 0) {
				setVkMeal(0);
			}
		},
		[ vkMeal ]
	);

	useEffect(
		() => {
			if (vgMeal + vkMeal > part) {
				setVkMeal(part - vgMeal);
			}
			if (vgMeal < 0) {
				setVgMeal(0);
			}
		},
		[ vgMeal ]
	);

	useEffect(
		() => {
			if (soup > vkMeal + vgMeal) {
				setSoup(vkMeal + vgMeal);
			}
		},
		[ soup, vkMeal, vgMeal ]
	);

	useEffect(
		() => {
			if (dessert > vkMeal + vgMeal) {
				setDessert(vkMeal + vgMeal);
			}
		},
		[ dessert, vkMeal, vgMeal ]
	);

	useEffect(
		() => {
			if (salad > vkMeal + vgMeal) {
				setSalad(vkMeal + vgMeal);
			}
		},
		[ salad, vkMeal, vgMeal ]
	);

	function makeDepCard(x) {
		console.log(deps);
		const cls = x == dep ? 'cardGreen' : '';
		return (
			<div className={'card cardUL carduser8 ' + cls} id={x} onClick={(e) => clickDeps(e)}>
				{x}
			</div>
		);
	}

	function makeClassCard(x) {
		console.log(classes);
		const index = classes.indexOf(x);
		const thisCls = clsIds[index];
		const clas = thisCls == cls ? 'cardGreen' : '';
		return (
			<div className={'card cardUL carduser8x ' + clas} id={thisCls} onClick={(e) => clickClass(e)}>
				{x}
			</div>
		);
	}

	function clickDeps(e) {
		setDep(e.target.innerHTML);
		setVgMeal(0);
		setVkMeal(0);
		setSoup(0);
		setSalad(0);
		setDessert(0);
	}

	function clickClass(e) {
		setCls(e.target.id);
		setVgMeal(0);
		setVkMeal(0);
		setSoup(0);
		setSalad(0);
		setDessert(0);
	}

	async function clickSendHandler() {
		await axios.post(
			'http://localhost:5000/api/v1/reportMeal/reportMealsOfClass',
			{
				cls: cls,
				vk: vkMeal,
				vg: vgMeal,
				sp: soup,
				sa: salad,
				ds: dessert
			},
			{ header: { ContentType: 'application/json' } }
		);
	}

	return (
		<div>
			{props.close && 'Essen melden'}
			{!props.close && (
				<div>
					<DocentPanelWrapper>
						<p>Essen Melden</p>
						<div className="classAndDep">
							<div className="depsCards2">{deps && deps.map(makeDepCard)}</div>
							<div className="classCards">{classes && classes.map(makeClassCard)}</div>
						</div>
						<div className="reportMealer">
							<ReportMealCls
								clsName={classes[clsIds.indexOf(cls)]}
								clsId={cls}
								part={part}
								vkMeal={vkMeal}
								vgMeal={vgMeal}
								soup={soup}
								salad={salad}
								dessert={dessert}
								vkHandler={setVkMeal}
								vgHandler={setVgMeal}
								soupHandler={setSoup}
								saladHandler={setSalad}
								dessertHandler={setDessert}
								clickSendHandler={clickSendHandler}
							/>
						</div>
					</DocentPanelWrapper>
				</div>
			)}
		</div>
	);
}

export default ReportMeal;
