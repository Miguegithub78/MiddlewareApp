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
	GET_UBICATION,
	ADD_NEW_JOB,
	MERCADO_PAGO,
	SET_PLAN,
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
	publication: [],
	emailVerification: true,
	countryState: null,
	jobs: {
		data: [],
		filterData: [],
		activeFilters: {
			country: '',
			city: '',
			salary: '',
			tech: '',
			search: '',
		},
	},
	jobDetails: {},
	imgPublication: null,
	pages: 0,
	finishPage: false,
	mercadoPago: '',
	idLastJob: '',
	plan: '',
};

function filterJobs(state, filterKeyName, payload, reset) {
	let jobs = state;
	jobs.activeFilters[filterKeyName] = payload;

	const filterJobs = state.data.filter((job) => {
		const filterByCountry = jobs.activeFilters.country
			? job.country.toLowerCase() === jobs.activeFilters.country
			: true;

		const filterByCity = jobs.activeFilters.city
			? job.city.toLowerCase() === jobs.activeFilters.city
			: true;

		const filterByTech = jobs.activeFilters.tech
			? job.technologies.filter(
					(t) => jobs.activeFilters.tech.toLowerCase() === t.name.toLowerCase()
			  )
			: true;

		const filterBySearch = jobs.activeFilters.search
			? job.title.toLowerCase().includes(jobs.activeFilters.search)
			: true;

		let tech = !jobs.activeFilters.tech
			? true
			: filterByTech.length > 0
			? true
			: false;
		console.log(job.title);
		console.log(filterByCountry);
		console.log(filterByCity);
		console.log(tech);
		console.log(filterBySearch);
		console.log('------------------------------');
		return filterByCountry && filterByCity && filterBySearch && tech;
	});

	return filterJobs;
}

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
				publications: [...state.publications].concat(
					action.payload.publications
				),
				pages: action.payload.pages,
				finishPage: action.payload.finishPage,
			};

		case 'POST_PUBLICATION':
			return {
				...state,
				publications: [action.payload].concat([...state.publications]),
			};

		case 'DELETE_PUBLICATION':
			return {
				...state,
				publications: state.publications.filter(
					(e) => e._id !== action.payload._id
				),
			};

		case 'DELETE_PUBLICATION':
			return {
				...state,
				publications: state.publications.filter(
					(e) => e._id !== action.payload._id
				),
			};

		case 'PUT_PUBLICATION':
			return {
				...state,
				publications: state.publications.filter((e) => {
					if (e._id == action.payload._id) {
						e.description = action.payload.description;
						e.photograph = action.payload.photograph;
						return e;
					} else return e;
				}),
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
			const arr = filterJobs(state.jobs, 'country', action.payload);
			return {
				...state,
				jobs: { ...state.jobs, filterData: arr },
			};
		}
		case FILTER_JOBS_BY_CITIES: {
			const arr = filterJobs(state.jobs, 'city', action.payload);
			return {
				...state,
				jobs: { ...state.jobs, filterData: arr },
			};
		}
		case FILTER_JOBS_BY_SALARIES: {
			const arr = filterJobs(state.jobs, 'salary', action.payload);
			return {
				...state,
				jobs: { ...state.jobs, filterData: arr },
			};
		}
		case FILTER_JOBS_BY_TECHS: {
			const arr = filterJobs(state.jobs, 'tech', action.payload);
			return {
				...state,
				jobs: { ...state.jobs, filterData: arr },
			};
		}

		case SEARCH_JOBS_BY_TITLE: {
			const arr = filterJobs(state.jobs, 'search', action.payload);
			return {
				...state,
				jobs: { ...state.jobs, filterData: arr },
			};
		}
		case RESET_JOBS_FILTER: {
			return {
				...state,
				jobs: {
					...state.jobs,
					filterData: state.jobs.data,
					activeFilters: {
						country: '',
						city: '',
						salary: '',
						tech: '',
						search: '',
					},
				},
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
		case GET_UBICATION:
			return {
				...state,
				countryState: action.payload,
			};
		case ADD_NEW_JOB:
			return {
				...state,
				user: { ...state.user, jobs: [...state.user.jobs, action.payload] },
				idLastJob: action.payload._id,
			};

		case 'UPLOAD_PICTURE_PUBLICATION':
			return {
				...state,
				imgPublication: action.payload,
			};

		case 'RESET_PICTURE_PUBLICATION':
			return {
				...state,
				imgPublication: action.payload,
			};

		case MERCADO_PAGO:
			console.log(action.payload);
			return {
				...state,
				mercadoPago: action.payload,
			};

		case SET_PLAN:
			return {
				...state,
				plan: action.payload,
			};

		default:
			return state;
	}
};

export default rootReducer;
