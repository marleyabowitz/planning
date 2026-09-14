import './styles/global.css'
import { LANGUAGES_DUE_DATES } from './data/languages-schedule'
import { mountDatesPage } from './dates-page'

mountDatesPage('languages', LANGUAGES_DUE_DATES)
