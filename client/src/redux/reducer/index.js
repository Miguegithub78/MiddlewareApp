import {
	LOGIN_OKEY,
	LOGOUT_OKEY,
	GET_JUNIORS,
	GET_COMPANIES,
	GET_LANGUAGES,
	GET_TECHNOLOGIES,
	GET_COMPANY_DETAILS,
	GET_JUNIORS_DETAILS,
	GET_PUBLICATIONS,
	GET_PUBLICATIONS_BY_ID,
	SORT_JOBS_BY,
	FILTER_JOBS_BY_COUNTRIES,
	FILTER_JOBS_BY_CITIES,
	FILTER_JOBS_BY_SALARIES,
	FILTER_JOBS_BY_TECHS,
	SEARCH_JOBS_BY_TITLE,
	RESET_JOBS_FILTER,
	CHANGE_PROFILE_PICTURE,
} from '../types';

import { calculateDate } from '../helpers';

const inicialState = {
	loading: false,
	user: null,
	details: {},
	juniorsdetails: {},
	languages: [],
	technologies: [],
	juniors: [],
	companies: [],
	publications: [],
	publication: {},
	jobs: {
		data: [
			{
				id: 1,
				img: 'https://www.reportur.com/wp-content/uploads/2020/09/desp-e1599536919110.jpg',
				company: 'despegar',
				title: 'frontend',
				description: '',
				country: 'argentina',
				city: 'buenos aires',
				dollar: false,
				salary: 50000,
				tech: ['javascript', 'sql'],
				date: '10/31/2021',
				premium: 3,
			},
			{
				id: 2,
				img: 'https://www.globant.com/sites/default/files/2021-04/Globant_.png',
				company: 'globant',
				title: 'backend',
				description: '',
				country: 'argentina',
				city: 'mendoza',
				dollar: false,
				salary: 55000,
				tech: ['node.js'],
				date: '10/30/2021',
				premium: 0,
			},
			{
				id: 3,
				img: 'https://i.blogs.es/ba4666/emele/1366_2000.jpg',
				company: 'mercalibre',
				title: 'frontend',
				description: '',
				country: 'argentina',
				city: 'buenos aires',
				dollar: false,
				salary: 60000,
				tech: ['javascript', 'react', 'node.js'],
				date: '10/28/2021',
				premium: 1,
			},
			{
				id: 4,
				img: 'https://www.globant.com/sites/default/files/2021-04/Globant_.png',
				company: 'globant',
				title: 'fullstack',
				description: '',
				country: 'argentina',
				city: 'cordoba',
				dollar: false,
				salary: 160000,
				tech: ['javascript', 'react', 'node', 'css'],
				date: '10/28/2021',
				premium: 0,
			},
			{
				id: 5,
				img: 'https://i.blogs.es/ba4666/emele/1366_2000.jpg',
				company: 'mercadolibre',
				title: 'frontend',
				description: '',
				country: 'remote',
				city: '',
				dollar: true,
				salary: 1000,
				tech: ['javascript', 'react', 'node'],
				date: '10/28/2021',
				premium: 0,
			},
			{
				id: 6,
				img: 'https://www.reportur.com/wp-content/uploads/2020/09/desp-e1599536919110.jpg',
				company: 'despegar',
				title: 'frontend',
				description: '',
				country: 'argentina',
				city: 'buenos aires',
				dollar: false,
				salary: 45000,
				tech: ['javascript', 'react'],
				date: '10/28/2021',
				premium: 0,
			},
			{
				id: 7,
				img: 'https://i.blogs.es/ba4666/emele/1366_2000.jpg',
				company: 'Mercadolibre',
				title: 'backend',
				description: '',
				country: 'argentina',
				city: 'mendoza',
				dollar: false,
				salary: 80000,
				tech: ['node.js'],
				date: '10/25/2021',
				premium: 2,
			},
			{
				id: 8,
				img: 'https://www.globant.com/sites/default/files/2021-04/Globant_.png',
				company: 'globant',
				title: 'frontend',
				description: '',
				country: 'argentina',
				city: 'buenos aires',
				dollar: false,
				salary: 90000,
				tech: ['javascript', 'react', 'node.js', 'redux'],
				date: '10/28/2021',
				premium: 0,
			},
			{
				id: 9,
				img: 'https://i.blogs.es/ba4666/emele/1366_2000.jpg',
				company: 'mercadolibre',
				title: 'fullstack',
				description: '',
				country: 'argentina',
				city: 'cordoba',
				dollar: false,
				salary: 115000,
				tech: ['javascript', 'react', 'node.js', 'redux'],
				date: '10/25/2021',
				premium: 0,
			},
			{
				id: 10,
				img: 'https://www.globant.com/sites/default/files/2021-04/Globant_.png',
				company: 'globant',
				title: 'frontend',
				description: '',
				country: 'remote',
				city: '',
				dollar: true,
				salary: 1000,
				tech: ['javascript', 'react', 'node.js'],
				date: '10/31/2021',
				premium: 3,
			},
		],
		filterData: [
			{
				id: 1,
				img: 'https://www.reportur.com/wp-content/uploads/2020/09/desp-e1599536919110.jpg',
				company: 'despegar',
				title: 'frontend',
				description: '',
				country: 'argentina',
				city: 'buenos aires',
				dollar: false,
				salary: 50000,
				tech: ['javascript', 'sql'],
				date: '10/31/2021',
				premium: 3,
			},
			{
				id: 2,
				img: 'https://www.globant.com/sites/default/files/2021-04/Globant_.png',
				company: 'globant',
				title: 'backend',
				description: '',
				country: 'argentina',
				city: 'mendoza',
				dollar: false,
				salary: 55000,
				tech: ['node.js'],
				date: '10/30/2021',
				premium: 0,
			},
			{
				id: 3,
				img: 'https://i.blogs.es/ba4666/emele/1366_2000.jpg',
				company: 'mercalibre',
				title: 'frontend',
				description: '',
				country: 'argentina',
				city: 'buenos aires',
				dollar: false,
				salary: 60000,
				tech: ['javascript', 'react', 'node.js'],
				date: '10/28/2021',
				premium: 1,
			},
			{
				id: 4,
				img: 'https://www.globant.com/sites/default/files/2021-04/Globant_.png',
				company: 'globant',
				title: 'fullstack',
				description: '',
				country: 'argentina',
				city: 'cordoba',
				dollar: false,
				salary: 160000,
				tech: ['javascript', 'react', 'node', 'css'],
				date: '10/28/2021',
				premium: 0,
			},
			{
				id: 5,
				img: 'https://i.blogs.es/ba4666/emele/1366_2000.jpg',
				company: 'mercadolibre',
				title: 'frontend',
				description: '',
				country: 'remote',
				city: '',
				dollar: true,
				salary: 1000,
				tech: ['javascript', 'react', 'node'],
				date: '10/28/2021',
				premium: 0,
			},
			{
				id: 6,
				img: 'https://www.reportur.com/wp-content/uploads/2020/09/desp-e1599536919110.jpg',
				company: 'despegar',
				title: 'frontend',
				description: '',
				country: 'argentina',
				city: 'buenos aires',
				dollar: false,
				salary: 45000,
				tech: ['javascript', 'react'],
				date: '10/28/2021',
				premium: 0,
			},
			{
				id: 7,
				img: 'https://i.blogs.es/ba4666/emele/1366_2000.jpg',
				company: 'Mercadolibre',
				title: 'backend',
				description: '',
				country: 'argentina',
				city: 'mendoza',
				dollar: false,
				salary: 80000,
				tech: ['node.js'],
				date: '10/25/2021',
				premium: 2,
			},
			{
				id: 8,
				img: 'https://www.globant.com/sites/default/files/2021-04/Globant_.png',
				company: 'globant',
				title: 'frontend',
				description: '',
				country: 'argentina',
				city: 'buenos aires',
				dollar: false,
				salary: 90000,
				tech: ['javascript', 'react', 'node.js', 'redux'],
				date: '10/28/2021',
				premium: 0,
			},
			{
				id: 9,
				img: 'https://i.blogs.es/ba4666/emele/1366_2000.jpg',
				company: 'mercadolibre',
				title: 'fullstack',
				description: '',
				country: 'argentina',
				city: 'cordoba',
				dollar: false,
				salary: 115000,
				tech: ['javascript', 'react', 'node.js', 'redux'],
				date: '10/25/2021',
				premium: 0,
			},
			{
				id: 10,
				img: 'https://www.globant.com/sites/default/files/2021-04/Globant_.png',
				company: 'globant',
				title: 'frontend',
				description: '',
				country: 'remote',
				city: '',
				dollar: true,
				salary: 1000,
				tech: ['javascript', 'react', 'node.js'],
				date: '10/31/2021',
				premium: 3,
			},
		],
		activeFilters: {
			countries: [],
			cities: [],
			salaries: [],
			techs: [],
		},
	},
};

