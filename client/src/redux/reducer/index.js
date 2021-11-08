import {
	LOGIN_OKEY,
	LOGOUT_OKEY,
	GET_JUNIORS,
	GET_COMPANIES,
	GET_LANGUAGES,
	GET_TECHNOLOGIES,
	GET_COMPANY_DETAILS,
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
	EMAIL_VERIFICATION,
	GET_JUNIORS_DETAILS,
	ERROR_LOGIN,
	UPLOAD_PICTURE,
	GET_JOB_DETAILS,
	GET_JOBS,
} from '../types';

import { calculateDate } from '../helpers';

const inicialState = {
	loading: false,
	errorLogin: null,
	user: null,
	details: {},
	juniorsdetails: {},
	languages: [],
	technologies: [],
	juniors: [],
	companies: [],
	publications: [],
	publication: {},
	emailVerification: true,
	jobs: {
		data: [],
		filterData: [],
		activeFilters: {
			countries: [],
			cities: [],
			salaries: [],
			techs: [],
		},
	},
	jobDetails: {},
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
			return (state = inicialState);

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
				j.title.toLowerCase().includes(action.payload)
			);

			return {
				...state,
				jobs: { ...state.jobs, filterData: arr1 },
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
			return {
				...state,
				user: { ...state.user, photograph: action.payload },
			};
		case EMAIL_VERIFICATION:
			return {
				...state,
				emailVerification: action.payload,
			};
		case ERROR_LOGIN:
			return {
				...state,
				errorLogin: action.payload,
			};

		case UPLOAD_PICTURE:
			return {
				...state,
				publication: { ...state.publication, photograph: action.payload },
			};
		case GET_JOBS:
			return {
				...state,
				jobs: {
					...state.jobs,
					data: action.payload,
					filterData: action.payload,
				},
			};
		case GET_JOB_DETAILS:
			return {
				...state,
				jobsDetails: action.payload,
			};

		default:
			return state;
	}
};

export default rootReducer;
