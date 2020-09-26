import axios from 'axios'
import httpBuilder from './httpBuilder'
import {decorateLogoutWhenExpiredInterceptor} from '../utils/axios'

const baseClient = axios.create({
  baseURL: process.env.API_URL
});

decorateLogoutWhenExpiredInterceptor(baseClient)

export const httpClient = httpBuilder(baseClient)