function calculateSalary(value, state) {
	let min;
	let max;
	switch (value) {
		case '0': {
			min = 0;
			max = 49999;
			break;
		}
		case '1': {
			min = 50000;
			max = 99999;
			break;
		}
		case '2': {
			min = 100000;
			max = 149999;
			break;
		}
		case '3': {
			min = 150000;
			max = 199999;
			break;
		}
		default: {
			min = 200000;
			max = 999999999999;
		}
	}

	return state.jobs.data.filter((j) => {
		if (j.dollar) {
			if (j.salary * 200 >= min && j.salary * 200 < max) {
				return j;
			}
		}

		if (j.salary > min && j.salary < max && j.dollar === false) {
			return j;
		}
	});
}

function sortJobs(string, state) {
	let arr;
	if (string === 'date') {
		arr = state.jobs.filterData.sort(function (a, b) {
			if (calculateDate(a.date) < calculateDate(b.date)) {
				return -1;
			}
			if (calculateDate(a.date) > calculateDate(b.date)) {
				return 1;
			}
			return 0;
		});
	}
	if (string === 'premium') {
		arr = state.jobs.filterData.sort(function (a, b) {
			if (a.premium > b.premium) {
				return -1;
			}
			if (a.premium < b.premium) {
				return 1;
			}
			return 0;
		});
	}
	return arr;
}

function filterJobs(state, filterKeyName, payload) {}

const rootReducer = (state = inicialState, action) => {
	switch (action.type) {
		case LOGIN_OKEY:
			return { ...state, user: action.payload };

		case LOGOUT_OKEY:
			return { ...state, user: null };

		case GET_LANGUAGES:
			return { ...state, languages: action.payload };

		case GET_TECHNOLOGIES:
			return { ...state, technologies: action.payload };

		case GET_COMPANY_DETAILS:
			return {
				...state,
				details: action.payload,
			};
		case GET_JUNIORS_DETAILS:
			return {
				...state,
				juniorsdetails: action.payload,
			};
		case GET_JUNIORS:
			return {
				...state,
				juniors: action.payload,
			};

		case GET_COMPANIES:
			return {
				...state,
				companies: action.payload,
			};

		case GET_PUBLICATIONS:
			return {
				...state,
				publications: action.payload,
			};

		case GET_PUBLICATIONS_BY_ID:
			return {
				...state,
				publication: action.payload,
			};

		case SORT_JOBS_BY: {
			let arr = sortJobs(action.payload, state);
			return { ...state, jobs: { ...state.jobs, filterData: arr } };
		}
		case FILTER_JOBS_BY_COUNTRIES: {
			let arr = state.jobs.data.filter((j) => j.country === action.payload);
			return {
				...state,
				jobs: { ...state.jobs, filterData: arr },
			};
		}
		case FILTER_JOBS_BY_CITIES: {
			let arr = state.jobs.data.filter((j) => j.city === action.payload);
			return {
				...state,
				jobs: { ...state.jobs, filterData: arr },
			};
		}
		case FILTER_JOBS_BY_SALARIES: {
			let arr = calculateSalary(action.payload, state);
			return {
				...state,
				jobs: { ...state.jobs, filterData: arr },
			};
		}
		case FILTER_JOBS_BY_TECHS: {
			console.log(action.payload);
			let arr = state.jobs.data.filter((j) => j.tech.includes(action.payload));
			console.log(arr);
			return {
				...state,
				jobs: { ...state.jobs, filterData: arr },
			};
		}
		case SEARCH_JOBS_BY_TITLE: {
			let arr1 = state.jobs.data.filter((j) =>
				j.title.includes(action.payload)
			);
			let arr2 = state.jobs.data.filter((j) => j.tech.includes(action.payload));
			let arr = [...arr1, ...arr2];
			return {
				...state,
				jobs: { ...state.jobs, filterData: arr },
			};
		}
		case RESET_JOBS_FILTER: {
			let arr = state.jobs.data.filter((j) => j.salary > 0);
			console.log(arr);
			return {
				...state,
				jobs: { ...state.jobs, filterData: arr },
			};
		}
		case CHANGE_PROFILE_PICTURE:
			return{
				...state,
				user : {...state.user, photograph:action.payload}
			}
		default:
			return state;
	}
};

export default rootReducer;
